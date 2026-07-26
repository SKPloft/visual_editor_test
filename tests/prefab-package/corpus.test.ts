/**
 * End-to-end conformance over the normative corpus.
 *
 * This is the inspector exercised the way a consumer uses it: `.nookpkg` bytes
 * in, one immutable result out, checked against the exact diagnostic codes the
 * contract promises. Every entry here is reproducible by an independent
 * implementation.
 */

import { describe as suite, expect, test } from "bun:test";

import { inspectPackageArchive } from "../../src/prefab-package/index.ts";
import { CORPUS } from "../fixtures/prefab-package/corpus.ts";
import { describe } from "./helpers.ts";

suite("normative corpus", () => {
  for (const entry of CORPUS) {
    test(`${entry.name}: ${entry.description}`, async () => {
      const { archive } = await entry.build();
      const result = await inspectPackageArchive(archive, entry.options);

      expect({
        codes: result.diagnostics.map((d) => d.code),
        valid: result.valid,
        supportState: result.supportState,
        configurable: result.configurable,
      }).toEqual({
        codes: entry.expectedCodes,
        valid: entry.expectedValid,
        supportState: entry.expectedSupportState,
        configurable: entry.expectedConfigurable,
      });
    });
  }

  test("every corpus entry is reproducible byte for byte", async () => {
    for (const entry of CORPUS) {
      const first = await entry.build();
      const second = await entry.build();
      expect({ name: entry.name, equal: first.archive.length === second.archive.length }).toEqual({
        name: entry.name,
        equal: true,
      });
      expect(second.archive).toEqual(first.archive);
    }
  });

  test("every corpus entry inspects deterministically", async () => {
    for (const entry of CORPUS) {
      const { archive } = await entry.build();
      const first = await inspectPackageArchive(archive, entry.options);
      const second = await inspectPackageArchive(archive, entry.options);
      expect(second.diagnostics).toEqual(first.diagnostics);
    }
  });

  test("inspection never throws, whatever the package contains", async () => {
    for (const entry of CORPUS) {
      const { archive } = await entry.build();
      // Also feed each archive through a hostile-truncation pass.
      for (const bytes of [archive, archive.slice(0, Math.floor(archive.length / 2))]) {
        const result = await inspectPackageArchive(bytes, entry.options);
        expect(typeof result.valid).toBe("boolean");
        expect(Array.isArray(result.diagnostics)).toBe(true);
      }
    }
  });
});

suite("valid corpus entries in detail", () => {
  test("the reference package exposes a complete, verified inventory", async () => {
    const entry = CORPUS.find((candidate) => candidate.name === "valid-wall-lamp")!;
    const { archive } = await entry.build();
    const result = await inspectPackageArchive(archive);

    expect(describe(result)).not.toContain("ERROR");
    expect(result.payloads).toEqual([
      {
        role: "full",
        digest: result.payloads[0].digest,
        declaredSize: result.payloads[0].declaredSize,
        actualSize: result.payloads[0].declaredSize,
        present: true,
        digestVerified: true,
        known: true,
      },
      {
        role: "proxy",
        digest: result.payloads[1].digest,
        declaredSize: result.payloads[1].declaredSize,
        actualSize: result.payloads[1].declaredSize,
        present: true,
        digestVerified: true,
        known: true,
      },
    ]);
    expect(result.representations.every((representation) => representation.parsed)).toBe(true);
  });

  test("the nested-dependency package resolves its declared closure", async () => {
    const entry = CORPUS.find((candidate) => candidate.name === "valid-nested-dependency")!;
    const { archive } = await entry.build();
    const result = await inspectPackageArchive(archive);

    expect(result.dependencyReport?.declared).toHaveLength(1);
    expect(result.dependencyReport?.undeclared).toEqual([]);
    expect(result.dependencyReport?.mismatched).toEqual([]);
    expect(result.discoveredReferences).toHaveLength(1);
  });
});
