import { describe as suite, expect, test } from "bun:test";

import { inspectPackageArchive, normalizePath } from "../../src/prefab-package/index.ts";
import { buildRawArchive, utf8 } from "../fixtures/prefab-package/build.ts";
import { buildWallLamp } from "../fixtures/prefab-package/packages.ts";
import { codes, errorCodes, find } from "./helpers.ts";

/**
 * Patches central-directory records in place.
 *
 * Encrypted and symlinked entries cannot be produced by a well-behaved writer,
 * so adversarial fixtures for them are made by setting the exact header fields
 * a hostile archiver would set.
 */
function patchCentralDirectory(
  archive: Uint8Array,
  patch: (view: DataView, offset: number, name: string) => void,
): Uint8Array {
  const bytes = archive.slice();
  const view = new DataView(bytes.buffer);
  let eocd = -1;
  for (let offset = bytes.byteLength - 22; offset >= 0; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      eocd = offset;
      break;
    }
  }
  if (eocd < 0) throw new Error("fixture archive has no central directory");

  const count = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const decoder = new TextDecoder();

  for (let i = 0; i < count; i += 1) {
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const name = decoder.decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
    patch(view, offset, name);
    offset = offset + 46 + nameLength + extraLength + commentLength;
  }
  return bytes;
}

suite("path safety", () => {
  test("normalizePath rejects escapes and accepts ordinary paths", () => {
    expect(normalizePath("blobs/a.glb")).toBe("blobs/a.glb");
    expect(normalizePath("./blobs/./a.glb")).toBe("blobs/a.glb");
    expect(normalizePath("../a.glb")).toBeNull();
    expect(normalizePath("blobs/../../a.glb")).toBeNull();
    expect(normalizePath("blobs\\a.glb")).toBeNull();
    expect(normalizePath("blobs/a\0.glb")).toBeNull();
  });

  test("a traversal entry rejects the archive without writing it", async () => {
    const { archive } = await buildWallLamp({
      extraEntries: { "../escaped.txt": utf8("nope") },
    });
    const result = await inspectPackageArchive(archive);

    expect(codes(result)).toEqual(["NOOK-ARCHIVE-PATH-TRAVERSAL"]);
    expect(result.manifest).toBeNull();
  });

  test("an absolute entry path is rejected", async () => {
    const archive = buildRawArchive({
      "manifest.json": utf8("{}"),
      "/etc/passwd": utf8("root"),
    });
    const result = await inspectPackageArchive(archive);
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-ABSOLUTE-PATH"]);
  });

  test("two entries normalizing to the same path are rejected as ambiguous", async () => {
    const archive = buildRawArchive({
      "manifest.json": utf8("{}"),
      "blobs/a.glb": utf8("one"),
      "./blobs/a.glb": utf8("two"),
    });
    const result = await inspectPackageArchive(archive);
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-DUPLICATE-PATH"]);
  });

  test("an over-long entry path is rejected", async () => {
    const { archive } = await buildWallLamp({
      extraEntries: { [`blobs/${"n".repeat(600)}.glb`]: utf8("x") },
    });
    const result = await inspectPackageArchive(archive);
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-PATH-TOO-LONG"]);
  });
});

suite("unsafe entries", () => {
  test("an encrypted entry is rejected", async () => {
    const { archive } = await buildWallLamp();
    const patched = patchCentralDirectory(archive, (view, offset, name) => {
      if (name === "manifest.json") view.setUint16(offset + 8, 0x0001, true);
    });
    const result = await inspectPackageArchive(patched);

    expect(codes(result)).toEqual(["NOOK-ARCHIVE-UNSAFE-ENTRY"]);
    expect(find(result, "NOOK-ARCHIVE-UNSAFE-ENTRY")?.detail).toContain("encrypted");
  });

  test("a symbolic-link entry is rejected", async () => {
    const { archive } = await buildWallLamp();
    const patched = patchCentralDirectory(archive, (view, offset, name) => {
      if (!name.startsWith("blobs/")) return;
      view.setUint16(offset + 4, 3 << 8, true); // version made by: Unix
      view.setUint32(offset + 38, 0xa1ff0000, true); // external attrs: S_IFLNK
    });
    const result = await inspectPackageArchive(patched);

    expect(codes(result)).toEqual(["NOOK-ARCHIVE-UNSAFE-ENTRY"]);
    expect(find(result, "NOOK-ARCHIVE-UNSAFE-ENTRY")?.detail).toContain("symbolic link");
  });

  test("an unsupported compression method is rejected before decompression", async () => {
    const { archive } = await buildWallLamp();
    const patched = patchCentralDirectory(archive, (view, offset, name) => {
      if (name === "manifest.json") view.setUint16(offset + 10, 14, true); // LZMA
    });
    const result = await inspectPackageArchive(patched);

    expect(codes(result)).toEqual(["NOOK-ARCHIVE-UNSAFE-ENTRY"]);
    expect(find(result, "NOOK-ARCHIVE-UNSAFE-ENTRY")?.detail).toContain("compression method 14");
  });
});

suite("resource limits", () => {
  test("a decompression bomb is refused from its declared size", async () => {
    const bomb = new Uint8Array(4 * 1024 * 1024); // highly compressible zeros
    const { archive } = await buildWallLamp({ extraEntries: { "blobs/bomb.bin": bomb } });

    // The ratio check would also catch this one, so it is relaxed here to prove
    // the total-expansion ceiling stops the archive on its own.
    const result = await inspectPackageArchive(archive, {
      policy: { archive: { maxTotalExpandedBytes: 1024 * 1024, maxCompressionRatio: 1e9 } },
    });
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-EXPANSION-LIMIT"]);
  });

  test("a per-entry expansion limit is enforced", async () => {
    const bomb = new Uint8Array(4 * 1024 * 1024);
    const { archive } = await buildWallLamp({ extraEntries: { "blobs/bomb.bin": bomb } });

    const result = await inspectPackageArchive(archive, {
      policy: { archive: { maxEntryExpandedBytes: 1024 } },
    });
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-ENTRY-TOO-LARGE"]);
  });

  test("an extreme compression ratio is rejected", async () => {
    const bomb = new Uint8Array(4 * 1024 * 1024);
    const { archive } = await buildWallLamp({ extraEntries: { "blobs/bomb.bin": bomb } });

    const result = await inspectPackageArchive(archive, {
      policy: { archive: { maxCompressionRatio: 10 } },
    });
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-COMPRESSION-RATIO"]);
  });

  test("an over-large archive is refused before it is opened", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive, {
      policy: { archive: { maxArchiveBytes: 16 } },
    });
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-TOO-LARGE"]);
  });

  test("an over-large manifest is refused before it is parsed", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive, {
      policy: { archive: { maxManifestBytes: 8 } },
    });
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-MANIFEST-TOO-LARGE"]);
  });
});

suite("archive structure", () => {
  test("bytes that are not a ZIP are reported as unreadable", async () => {
    const result = await inspectPackageArchive(utf8("this is not a zip file at all"));
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-UNREADABLE"]);
  });

  test("a truncated archive is reported as unreadable", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive.slice(0, archive.length - 8));
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-UNREADABLE"]);
  });

  test("a missing manifest is reported", async () => {
    const archive = buildRawArchive({ "blobs/a.glb": utf8("bytes") });
    const result = await inspectPackageArchive(archive);
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-MANIFEST-MISSING"]);
  });

  test("a manifest outside the archive root is rejected", async () => {
    const { archive } = await buildWallLamp({ manifestEntryName: "package/manifest.json" });
    const result = await inspectPackageArchive(archive);
    expect(codes(result)).toEqual(["NOOK-ARCHIVE-MANIFEST-MISPLACED"]);
  });

  test("an unexpected entry warns without invalidating the package", async () => {
    const { archive } = await buildWallLamp({ extraEntries: { "README.txt": utf8("hello") } });
    const result = await inspectPackageArchive(archive);

    const warning = find(result, "NOOK-ARCHIVE-UNEXPECTED-ENTRY");
    expect(warning?.severity).toBe("WARNING");
    expect(warning?.location).toBe("README.txt");
    expect(result.valid).toBe(true);
  });
});

suite("blob inventory", () => {
  test("a declared blob missing from the archive is reported", async () => {
    const { archive } = await buildWallLamp({ payloadOverrides: { proxy: { omitBlob: true } } });
    const result = await inspectPackageArchive(archive);

    const missing = find(result, "NOOK-BLOB-MISSING");
    expect(missing?.representation).toBe("proxy");
    expect(result.payloads.find((p) => p.role === "proxy")?.present).toBe(false);
    expect(result.valid).toBe(false);
  });

  test("a blob no descriptor declares is reported", async () => {
    const { archive } = await buildWallLamp({
      extraEntries: { "blobs/sha256_orphan.glb": utf8("orphan bytes") },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-BLOB-EXTRA");
  });

  test("the expected filename holding different bytes is a substitution, not a match", async () => {
    // The blob keeps the digest-derived name but carries other bytes: resolving
    // by filename would accept it, resolving by content must not.
    const { archive } = await buildWallLamp({
      payloadOverrides: { full: { substituteBytes: utf8("substituted payload") } },
    });
    const result = await inspectPackageArchive(archive);

    const mismatch = find(result, "NOOK-BLOB-DIGEST-MISMATCH");
    expect(mismatch?.representation).toBe("full");
    expect(mismatch?.location).toContain("blobs/sha256_");
    expect(result.representations.find((r) => r.role === "full")?.parsed).toBe(false);
  });

  test("a declared size that disagrees with the bytes is reported", async () => {
    const { archive } = await buildWallLamp({ payloadOverrides: { full: { declaredSize: 7 } } });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-BLOB-SIZE-MISMATCH");
  });
});
