import { describe as suite, expect, test } from "bun:test";

import {
  createLocalResolver,
  inspectPackageArchive,
  parseManifestBytes,
  resolvePolicy,
} from "../../src/prefab-package/index.ts";
import { DiagnosticCollector } from "../../src/prefab-package/diagnostics.ts";
import type { PrefabManifest } from "../../src/prefab-package/types.ts";
import type { BuiltPackage } from "../fixtures/prefab-package/build.ts";
import {
  BULB_ID,
  BULB_VERSION,
  buildBulb,
  buildWallLamp,
  buildWallLampWithNestedBulb,
} from "../fixtures/prefab-package/packages.ts";
import { codes, describe, errorCodes, find } from "./helpers.ts";

/** Parses a built package's manifest so it can be fed to a local resolver. */
function manifestOf(built: BuiltPackage): PrefabManifest {
  const diagnostics = new DiagnosticCollector();
  const { manifest } = parseManifestBytes(
    built.manifestBytes,
    "manifest.json",
    resolvePolicy(),
    diagnostics,
  );
  if (!manifest) throw new Error("fixture manifest did not parse");
  return manifest;
}

suite("dependency coverage", () => {
  test("a nested reference covered by a declaration validates", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest);

    const result = await inspectPackageArchive(archive);

    expect(describe(result)).not.toContain("ERROR");
    expect(result.dependencyReport?.undeclared).toEqual([]);
    expect(result.dependencyReport?.mismatched).toEqual([]);
    expect(result.discoveredReferences).toHaveLength(1);
    expect(result.discoveredReferences[0]).toMatchObject({
      origin: "nested-instance",
      representation: "full",
      nodeId: "n_bulb_socket",
    });
  });

  test("a nested reference absent from dependencies is an error", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, { declareDependency: false });

    const result = await inspectPackageArchive(archive);
    const diagnostic = find(result, "NOOK-DEPENDENCY-UNDECLARED");

    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.packageRef).toBe(`prefab:${BULB_ID}@${BULB_VERSION}`);
    expect(diagnostic?.nodeId).toBe("n_bulb_socket");
    expect(diagnostic?.location).toContain("extras/nook/prefabInstance");
    expect(result.dependencyReport?.undeclared).toHaveLength(1);
  });

  test("a declaration whose digest disagrees with the usage is an error", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;

    // Same kind:id@version in both places, two different artifacts.
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, {
      declaredDigest: `sha256:${"9".repeat(64)}`,
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-DEPENDENCY-MISMATCH");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.packageRef).toBe(`prefab:${BULB_ID}@${BULB_VERSION}`);
    expect(diagnostic?.detail).toContain("cannot denote two artifacts");
    expect(result.dependencyReport?.mismatched).toHaveLength(1);
    // The tuple *is* declared, so this is not an undeclared reference.
    expect(codes(result)).not.toContain("NOOK-DEPENDENCY-UNDECLARED");
    expect(result.valid).toBe(false);
  });

  test("a declared dependency the package does not use is reported", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [
          { kind: "prefab", id: BULB_ID, version: BULB_VERSION, digest: `sha256:${"a".repeat(64)}` },
        ];
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-DEPENDENCY-UNUSED");
    expect(diagnostic?.severity).toBe("WARNING");
    expect(result.valid).toBe(true);
    expect(result.dependencyReport?.unused).toHaveLength(1);
  });

  test("unused-dependency severity follows policy", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [
          { kind: "prefab", id: BULB_ID, version: BULB_VERSION, digest: `sha256:${"a".repeat(64)}` },
        ];
      },
    });
    const strict = await inspectPackageArchive(archive, {
      policy: { unusedDependencySeverity: "ERROR" },
    });

    expect(find(strict, "NOOK-DEPENDENCY-UNUSED")?.severity).toBe("ERROR");
    expect(strict.valid).toBe(false);
  });

  test("a duplicated dependency tuple is rejected", async () => {
    const reference = {
      kind: "prefab",
      id: BULB_ID,
      version: BULB_VERSION,
      digest: `sha256:${"a".repeat(64)}`,
    };
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [reference, { ...reference }];
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-DEPENDENCY-DUPLICATE");
  });

  test("the same tuple declared against two digests is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [
          { kind: "prefab", id: BULB_ID, version: BULB_VERSION, digest: `sha256:${"a".repeat(64)}` },
          { kind: "prefab", id: BULB_ID, version: BULB_VERSION, digest: `sha256:${"b".repeat(64)}` },
        ];
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-DEPENDENCY-DUPLICATE")?.detail).toContain("conflicting digests");
  });

  test("dependency reporting is deterministic across runs", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, { declareDependency: false });

    const first = await inspectPackageArchive(archive);
    const second = await inspectPackageArchive(archive);
    expect(second.diagnostics).toEqual(first.diagnostics);
  });
});

suite("injected local resolution", () => {
  test("a resolvable dependency produces no unresolved report", async () => {
    const bulb = await buildBulb();
    const bulbManifest = manifestOf(bulb);
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest);

    const result = await inspectPackageArchive(archive, {
      resolver: createLocalResolver([bulbManifest]),
    });

    expect(describe(result)).not.toContain("ERROR");
    expect(result.dependencyReport?.unresolved).toEqual([]);
  });

  test("missing external context is distinguished from an inconsistent package", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest);

    const result = await inspectPackageArchive(archive, {
      resolver: createLocalResolver([]), // nothing available locally
    });

    const diagnostic = find(result, "NOOK-DEPENDENCY-UNRESOLVED");
    expect(diagnostic?.severity).toBe("INFO");
    expect(diagnostic?.detail).toContain("not an inconsistency in this package");
    // The package itself is internally consistent, so it stays valid.
    expect(result.valid).toBe(true);
    expect(result.dependencyReport?.unresolved).toHaveLength(1);
    expect(codes(result)).not.toContain("NOOK-DEPENDENCY-UNDECLARED");
  });

  test("no resolver means no dependency graph claims at all", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest);

    const result = await inspectPackageArchive(archive);
    expect(codes(result)).not.toContain("NOOK-DEPENDENCY-UNRESOLVED");
    expect(result.dependencyReport?.cycles).toEqual([]);
  });

  test("a direct cycle is detected and named", async () => {
    // A depends on B, and the injected B depends back on A.
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const lamp = await buildWallLampWithNestedBulb(bulbDigest);
    const lampDigest = (await inspectPackageArchive(lamp.archive)).manifestDigest!;

    const cyclicBulb = manifestOf(bulb);
    const cyclic: PrefabManifest = {
      ...cyclicBulb,
      dependencies: [
        {
          kind: "prefab",
          id: "p_wall_lamp",
          version: "1.2.0",
          digest: lampDigest,
          unknown: Object.freeze({}),
        },
      ],
    };

    const result = await inspectPackageArchive(lamp.archive, {
      resolver: createLocalResolver([cyclic, manifestOf(lamp)]),
    });

    const diagnostic = find(result, "NOOK-DEPENDENCY-CYCLE");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.detail).toContain("prefab:p_wall_lamp@1.2.0");
    expect(diagnostic?.detail).toContain(`prefab:${BULB_ID}@${BULB_VERSION}`);
    expect(result.dependencyReport?.cycles[0][0]).toBe(
      result.dependencyReport?.cycles[0].at(-1),
    );
  });

  test("a transitive cycle is detected", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const lamp = await buildWallLampWithNestedBulb(bulbDigest);
    const lampDigest = (await inspectPackageArchive(lamp.archive)).manifestDigest!;

    const reference = (id: string, version: string, digest: string) => ({
      kind: "prefab",
      id,
      version,
      digest,
      unknown: Object.freeze({}),
    });

    // lamp -> bulb -> filament -> lamp
    const filament: PrefabManifest = {
      ...manifestOf(bulb),
      id: "p_filament",
      version: "1.0.0",
      dependencies: [reference("p_wall_lamp", "1.2.0", lampDigest)],
    };
    const bulbWithFilament: PrefabManifest = {
      ...manifestOf(bulb),
      dependencies: [reference("p_filament", "1.0.0", `sha256:${"7".repeat(64)}`)],
    };

    const result = await inspectPackageArchive(lamp.archive, {
      resolver: createLocalResolver([bulbWithFilament, filament, manifestOf(lamp)]),
    });

    const diagnostic = find(result, "NOOK-DEPENDENCY-CYCLE");
    expect(diagnostic?.detail).toContain("p_filament@1.0.0");
  });

  test("an unresolvable branch ends quietly rather than inventing a verdict", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const lamp = await buildWallLampWithNestedBulb(bulbDigest);

    const result = await inspectPackageArchive(lamp.archive, {
      resolver: createLocalResolver([manifestOf(lamp)]),
    });
    expect(codes(result)).not.toContain("NOOK-DEPENDENCY-CYCLE");
    expect(find(result, "NOOK-DEPENDENCY-UNRESOLVED")).toBeDefined();
  });
});

suite("nested instance parameter values", () => {
  test("values are validated against the pinned nested declaration", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, {
      nestedParams: { prm_bulb_color: "not-a-colour" },
    });

    const result = await inspectPackageArchive(archive, {
      resolver: createLocalResolver([manifestOf(bulb)]),
    });

    const diagnostic = find(result, "NOOK-PARAM-VALUE-INVALID");
    expect(diagnostic?.paramId).toBe("prm_bulb_color");
    expect(diagnostic?.packageRef).toBe(`prefab:${BULB_ID}@${BULB_VERSION}`);
    expect(diagnostic?.detail).toContain("#RRGGBB");
  });

  test("assigning a parameter the nested package does not declare is rejected", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, {
      nestedParams: { prm_not_declared: 1 },
    });

    const result = await inspectPackageArchive(archive, {
      resolver: createLocalResolver([manifestOf(bulb)]),
    });
    expect(find(result, "NOOK-PARAM-VALUE-INVALID")?.detail).toContain("does not declare");
  });

  test("valid nested values pass", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, {
      nestedParams: { prm_bulb_color: "#FFEECC" },
    });

    const result = await inspectPackageArchive(archive, {
      resolver: createLocalResolver([manifestOf(bulb)]),
    });
    expect(describe(result)).not.toContain("ERROR");
  });

  test("values are not judged when the nested manifest is unavailable", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive } = await buildWallLampWithNestedBulb(bulbDigest, {
      nestedParams: { prm_bulb_color: "not-a-colour" },
    });

    const result = await inspectPackageArchive(archive, { resolver: createLocalResolver([]) });
    expect(codes(result)).not.toContain("NOOK-PARAM-VALUE-INVALID");
  });
});

suite("archive scope", () => {
  test("a package declaring a dependency but bundling only its own blobs is complete", async () => {
    const bulb = await buildBulb();
    const bulbDigest = (await inspectPackageArchive(bulb.archive)).manifestDigest!;
    const { archive, blobs } = await buildWallLampWithNestedBulb(bulbDigest);

    const result = await inspectPackageArchive(archive);

    // Exactly the lamp's own two payloads: a .nookpkg is not a closure bundle.
    expect(blobs).toHaveLength(2);
    expect(result.payloads.every((payload) => payload.present && payload.digestVerified)).toBe(true);
    expect(result.dependencyReport?.declared).toHaveLength(1);
    expect(describe(result)).not.toContain("ERROR");
  });
});
