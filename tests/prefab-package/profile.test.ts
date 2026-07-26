import { describe as suite, expect, test } from "bun:test";

import { inspectPackageArchive } from "../../src/prefab-package/index.ts";
import { SCENE_BIN, buildGlb, material, mesh, node, primitive, scene, utf8 } from "../fixtures/prefab-package/build.ts";
import {
  buildProfilePackage,
  buildWallLamp,
  profileBaseGltf,
  wallLampFullGltf,
} from "../fixtures/prefab-package/packages.ts";
import { codes, describe, errorCodes, find } from "./helpers.ts";

suite("logical package root", () => {
  test("a single authored root is the unique addressable logical root", async () => {
    const { archive } = await buildProfilePackage({});
    const result = await inspectPackageArchive(archive);

    expect(describe(result)).not.toContain("ERROR");
    for (const representation of result.representations) {
      expect(representation.rootIndex).toBe(0);
      expect(representation.nodes[0].nodeId).toBe("nook.root");
      expect(representation.nodes[0].isPackageRoot).toBe(true);
    }
  });

  test("multiple source roots without a synthesized wrapper are rejected", async () => {
    const multiRoot = scene({
      nodes: [
        node({ name: "LampBody", nodeId: "nook.root", packageRoot: true }),
        node({ name: "LampArm", nodeId: "n_arm" }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: multiRoot });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-ROOT-NOT-TOP-LEVEL");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.representation).toBe("full");
    expect(diagnostic?.detail).toContain("wrap them in one identity root");
  });

  test("a synthesized identity wrapper over multiple source roots is valid", async () => {
    const wrapped = scene({
      nodes: [
        node({ name: "Wrapper", nodeId: "nook.root", packageRoot: true, children: [1, 2] }),
        node({ name: "LampBody", nodeId: "n_body" }),
        node({ name: "LampArm", nodeId: "n_arm" }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: wrapped, proxy: wrapped });
    const result = await inspectPackageArchive(archive);

    expect(describe(result)).not.toContain("ERROR");
    expect(result.representations[0].nodes).toHaveLength(3);
  });

  test("no package-root marker is rejected", async () => {
    const unmarked = scene({ nodes: [node({ name: "Root", nodeId: "n_root" })] });
    const { archive } = await buildProfilePackage({ full: unmarked });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-ROOT-MISSING")?.representation).toBe("full");
    expect(result.representations.find((r) => r.role === "full")?.rootIndex).toBeNull();
  });

  test("two package-root markers are rejected", async () => {
    const twoRoots = scene({
      nodes: [
        node({ name: "A", nodeId: "nook.root", packageRoot: true, children: [1] }),
        node({ name: "B", nodeId: "n_b", packageRoot: true }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: twoRoots });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-ROOT-DUPLICATE")?.detail).toContain("0, 1");
  });

  test("the logical root must claim the reserved identity", async () => {
    const misnamed = scene({
      nodes: [node({ name: "Root", nodeId: "n_root", packageRoot: true })],
    });
    const { archive } = await buildProfilePackage({ full: misnamed });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-ROOT-RESERVED-ID-MISUSE");
    expect(diagnostic?.nodeId).toBe("n_root");
    expect(diagnostic?.detail).toContain("nook.root");
  });

  test("a non-root node claiming the reserved identity is rejected", async () => {
    const squatting = scene({
      nodes: [
        node({ name: "Root", nodeId: "nook.root", packageRoot: true, children: [1] }),
        node({ name: "Impostor", nodeId: "nook.root" }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: squatting });
    const result = await inspectPackageArchive(archive);

    expect(errorCodes(result)).toContain("NOOK-ROOT-RESERVED-ID-MISUSE");
    // The duplicate identity also breaks binding addressability.
    expect(errorCodes(result)).toContain("NOOK-NODE-DUPLICATE-ID");
  });

  test("a package root parented under another node is rejected", async () => {
    const nestedRoot = scene({
      nodes: [
        node({ name: "Outer", nodeId: "n_outer", children: [1] }),
        node({ name: "Root", nodeId: "nook.root", packageRoot: true }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: nestedRoot });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-ROOT-NOT-TOP-LEVEL")?.detail).toContain("parented to node 0");
  });

  test("a non-identity stored root transform is preserved, not normalized away", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);
    const full = result.representations.find((r) => r.role === "full");

    expect(full?.storedRootMatrix).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0.25, 1,
    ]);
  });
});

suite("structural divergence between roles", () => {
  test("proxy and full may differ in hierarchy, node ids, and material layout", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    const full = result.representations.find((r) => r.role === "full")!;
    const proxy = result.representations.find((r) => r.role === "proxy")!;

    expect(full.nodes.map((n) => n.nodeId)).not.toEqual(proxy.nodes.map((n) => n.nodeId));
    expect(full.materialNames).toEqual(["ShadeGlass"]);
    expect(proxy.materialNames).toEqual(["ProxyGlass"]);
    expect(result.valid).toBe(true);
  });

  test("a preview consumer can work from manifest plus proxy alone", async () => {
    const { manifestBytes, blobs, digests } = await buildWallLamp();
    const proxyOnly = blobs.filter((blob) => blob.path.includes(digests.proxy.replace(":", "_")));

    const { inspectPackage } = await import("../../src/prefab-package/index.ts");
    const result = await inspectPackage(manifestBytes, proxyOnly);

    // The proxy is fully inspectable; only the absent full blob is reported.
    expect(result.representations.find((r) => r.role === "proxy")?.parsed).toBe(true);
    expect(find(result, "NOOK-BLOB-MISSING")?.representation).toBe("full");
    expect(result.manifest?.parameters).toHaveLength(2);
  });
});

suite("self-containment", () => {
  test("an external image URI is rejected for v1", async () => {
    const external = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
      extra: { images: [{ uri: "textures/shade.png" }] },
    });
    const { archive } = await buildProfilePackage({ full: external });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-GLB-EXTERNAL-URI");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.representation).toBe("full");
    expect(diagnostic?.detail).toContain("images");
    // The payload is refused rather than parsed with resources it does not carry.
    expect(result.representations.find((r) => r.role === "full")?.parsed).toBe(false);
  });

  test("an external buffer URI is rejected for v1", async () => {
    const external = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
      extra: { buffers: [{ uri: "https://cdn.example.com/geometry.bin", byteLength: 4 }] },
    });
    const { archive } = await buildProfilePackage({ full: external });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-GLB-EXTERNAL-URI");
  });

  test("an embedded data URI is not an external reference", async () => {
    const embedded = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
      extra: { images: [{ uri: "data:image/png;base64,iVBORw0KGgo=" }] },
    });
    const { archive } = await buildProfilePackage({ full: embedded, proxy: embedded });
    const result = await inspectPackageArchive(archive);
    expect(codes(result)).not.toContain("NOOK-GLB-EXTERNAL-URI");
  });
});

suite("profile feature whitelist", () => {
  test("KHR_lights_punctual is inside the profile", async () => {
    const lit = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
      extensionsUsed: ["KHR_lights_punctual"],
      extensionsRequired: ["KHR_lights_punctual"],
    });
    const { archive } = await buildProfilePackage({ full: lit, proxy: lit });
    const result = await inspectPackageArchive(archive);
    expect(describe(result)).not.toContain("ERROR");
  });

  test("an unsupported required extension is rejected", async () => {
    const exotic = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
      extensionsUsed: ["VENDOR_secret_shader"],
      extensionsRequired: ["VENDOR_secret_shader"],
    });
    const { archive } = await buildProfilePackage({ full: exotic });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-GLB-UNSUPPORTED-EXTENSION");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.representation).toBe("full");
  });

  test("out-of-profile content is reported rather than silently dropped", async () => {
    const animated = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
      extra: {
        animations: [{ channels: [], samplers: [] }],
        cameras: [{ type: "perspective", perspective: { yfov: 1, znear: 0.1 } }],
      },
    });
    const { archive } = await buildProfilePackage({ full: animated });
    const result = await inspectPackageArchive(archive);

    const reported = result.diagnostics
      .filter((d) => d.code === "NOOK-PROFILE-UNSUPPORTED-FEATURE")
      .map((d) => d.location);
    expect(reported.some((location) => location.endsWith("/animations"))).toBe(true);
    expect(reported.some((location) => location.endsWith("/cameras"))).toBe(true);
  });

  test("an extension used but not required is still reported", async () => {
    const used = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
      extensionsUsed: ["EXT_mesh_gpu_instancing"],
    });
    const { archive } = await buildProfilePackage({ full: used });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-PROFILE-UNSUPPORTED-FEATURE");
  });
});

suite("malformed payloads", () => {
  test("bytes that are not a GLB are reported without crashing inspection", async () => {
    const { archive } = await buildProfilePackage({
      rawPayloads: { full: utf8("definitely not a GLB container") },
    });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-GLB-MALFORMED")?.representation).toBe("full");
    expect(result.representations.find((r) => r.role === "full")?.parsed).toBe(false);
    // The other representation is unaffected.
    expect(result.representations.find((r) => r.role === "proxy")?.parsed).toBe(true);
  });

  test("an unsupported GLB container version is reported", async () => {
    const bytes = buildGlb(profileBaseGltf(), undefined, { version: 1 });
    const { archive } = await buildProfilePackage({ rawPayloads: { full: bytes } });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-GLB-MALFORMED");
  });

  test("a truncated GLB is reported", async () => {
    const full = buildGlb(wallLampFullGltf(), SCENE_BIN);
    const { archive } = await buildProfilePackage({
      rawPayloads: { full: full.slice(0, Math.floor(full.length / 2)) },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-GLB-MALFORMED");
  });

  test("a payload with no asset version is reported", async () => {
    const noAsset = { scene: 0, scenes: [{ nodes: [] }], nodes: [] };
    const { archive } = await buildProfilePackage({
      rawPayloads: { full: buildGlb(noAsset) },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-GLB-MALFORMED");
  });
});

suite("resource caps", () => {
  test("a node cap is enforced without building an unbounded graph", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive, {
      policy: { payload: { maxNodes: 1 } },
    });

    const diagnostic = find(result, "NOOK-GLB-LIMIT-EXCEEDED");
    expect(diagnostic?.detail).toContain("over the limit of 1");
    expect(result.representations.every((r) => !r.parsed)).toBe(true);
  });

  test("a blob byte cap refuses the payload before parsing", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive, {
      policy: { payload: { maxBlobBytes: 32 } },
    });
    expect(find(result, "NOOK-GLB-LIMIT-EXCEEDED")?.detail).toContain("It is not parsed.");
  });

  test("a node-depth cap is enforced", async () => {
    const deep = scene({
      nodes: [
        node({ name: "Root", nodeId: "nook.root", packageRoot: true, children: [1] }),
        node({ name: "A", nodeId: "n_a", children: [2] }),
        node({ name: "B", nodeId: "n_b" }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: deep });
    const result = await inspectPackageArchive(archive, {
      policy: { payload: { maxNodeDepth: 2 } },
    });
    expect(find(result, "NOOK-GLB-LIMIT-EXCEEDED")?.detail).toContain("3 deep");
  });

  test("material, texture, and image caps are enforced", async () => {
    const rich = scene({
      nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true, mesh: 0 })],
      meshes: [mesh([primitive(0), primitive(1)])],
      materials: [material("A"), material("B")],
    });
    const { archive } = await buildProfilePackage({ full: rich });
    const result = await inspectPackageArchive(archive, {
      policy: { payload: { maxMaterials: 1 } },
    });
    expect(find(result, "NOOK-GLB-LIMIT-EXCEEDED")?.location).toContain("/materials");
  });
});

suite("extras.nook records", () => {
  test("a registered component validates against its capability schema", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);
    const full = result.representations.find((r) => r.role === "full")!;

    expect(full.nodes[0].components).toEqual([
      {
        name: "collider",
        capability: "nook.component/collider@1",
        fields: { shape: "box", isTrigger: false, enabled: true },
        known: true,
      },
    ]);
    expect(result.discoveredCapabilities).toContain("nook.component/collider@1");
  });

  test("an unregistered component is rejected rather than assumed", async () => {
    const unknown = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          components: { teleporter: { destination: "spawn" } },
        }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: unknown });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-COMPONENT-UNREGISTERED")?.location).toContain("components/teleporter");
  });

  test("a component field outside its schema domain is rejected", async () => {
    const badField = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          components: { collider: { shape: "torus" } },
        }),
      ],
    });
    const { archive } = await buildProfilePackage({
      full: badField,
      requires: ["nook.component/collider@1"],
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-COMPONENT-INVALID");
    expect(diagnostic?.capability).toBe("nook.component/collider@1");
    expect(diagnostic?.detail).toContain("box, capsule, mesh, sphere");
  });

  test("a missing required component field is rejected", async () => {
    const incomplete = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          components: { collider: { isTrigger: true } },
        }),
      ],
    });
    const { archive } = await buildProfilePackage({
      full: incomplete,
      requires: ["nook.component/collider@1"],
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-COMPONENT-INVALID")?.detail).toContain("requires field shape");
  });

  test("a component field the capability does not define is rejected", async () => {
    const extraField = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          components: { pickable: { enabled: true, gravity: 9.8 } },
        }),
      ],
    });
    const { archive } = await buildProfilePackage({
      full: extraField,
      requires: ["nook.component/pickable@1"],
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-COMPONENT-INVALID")?.detail).toContain("does not define");
  });

  test("a nested instance record is parsed without instantiating anything", async () => {
    const digest = `sha256:${"a".repeat(64)}`;
    const nested = scene({
      nodes: [
        node({ name: "Root", nodeId: "nook.root", packageRoot: true, children: [1] }),
        node({
          name: "Socket",
          nodeId: "n_socket",
          translation: [0, -0.1, 0],
          prefabInstance: {
            kind: "prefab",
            id: "p_bulb",
            version: "2.0.1",
            digest,
            params: { prm_bulb_color: "#FFEECC" },
          },
        }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: nested });
    const result = await inspectPackageArchive(archive);

    const instance = result.representations.find((r) => r.role === "full")!.nodes[1].prefabInstance;
    expect(instance?.reference).toMatchObject({ kind: "prefab", id: "p_bulb", version: "2.0.1", digest });
    expect(instance?.params).toEqual({ prm_bulb_color: "#FFEECC" });
  });

  test("a nested instance with a non-prefab kind is rejected", async () => {
    const wrongKind = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          prefabInstance: {
            kind: "material",
            id: "m_brass",
            version: "1.0.0",
            digest: `sha256:${"b".repeat(64)}`,
          },
        }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: wrongKind });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-NESTED-INSTANCE-INVALID");
  });

  test("a nested instance pinning a version range is rejected as non-reproducible", async () => {
    const ranged = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          prefabInstance: {
            kind: "prefab",
            id: "p_bulb",
            version: "^2.0.0",
            digest: `sha256:${"c".repeat(64)}`,
          },
        }),
      ],
    });
    const { archive } = await buildProfilePackage({ full: ranged });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-REFERENCE-VERSION-RANGE");
  });
});
