/**
 * Normative cross-consumer fixtures.
 *
 * These assert the four semantic-consistency invariants in contract-space
 * terms only — identities, resolved paths, typed values, transforms, component
 * fields, dependency graphs, support states, and diagnostic codes. Nothing here
 * compares rendered output, polygon counts, or hierarchy layouts across roles,
 * because the contract explicitly does not require those to match.
 *
 * An SDK, editor, backend, or third-party validator claiming `nook.prefab/1`
 * conformance should be able to reproduce every expectation below.
 */

import { describe as suite, expect, test } from "bun:test";

import {
  composeEffectiveRoot,
  describeValueProblem,
  fromTRS,
  inspectPackageArchive,
  matricesEquivalent,
  parsePath,
  referenceIdentity,
  referenceKey,
  DEFAULT_POLICY,
} from "../../src/prefab-package/index.ts";
import type { InspectionResult } from "../../src/prefab-package/types.ts";
import {
  BULB_ID,
  BULB_VERSION,
  EXTENSION_PARAM,
  SHADE_COLOR_PARAM,
  WALL_LAMP_ID,
  WALL_LAMP_VERSION,
  buildBulb,
  buildWallLamp,
  buildWallLampWithNestedBulb,
} from "../fixtures/prefab-package/packages.ts";
import { find } from "./helpers.ts";

suite("invariant 1 — parameter semantic consistency", () => {
  test("one colour parameter reaches different compatible paths in each representation", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);
    const parameter = result.manifest!.parameters.find((p) => p.paramId === SHADE_COLOR_PARAM)!;

    const resolved = parameter.bindings.map((binding) => {
      const parsed = parsePath(binding.propertyPath, DEFAULT_POLICY.path);
      if (!parsed.ok) throw new Error(parsed.error.detail);
      return { representation: binding.representation, ...parsed.path };
    });

    // Different paths, different selectors, different materials — one meaning.
    expect(resolved.map((r) => r.representation)).toEqual(["full", "proxy"]);
    expect(resolved[0].canonical).not.toBe(resolved[1].canonical);
    expect(resolved[0].target).toMatchObject({ selector: { by: "materialName", name: "ShadeGlass" } });
    expect(resolved[1].target).toMatchObject({ selector: { by: "primitiveIndex", index: 0 } });
    expect(new Set(resolved.map((r) => r.valueKind))).toEqual(new Set(["color4"]));
  });

  test("a value valid for the declaration is valid for every representation", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);
    const parameter = result.manifest!.parameters.find((p) => p.paramId === SHADE_COLOR_PARAM)!;

    // Type and constraints live on the declaration, not on any binding, so the
    // verdict cannot differ per representation.
    expect(describeValueProblem(parameter.type, parameter.constraints, "#AA8844")).toBeNull();
    expect(describeValueProblem(parameter.type, parameter.constraints, "#AA88")).not.toBeNull();
    expect(parameter.bindings.every((binding) => binding.representation !== "")).toBe(true);
  });

  test("a parameter without a proxy binding changes preview only, not full semantics", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const parameter = (manifest.parameters as Record<string, unknown>[])[0];
        parameter.bindings = [(parameter.bindings as unknown[])[0]];
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-BINDING-PROXY-ABSENT")?.severity).toBe("INFO");
    expect(result.valid).toBe(true);
    const parameter = result.manifest!.parameters[0];
    expect(parameter.bindings.filter((b) => b.representation === "full")).toHaveLength(1);
  });

  test("constraint checking is independent of which payload is present", async () => {
    const { manifestBytes, blobs, digests } = await buildWallLamp();
    const { inspectPackage } = await import("../../src/prefab-package/index.ts");

    const proxyOnly = blobs.filter((b) => b.path.includes(digests.proxy.replace(":", "_")));
    const withProxy = await inspectPackage(manifestBytes, proxyOnly);
    const withBoth = await inspectPackage(manifestBytes, blobs);

    const constraintsOf = (result: InspectionResult) =>
      result.manifest!.parameters.map((p) => [p.paramId, p.type, p.constraints]);
    expect(constraintsOf(withProxy)).toEqual(constraintsOf(withBoth));
  });
});

suite("invariant 2 — transform composition consistency", () => {
  /**
   * The normative transform fixture. Two implementations evaluating these
   * inputs must agree within `TRANSFORM_TOLERANCE` in contract space.
   */
  const FIXTURE = {
    worldAncestors: [
      { translation: [12, 0, -4] as const, rotation: [0, 0.7071067811865476, 0, 0.7071067811865476] as const },
    ],
    instancePlacement: { translation: [0, 2.5, 0] as const, scale: [2, 2, 2] as const },
    storedPackageRoot: { translation: [0, 0, 0.25] as const },
    // storedRoot puts the origin at (0, 0, 0.25); placement scales it to
    // (0, 0, 0.5) and lifts it to (0, 2.5, 0.5); the ancestor's quarter turn
    // about +Y maps (x, y, z) to (z, y, -x), giving (0.5, 2.5, 0), then its
    // translation gives (12.5, 2.5, -4).
    expectedRootOrigin: [12.5, 2.5, -4] as const,
  };

  test("the fixture composition yields the declared contract-space result", async () => {
    const ancestors = FIXTURE.worldAncestors.map((a) => fromTRS(a.translation, a.rotation));
    const placement = fromTRS(
      FIXTURE.instancePlacement.translation,
      undefined,
      FIXTURE.instancePlacement.scale,
    );
    const storedRoot = fromTRS(FIXTURE.storedPackageRoot.translation);

    const effective = composeEffectiveRoot(ancestors, placement, storedRoot);
    const origin = [effective[12], effective[13], effective[14]];

    for (let i = 0; i < 3; i += 1) {
      expect(Math.abs(origin[i] - FIXTURE.expectedRootOrigin[i])).toBeLessThan(1e-9);
    }
  });

  test("the stored root a package actually declares feeds that composition", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    for (const representation of result.representations) {
      // Both roles carry the same stored root here, but the contract does not
      // require that — what it requires is that each role's own stored root is
      // the one composed.
      const effective = composeEffectiveRoot(
        FIXTURE.worldAncestors.map((a) => fromTRS(a.translation, a.rotation)),
        fromTRS(FIXTURE.instancePlacement.translation, undefined, FIXTURE.instancePlacement.scale),
        representation.storedRootMatrix,
      );
      for (let i = 0; i < 3; i += 1) {
        expect(Math.abs(effective[12 + i] - FIXTURE.expectedRootOrigin[i])).toBeLessThan(1e-9);
      }
    }

    // Discarding the stored root would move the result, which is the data loss
    // the composition rule exists to prevent.
    const discarded = composeEffectiveRoot(
      FIXTURE.worldAncestors.map((a) => fromTRS(a.translation, a.rotation)),
      fromTRS(FIXTURE.instancePlacement.translation, undefined, FIXTURE.instancePlacement.scale),
      fromTRS(),
    );
    expect(matricesEquivalent(discarded.slice(12, 15), FIXTURE.expectedRootOrigin.slice())).toBe(false);
  });

  test("a nested instance places by its node transform, recursively", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest);
    const result = await inspectPackageArchive(archive);

    const full = result.representations.find((r) => r.role === "full")!;
    const socket = full.nodes.find((n) => n.nodeId === "n_bulb_socket")!;

    // The node transform *is* the nested placement — no separate field.
    expect(socket.localMatrix.slice(12, 15)).toEqual([0, -0.1, 0]);
    expect(socket.prefabInstance).toBeDefined();
  });
});

suite("invariant 3 — identity and version consistency", () => {
  test("a reference denotes exactly one immutable version", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    expect(result.manifest!.id).toBe(WALL_LAMP_ID);
    expect(result.manifest!.version).toBe(WALL_LAMP_VERSION);
    expect(result.manifestDigest).toMatch(/^sha256:[0-9a-f]{64}$/);
  });

  test("two versions of one id remain distinguishable", async () => {
    const v1 = await buildWallLamp();
    const v2 = await buildWallLamp({
      manifest: (manifest) => {
        manifest.version = "1.3.0";
      },
    });

    const first = await inspectPackageArchive(v1.archive);
    const second = await inspectPackageArchive(v2.archive);

    expect(first.manifest!.id).toBe(second.manifest!.id);
    expect(first.manifest!.version).not.toBe(second.manifest!.version);
    expect(first.manifestDigest).not.toBe(second.manifestDigest);
  });

  test("reference keys distinguish tuple identity from artifact identity", () => {
    const base = { kind: "prefab", id: BULB_ID, version: BULB_VERSION, unknown: Object.freeze({}) };
    const a = { ...base, digest: `sha256:${"a".repeat(64)}` };
    const b = { ...base, digest: `sha256:${"b".repeat(64)}` };

    expect(referenceKey(a)).toBe(referenceKey(b));
    expect(referenceIdentity(a)).not.toBe(referenceIdentity(b));
  });

  test("a digest disagreeing with the pinned tuple is reported, not silently resolved", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, {
      declaredDigest: `sha256:${"5".repeat(64)}`,
    });
    const result = await inspectPackageArchive(archive);

    // Neither artifact is chosen; the disagreement itself is the finding.
    expect(find(result, "NOOK-DEPENDENCY-MISMATCH")?.severity).toBe("ERROR");
    expect(result.valid).toBe(false);
  });

  test("a newer available version does not displace a pinned one", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest);

    const { createLocalResolver, parseManifestBytes, resolvePolicy } = await import(
      "../../src/prefab-package/index.ts"
    );
    const { DiagnosticCollector } = await import("../../src/prefab-package/diagnostics.ts");
    const parsed = parseManifestBytes(
      bulb.manifestBytes,
      "manifest.json",
      resolvePolicy(),
      new DiagnosticCollector(),
    ).manifest!;
    const newer = { ...parsed, version: "2.1.0" };

    const result = await inspectPackageArchive(archive, {
      resolver: createLocalResolver([parsed, newer]),
    });

    expect(result.dependencyReport!.declared[0].version).toBe(BULB_VERSION);
    expect(result.dependencyReport!.unresolved).toEqual([]);
    expect(result.discoveredReferences[0].reference.version).toBe(BULB_VERSION);
  });
});

suite("invariant 4 — diagnostic semantic consistency", () => {
  /**
   * The normative missing-required-binding fixture. Independent validators must
   * emit this code and severity and name the same semantic target.
   */
  test("the missing required full binding fixture has a fixed observable shape", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const bindings = (manifest.parameters as Record<string, unknown>[])[0].bindings as Record<
          string,
          unknown
        >[];
        bindings[0].nodeId = "n_absent";
      },
    });
    const result = await inspectPackageArchive(archive);
    const diagnostic = find(result, "NOOK-BINDING-REQUIRED-UNRESOLVED")!;

    expect({
      code: diagnostic.code,
      severity: diagnostic.severity,
      phase: diagnostic.phase,
      representation: diagnostic.representation,
      paramId: diagnostic.paramId,
      nodeId: diagnostic.nodeId,
      location: diagnostic.location,
      valid: result.valid,
    }).toEqual({
      code: "NOOK-BINDING-REQUIRED-UNRESOLVED",
      severity: "ERROR",
      phase: "parameters",
      representation: "full",
      paramId: SHADE_COLOR_PARAM,
      nodeId: "n_absent",
      location: "manifest.json#/parameters/0/bindings/0/propertyPath",
      valid: false,
    });
  });

  test("the same defect produces the same code regardless of unrelated content", async () => {
    const shape = async (extra?: (manifest: Record<string, unknown>) => void) => {
      const { archive } = await buildWallLamp({
        manifest: (manifest) => {
          const bindings = (manifest.parameters as Record<string, unknown>[])[0].bindings as Record<
            string,
            unknown
          >[];
          bindings[0].nodeId = "n_absent";
          extra?.(manifest as Record<string, unknown>);
        },
      });
      const result = await inspectPackageArchive(archive);
      const diagnostic = find(result, "NOOK-BINDING-REQUIRED-UNRESOLVED")!;
      return { code: diagnostic.code, severity: diagnostic.severity, paramId: diagnostic.paramId };
    };

    expect(await shape()).toEqual(
      await shape((manifest) => {
        (manifest.meta as Record<string, unknown>).name = "A Completely Different Lamp";
        (manifest.meta as Record<string, unknown>).tags = ["x", "y", "z"];
      }),
    );
  });

  test("ordering is stable so snapshots agree between implementations", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.version = "bad";
        manifest.requires = ["nook.parameter/color@1", "nook.component/collider@1"];
        const parameters = manifest.parameters as Record<string, unknown>[];
        parameters[0].default = 5;
        (parameters[1].bindings as Record<string, unknown>[])[0].nodeId = "n_absent";
      },
    });

    const first = await inspectPackageArchive(archive);
    const second = await inspectPackageArchive(archive);

    expect(second.diagnostics).toEqual(first.diagnostics);
    expect(first.diagnostics.length).toBeGreaterThan(3);
  });

  test("policy is part of the contract for reproducibility", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [
          {
            kind: "prefab",
            id: BULB_ID,
            version: BULB_VERSION,
            digest: `sha256:${"a".repeat(64)}`,
          },
        ];
      },
    });

    const lenient = await inspectPackageArchive(archive);
    const strict = await inspectPackageArchive(archive, {
      policy: { unusedDependencySeverity: "ERROR" },
    });

    // Same code, policy-determined severity — which is why a conformance claim
    // has to state its policy.
    expect(find(lenient, "NOOK-DEPENDENCY-UNUSED")?.severity).toBe("WARNING");
    expect(find(strict, "NOOK-DEPENDENCY-UNUSED")?.severity).toBe("ERROR");
  });
});

suite("consistency without pixel equivalence", () => {
  test("roles differing in topology and fidelity still satisfy every invariant", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    const full = result.representations.find((r) => r.role === "full")!;
    const proxy = result.representations.find((r) => r.role === "proxy")!;

    // Deliberately different structure...
    expect(full.nodes.map((n) => n.nodeId)).not.toEqual(proxy.nodes.map((n) => n.nodeId));
    expect(full.materialNames).not.toEqual(proxy.materialNames);
    expect(full.nodes[0].components.length).not.toBe(proxy.nodes[0].components.length);

    // ...yet identical contract-space semantics.
    expect(full.rootIndex).not.toBeNull();
    expect(proxy.rootIndex).not.toBeNull();
    expect(full.nodes[full.rootIndex!].nodeId).toBe(proxy.nodes[proxy.rootIndex!].nodeId);
    expect(full.storedRootMatrix).toEqual(proxy.storedRootMatrix);
    expect(result.valid).toBe(true);
  });

  test("the fixture corpus exposes the observable surface a consumer must reproduce", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    expect({
      id: result.manifest!.id,
      version: result.manifest!.version,
      supportState: result.supportState,
      configurable: result.configurable,
      valid: result.valid,
      payloadRoles: result.payloads.map((p) => p.role),
      parameters: result.manifest!.parameters.map((p) => [p.paramId, p.type]),
      capabilities: [...result.discoveredCapabilities],
      references: result.discoveredReferences.length,
      errorCount: result.diagnostics.filter((d) => d.severity === "ERROR").length,
    }).toEqual({
      id: WALL_LAMP_ID,
      version: WALL_LAMP_VERSION,
      supportState: "supported",
      configurable: true,
      valid: true,
      payloadRoles: ["full", "proxy"],
      parameters: [
        [SHADE_COLOR_PARAM, "color"],
        [EXTENSION_PARAM, "float"],
      ],
      capabilities: [
        "nook.component/collider@1",
        "nook.parameter/color@1",
        "nook.parameter/float@1",
        "nook.path@1",
      ],
      references: 0,
      errorCount: 0,
    });
  });
});
