/**
 * Round-trip preservation.
 *
 * A consumer that reads a package, changes one thing, and writes it back must
 * not silently delete what it did not understand. These tests model that as a
 * literal read-modify-write: inspect, mutate the parsed manifest's verbatim
 * source, rebuild, inspect again, and check that the unrecognized data is still
 * there and still participating in canonical identity.
 */

import { describe as suite, expect, test } from "bun:test";

import { inspectPackage, inspectPackageArchive, manifestDigest } from "../../src/prefab-package/index.ts";
import type { JsonObject } from "../../src/prefab-package/types.ts";
import { SCENE_BIN, buildGlb, node, scene, utf8 } from "../fixtures/prefab-package/build.ts";
import { buildWallLamp } from "../fixtures/prefab-package/packages.ts";
import { describe, find } from "./helpers.ts";

const encoder = new TextEncoder();

/**
 * A read-modify-write consumer.
 *
 * It reserializes from `manifest.raw`, which is the verbatim source object — so
 * anything the parser did not model still comes back out.
 */
async function readModifyWrite(
  archive: Uint8Array,
  modify: (raw: JsonObject) => void,
): Promise<{ bytes: Uint8Array; raw: JsonObject }> {
  const result = await inspectPackageArchive(archive);
  const raw = JSON.parse(JSON.stringify(result.manifest!.raw)) as JsonObject;
  modify(raw);
  return { bytes: encoder.encode(JSON.stringify(raw, null, 2)), raw };
}

suite("unknown manifest fields", () => {
  test("an unknown optional field is exposed rather than dropped", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.futureField = { experiment: true, weights: [1, 2, 3] };
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.manifest?.unknown).toEqual({
      futureField: { experiment: true, weights: [1, 2, 3] },
    });
    expect(result.valid).toBe(true);
  });

  test("an unknown field survives read-modify-write verbatim", async () => {
    const { archive, blobs } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.futureField = { experiment: true, nested: { deep: [null, "value"] } };
      },
    });

    const { bytes } = await readModifyWrite(archive, (raw) => {
      (raw.meta as JsonObject).name = "Renamed Wall Lamp";
    });
    const rewritten = await inspectPackage(bytes, blobs);

    expect(rewritten.manifest?.meta.name).toBe("Renamed Wall Lamp");
    expect(rewritten.manifest?.unknown).toEqual({
      futureField: { experiment: true, nested: { deep: [null, "value"] } },
    });
    expect(describe(rewritten)).not.toContain("ERROR");
  });

  test("preserved unknown data participates in canonical identity", async () => {
    const withUnknown = await buildWallLamp({
      manifest: (manifest) => {
        manifest.futureField = { experiment: true };
      },
    });
    const withoutUnknown = await buildWallLamp();

    const a = await manifestDigest(withUnknown.manifest);
    const b = await manifestDigest(withoutUnknown.manifest);
    expect(a).not.toBe(b);

    // And it keeps participating after a round trip.
    const { raw } = await readModifyWrite(withUnknown.archive, () => {});
    expect(await manifestDigest(raw)).toBe(a);
  });

  test("dropping an unknown field changes identity, which is how deletion is detectable", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.futureField = { experiment: true };
      },
    });

    const preserved = await readModifyWrite(archive, () => {});
    const deleted = await readModifyWrite(archive, (raw) => {
      delete raw.futureField;
    });

    expect(await manifestDigest(deleted.raw)).not.toBe(await manifestDigest(preserved.raw));
  });

  test("unknown fields nested inside known structures are preserved", async () => {
    const { archive, blobs } = await buildWallLamp({
      manifest: (manifest) => {
        (manifest.meta as JsonObject).futureMeta = "keep me";
        (manifest.parameters as JsonObject[])[0].futureParam = { hint: "keep me too" };
        ((manifest.parameters as JsonObject[])[0].bindings as JsonObject[])[0].futureBinding = 7;
        (manifest.dependencies as JsonObject[]).push({
          kind: "prefab",
          id: "p_other",
          version: "1.0.0",
          digest: `sha256:${"c".repeat(64)}`,
          futureRef: "keep",
        });
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.manifest?.meta.unknown).toEqual({ futureMeta: "keep me" });
    expect(result.manifest?.parameters[0].unknown).toEqual({ futureParam: { hint: "keep me too" } });
    expect(result.manifest?.parameters[0].bindings[0].unknown).toEqual({ futureBinding: 7 });
    expect(result.manifest?.dependencies[0].unknown).toEqual({ futureRef: "keep" });

    const { bytes } = await readModifyWrite(archive, () => {});
    const rewritten = await inspectPackage(bytes, blobs);
    expect(rewritten.manifest?.parameters[0].unknown).toEqual({
      futureParam: { hint: "keep me too" },
    });
  });
});

suite("unknown payload slots", () => {
  test("an unknown payload slot is reported, preserved, and not parsed", async () => {
    const thumbnail = utf8("pretend PNG bytes");
    const { archive } = await buildWallLamp({
      extraPayloads: { thumbnail: { bytes: thumbnail, mediaType: "image/png" } },
    });
    const result = await inspectPackageArchive(archive);

    const info = find(result, "NOOK-PAYLOAD-UNKNOWN-ROLE");
    expect(info?.severity).toBe("INFO");
    expect(info?.representation).toBe("thumbnail");

    const entry = result.payloads.find((payload) => payload.role === "thumbnail")!;
    expect(entry.known).toBe(false);
    expect(entry.present).toBe(true);
    expect(entry.digestVerified).toBe(true);

    // Preserved and ignored: no GLB parse was attempted for it.
    expect(result.representations.map((r) => r.role).sort()).toEqual(["full", "proxy"]);
    expect(result.valid).toBe(true);
  });

  test("an unknown slot's blob is not treated as an extra blob", async () => {
    const { archive } = await buildWallLamp({
      extraPayloads: { thumbnail: { bytes: utf8("thumb"), mediaType: "image/png" } },
    });
    const result = await inspectPackageArchive(archive);
    expect(result.diagnostics.map((d) => d.code)).not.toContain("NOOK-BLOB-EXTRA");
  });

  test("an unknown slot survives read-modify-write and keeps its identity contribution", async () => {
    const { archive, blobs } = await buildWallLamp({
      extraPayloads: { thumbnail: { bytes: utf8("thumb"), mediaType: "image/png" } },
    });

    const { bytes, raw } = await readModifyWrite(archive, (rawManifest) => {
      (rawManifest.meta as JsonObject).author = "someone else";
    });
    const rewritten = await inspectPackage(bytes, blobs);

    expect(Object.keys(rewritten.manifest!.payloads).sort()).toEqual(["full", "proxy", "thumbnail"]);
    expect(rewritten.manifest?.payloads.thumbnail.mediaType).toBe("image/png");
    expect(await manifestDigest(raw)).toBe(await manifestDigest(rewritten.manifest!.raw));
  });

  test("unknown fields inside a known payload descriptor are preserved", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        (manifest.payloads as Record<string, JsonObject>).proxy.futureHint = "lod2";
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(result.manifest?.payloads.proxy.unknown).toEqual({ futureHint: "lod2" });
  });
});

suite("unsupported semantics", () => {
  test("an unsupported required capability preserves the data it cannot honour", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [...(manifest.requires as string[]), "nook.component/portal@1"].sort();
        manifest.futureField = { portalConfig: { destination: "lobby" } };
      },
    });
    const result = await inspectPackageArchive(archive, { policy: { role: "inspect-only" } });

    expect(result.supportState).toBe("unsupported-capability");
    expect(result.configurable).toBe(false);
    // Nothing was deleted or blanked on the way through.
    expect(result.manifest?.unknown).toEqual({ futureField: { portalConfig: { destination: "lobby" } } });
    expect(result.manifest?.requires).toContain("nook.component/portal@1");
    expect(result.manifest?.parameters).toHaveLength(2);
  });

  test("an unknown-typed parameter is retained rather than discarded", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        (manifest.parameters as JsonObject[]).push({
          paramId: "prm_future",
          displayName: "Future control",
          type: "curve",
          constraints: { points: [[0, 0], [1, 1]] },
          default: [[0, 0], [1, 1]],
          bindings: [
            {
              representation: "full",
              nodeId: "n_shade",
              propertyPath: "mesh.primitives[0].material.roughnessFactor",
              required: false,
            },
          ],
        });
      },
    });
    const result = await inspectPackageArchive(archive);

    // Rejected as unsupported...
    expect(result.diagnostics.map((d) => d.code)).toContain("NOOK-PARAM-TYPE-UNSUPPORTED");
    // ...but its declaration and value are still fully readable.
    const retained = result.manifest?.parameters.find((p) => p.paramId === "prm_future");
    expect(retained?.type).toBe("curve");
    expect(retained?.default).toEqual([[0, 0], [1, 1]]);
    expect(retained?.constraints).toEqual({ points: [[0, 0], [1, 1]] });
  });

  test("an unsupported manifest major still yields readable metadata", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.spec = "nook.prefab/9";
        manifest.futureField = { somethingNew: true };
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.supportState).toBe("unsupported-spec");
    expect(result.manifest?.unknown).toEqual({ futureField: { somethingNew: true } });
    expect(result.manifest?.meta.name).toBe("Vintage Wall Lamp");
    expect(result.manifestDigest).toMatch(/^sha256:/);
  });
});

suite("payload extras", () => {
  test("unknown extras.nook fields on a node are preserved in the parsed payload", async () => {
    const withExtras = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          nookExtras: { futureNodeHint: { lod: 3 } },
        }),
      ],
    });
    const { archive } = await buildWallLamp({
      full: withExtras,
      proxy: withExtras,
      manifest: (manifest) => {
        manifest.parameters = [];
        manifest.requires = [];
      },
    });
    const result = await inspectPackageArchive(archive);

    const full = result.representations.find((r) => r.role === "full")!;
    const extras = (full.json!.nodes as JsonObject[])[0].extras as JsonObject;
    expect((extras.nook as JsonObject).futureNodeHint).toEqual({ lod: 3 });
    expect(describe(result)).not.toContain("ERROR");
  });

  test("unknown fields on a nested instance record are preserved", async () => {
    const nested = scene({
      nodes: [
        node({
          name: "Root",
          nodeId: "nook.root",
          packageRoot: true,
          prefabInstance: {
            kind: "prefab",
            id: "p_bulb",
            version: "2.0.1",
            digest: `sha256:${"a".repeat(64)}`,
            params: {},
            futureInstanceHint: "keep",
          },
        }),
      ],
    });
    const { archive } = await buildWallLamp({
      full: nested,
      proxy: nested,
      manifest: (manifest) => {
        manifest.parameters = [];
        manifest.requires = [];
        manifest.dependencies = [
          { kind: "prefab", id: "p_bulb", version: "2.0.1", digest: `sha256:${"a".repeat(64)}` },
        ];
      },
    });
    const result = await inspectPackageArchive(archive);

    const full = result.representations.find((r) => r.role === "full")!;
    expect(full.nodes[0].prefabInstance?.unknown).toEqual({ futureInstanceHint: "keep" });
  });

  test("payload bytes are opaque and content-addressed, so they round-trip exactly", async () => {
    const gltf = scene({ nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })] });
    const bytes = buildGlb(gltf, SCENE_BIN);
    const { archive, blobs, digests } = await buildWallLamp({
      rawPayloads: { full: bytes, proxy: bytes },
      manifest: (manifest) => {
        manifest.parameters = [];
        manifest.requires = [];
      },
    });

    const result = await inspectPackageArchive(archive);
    expect(result.payloads.every((p) => p.digestVerified)).toBe(true);
    // Both roles share one blob because identity is content, not role.
    expect(digests.full).toBe(digests.proxy);
    expect(blobs).toHaveLength(1);
    expect(blobs[0].bytes).toEqual(bytes);
  });
});
