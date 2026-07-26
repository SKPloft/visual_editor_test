import { createHash } from "node:crypto";
import { describe as suite, expect, test } from "bun:test";

import {
  blobFileName,
  canonicalJsonString,
  canonicalStringArray,
  isCanonicalStringArray,
  isValidDigest,
  manifestDigest,
  sha256Digest,
} from "../../src/prefab-package/index.ts";
import { inspectPackageArchive } from "../../src/prefab-package/index.ts";
import { buildWallLamp } from "../fixtures/prefab-package/packages.ts";
import { errorCodes } from "./helpers.ts";

/**
 * The independent-implementation check.
 *
 * These literals are what RFC 8785 requires of *any* conforming implementation:
 * object keys sorted by UTF-16 code unit, no insignificant whitespace, arrays
 * left in document order, and ECMAScript number serialization. A second SDK
 * that produces these strings will produce our digests.
 */
suite("RFC 8785 canonicalization", () => {
  test("sorts object keys and removes whitespace", () => {
    expect(canonicalJsonString({ b: 1, a: 2 } as never)).toBe('{"a":2,"b":1}');
    expect(canonicalJsonString({ z: { y: 1, x: 2 }, a: [] } as never)).toBe(
      '{"a":[],"z":{"x":2,"y":1}}',
    );
  });

  test("leaves array order alone", () => {
    expect(canonicalJsonString({ v: [3, 1, 2] } as never)).toBe('{"v":[3,1,2]}');
  });

  test("serializes numbers as ECMAScript does", () => {
    expect(canonicalJsonString({ a: 1.0, b: 1e21, c: -0.5, d: 100 } as never)).toBe(
      '{"a":1,"b":1e+21,"c":-0.5,"d":100}',
    );
  });

  test("escapes strings without transforming their content", () => {
    expect(canonicalJsonString({ s: 'é"\\\n' } as never)).toBe('{"s":"é\\"\\\\\\n"}');
  });
});

suite("digests", () => {
  test("sha256Digest matches an independent hash implementation", async () => {
    const bytes = new TextEncoder().encode("nook prefab package");
    const expected = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
    expect(await sha256Digest(bytes)).toBe(expected);
  });

  test("digest format is sha256 plus 64 lowercase hex", async () => {
    const digest = await sha256Digest(new Uint8Array([0]));
    expect(isValidDigest(digest)).toBe(true);
    expect(isValidDigest(digest.toUpperCase())).toBe(false);
    expect(isValidDigest("sha256:abc")).toBe(false);
    expect(isValidDigest("md5:0".padEnd(69, "0"))).toBe(false);
  });

  test("blob filenames are derived deterministically from digests", () => {
    expect(blobFileName(`sha256:${"a".repeat(64)}`)).toBe(`blobs/sha256_${"a".repeat(64)}.glb`);
  });
});

suite("manifest identity", () => {
  test("key order does not change identity", async () => {
    const a = { spec: "nook.prefab/1", id: "p_x", version: "1.0.0" };
    const b = { version: "1.0.0", spec: "nook.prefab/1", id: "p_x" };
    expect(await manifestDigest(a)).toBe(await manifestDigest(b));
  });

  test("two encodings of the same manifest hash identically", async () => {
    const compact = await buildWallLamp();
    const spaced = await buildWallLamp();
    // Different JSON byte encodings, same semantic manifest.
    expect(compact.manifestBytes).toEqual(spaced.manifestBytes);
    expect(await manifestDigest(compact.manifest)).toBe(
      await manifestDigest(JSON.parse(JSON.stringify(spaced.manifest))),
    );
  });

  test("changed semantics change identity", async () => {
    const base = await buildWallLamp();
    const renamed = await buildWallLamp({
      manifest: (manifest) => {
        (manifest.meta as Record<string, unknown>).name = "Modern Wall Lamp";
      },
    });
    expect(await manifestDigest(renamed.manifest)).not.toBe(await manifestDigest(base.manifest));
  });

  test("a changed payload reference changes identity", async () => {
    const base = await buildWallLamp();
    const repointed = await buildWallLamp({
      payloadOverrides: { proxy: { declaredDigest: `sha256:${"0".repeat(64)}` } },
    });
    expect(await manifestDigest(repointed.manifest)).not.toBe(await manifestDigest(base.manifest));
  });

  test("a changed dependency digest changes identity, giving a recursive fingerprint", async () => {
    const reference = (digest: string) => ({
      kind: "prefab",
      id: "p_bulb",
      version: "2.0.1",
      digest,
    });
    const first = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [reference(`sha256:${"1".repeat(64)}`)];
      },
    });
    const second = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [reference(`sha256:${"2".repeat(64)}`)];
      },
    });
    expect(await manifestDigest(first.manifest)).not.toBe(await manifestDigest(second.manifest));
  });

  test("a manifest carrying its own digest is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.digest = `sha256:${"0".repeat(64)}`;
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-MANIFEST-SELF-DIGEST");
  });

  test("an expected digest that disagrees with the manifest is reported", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive, {
      expectedManifestDigest: `sha256:${"f".repeat(64)}`,
    });
    expect(errorCodes(result)).toContain("NOOK-MANIFEST-DIGEST-MISMATCH");
  });
});

suite("contract-canonical arrays", () => {
  test("sorted and deduplicated arrays are canonical", () => {
    expect(isCanonicalStringArray(["a", "b", "c"])).toBe(true);
    expect(isCanonicalStringArray(["b", "a"])).toBe(false);
    expect(isCanonicalStringArray(["a", "a"])).toBe(false);
    expect(canonicalStringArray(["b", "a", "b"])).toEqual(["a", "b"]);
  });

  test("an unsorted requires list is a canonical-manifest error", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [
          "nook.path@1",
          "nook.component/collider@1",
          "nook.parameter/color@1",
          "nook.parameter/float@1",
        ];
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-MANIFEST-NONCANONICAL-ARRAY");
  });

  test("a duplicated requires entry is a canonical-manifest error", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [
          "nook.component/collider@1",
          "nook.component/collider@1",
          "nook.parameter/color@1",
          "nook.parameter/float@1",
          "nook.path@1",
        ];
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-MANIFEST-NONCANONICAL-ARRAY");
  });

  test("unsorted dependencies are a canonical-manifest error", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.dependencies = [
          { kind: "prefab", id: "p_zed", version: "1.0.0", digest: `sha256:${"1".repeat(64)}` },
          { kind: "prefab", id: "p_alpha", version: "1.0.0", digest: `sha256:${"2".repeat(64)}` },
        ];
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-MANIFEST-NONCANONICAL-ARRAY");
  });
});
