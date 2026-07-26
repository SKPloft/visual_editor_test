import { describe as suite, expect, test } from "bun:test";

import { inspectPackage, inspectPackageArchive } from "../../src/prefab-package/index.ts";
import {
  EXTENSION_PARAM,
  SHADE_COLOR_PARAM,
  WALL_LAMP_ID,
  WALL_LAMP_REQUIRES,
  WALL_LAMP_VERSION,
  buildWallLamp,
} from "../fixtures/prefab-package/packages.ts";
import { describe, errorCodes, find } from "./helpers.ts";

suite("valid package inspection", () => {
  test("the reference package inspects clean", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    expect(describe(result)).not.toContain("ERROR");
    expect(result.valid).toBe(true);
    expect(result.supportState).toBe("supported");
    expect(result.configurable).toBe(true);
  });

  test("exposes exact identity, payload roles, parameters, and capabilities", async () => {
    const { archive, digests } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    expect(result.manifest?.id).toBe(WALL_LAMP_ID);
    expect(result.manifest?.version).toBe(WALL_LAMP_VERSION);
    expect(result.manifestDigest).toMatch(/^sha256:[0-9a-f]{64}$/);

    expect(result.payloads.map((p) => p.role).sort()).toEqual(["full", "proxy"]);
    expect(result.payloads.every((p) => p.present && p.digestVerified)).toBe(true);
    expect(result.payloads.find((p) => p.role === "full")?.digest).toBe(digests.full);

    expect(result.manifest?.parameters.map((p) => p.paramId)).toEqual([
      SHADE_COLOR_PARAM,
      EXTENSION_PARAM,
    ]);
    expect([...result.discoveredCapabilities]).toEqual(WALL_LAMP_REQUIRES);
    expect(result.dependencyReport?.declared).toEqual([]);
    expect(result.dependencyReport?.discovered).toEqual([]);
  });

  test("resolves one logical root per representation and preserves its transform", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    for (const representation of result.representations) {
      expect(representation.parsed).toBe(true);
      expect(representation.rootIndex).toBe(0);
      expect(representation.nodes[0].nodeId).toBe("nook.root");
      // The stored root translation must survive inspection untouched: consumers
      // compose it, they do not replace it.
      expect(representation.storedRootMatrix.slice(12, 15)).toEqual([0, 0, 0.25]);
    }
  });

  test("wire form and archive form agree", async () => {
    const { archive, manifestBytes, blobs } = await buildWallLamp();
    const fromArchive = await inspectPackageArchive(archive);
    const fromWire = await inspectPackage(manifestBytes, blobs);

    expect(fromWire.valid).toBe(true);
    expect(fromWire.manifestDigest).toBe(fromArchive.manifestDigest);
    expect(fromWire.diagnostics.map((d) => d.code)).toEqual(
      fromArchive.diagnostics.map((d) => d.code),
    );
  });
});

suite("staged validation and diagnostic ordering", () => {
  test("diagnostics are ordered by phase, then location, then code", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = ["nook.parameter/color@1", "nook.component/collider@1"]; // unsorted
        manifest.version = "not-a-version";
        (manifest.parameters as Record<string, unknown>[])[0].default = "not-a-colour";
      },
    });
    const result = await inspectPackageArchive(archive);

    const phases = result.diagnostics.map((d) => d.phase);
    const order = ["archive", "manifest", "integrity", "payload", "parameters", "dependencies", "capabilities"];
    const indices = phases.map((phase) => order.indexOf(phase));
    expect(indices).toEqual([...indices].sort((a, b) => a - b));

    // Same input, same policy, same order — every time.
    const again = await inspectPackageArchive(archive);
    expect(again.diagnostics).toEqual(result.diagnostics);
  });

  test("independent defects are all reported in one pass", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.id = "not a legal id";
        manifest.version = "1.2";
        (manifest.parameters as Record<string, unknown>[])[0].default = 42;
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(errorCodes(result)).toContain("NOOK-MANIFEST-INVALID-ID");
    expect(errorCodes(result)).toContain("NOOK-MANIFEST-INVALID-VERSION");
    expect(errorCodes(result)).toContain("NOOK-PARAM-DEFAULT-INVALID");
  });

  test("an unsupported manifest major stops semantic consumption but keeps metadata", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.spec = "nook.prefab/99";
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.supportState).toBe("unsupported-spec");
    expect(result.valid).toBe(false);
    expect(result.configurable).toBe(false);
    expect(find(result, "NOOK-UNSUPPORTED-SPEC")).toBeDefined();
    // Safe metadata is still available for identification.
    expect(result.manifest?.id).toBe(WALL_LAMP_ID);
    expect(result.manifestDigest).toMatch(/^sha256:/);
    // Nothing beyond integrity was interpreted under an unknown major.
    expect(result.representations).toEqual([]);
  });

  test("a fatal envelope defect stops deeper parsing", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive, {
      policy: { archive: { maxEntries: 1 } },
    });

    expect(result.diagnostics.map((d) => d.code)).toEqual(["NOOK-ARCHIVE-TOO-MANY-ENTRIES"]);
    expect(result.manifest).toBeNull();
    expect(result.manifestDigest).toBeNull();
  });
});

suite("severity controls consumability", () => {
  test("a package with only a degraded-preview warning stays valid", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        // The manual proxy has no such node; the binding is optional.
        const parameters = manifest.parameters as Record<string, unknown>[];
        const bindings = parameters[0].bindings as Record<string, unknown>[];
        bindings[1].nodeId = "n_absent_in_proxy";
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.valid).toBe(true);
    const degraded = find(result, "NOOK-BINDING-PROXY-DEGRADED");
    expect(degraded?.severity).toBe("WARNING");
    expect(degraded?.paramId).toBe(SHADE_COLOR_PARAM);
    expect(degraded?.representation).toBe("proxy");
  });

  test("an integrity error invalidates the package for every semantic role", async () => {
    const { archive } = await buildWallLamp({
      payloadOverrides: { proxy: { substituteBytes: new Uint8Array([1, 2, 3, 4]) } },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.valid).toBe(false);
    expect(errorCodes(result)).toContain("NOOK-BLOB-DIGEST-MISMATCH");
  });

  test("a partially readable package still returns safe manifest metadata", async () => {
    const { archive } = await buildWallLamp({
      payloadOverrides: { proxy: { substituteBytes: new Uint8Array([1, 2, 3, 4]) } },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.manifest?.meta.name).toBe("Vintage Wall Lamp");
    expect(result.payloads.find((p) => p.role === "full")?.digestVerified).toBe(true);
    expect(result.payloads.find((p) => p.role === "proxy")?.digestVerified).toBe(false);
    expect(result.representations.find((r) => r.role === "full")?.parsed).toBe(true);
    expect(result.representations.find((r) => r.role === "proxy")?.parsed).toBe(false);
    expect(result.valid).toBe(false);
  });
});
