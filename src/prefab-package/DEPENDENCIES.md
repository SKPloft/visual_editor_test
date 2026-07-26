# Prefab package inspection — dependency selection

Recorded by OpenSpec change `prefab-contract-foundation` (design decision 9). These libraries sit on untrusted binary and serialization surfaces, so the choice is a security decision, not a convenience one.

Selection criteria, from the change design:

1. browser **and** Bun compatible (the inspector must run unchanged in the editor and in CI);
2. actively maintained;
3. exposes size/resource controls **before** work is done, so limits can be enforced rather than observed after the fact;
4. executes no embedded code;
5. preserves and exposes `extras` and extensions verbatim, so round-trip preservation is possible;
6. wrappable behind package-owned interfaces so library types never become contract types.

Every selection is used only through a wrapper in this directory. No library type appears in `types.ts`.

## JSON canonicalization (RFC 8785 JCS)

**Selected: `canonicalize@3.0.0`.** Zero dependencies, ~16 KB unpacked, Apache-2.0, maintained by an RFC 8785 co-author, pure ECMAScript with no platform bindings. Number serialization follows `JSON.stringify`, which is what RFC 8785 specifies.

Wrapped by `canonical.ts`. Array sorting is *not* a JCS concern — RFC 8785 preserves array order — so the contract-canonical array rules (§3 of the format contract) are enforced separately in `manifest.ts` before hashing.

Rejected:

- **Hand-written canonicalizer.** Number serialization and string escaping are the two places JCS implementations diverge, and a divergence silently changes every package identity. Not worth owning.
- **`json-canonicalize`.** Equivalent functionality, less directly tied to the RFC authorship, no advantage.
- **`rfc8785`.** Newer and smaller adoption; no capability `canonicalize` lacks.

## ZIP reading

**Selected: `fflate@0.8.3`.** MIT, zero dependencies, browser + Bun + Node, and — decisively — `unzipSync(data, { filter })` calls the filter with each central-directory entry's `name`, compressed `size`, and `originalSize` **before** that entry is decompressed. Returning `false` skips decompression entirely.

That is what makes criterion 3 satisfiable: `archive.ts` enumerates every entry with a filter that always returns `false`, applies the full archive policy (entry count, path safety, per-entry and total expanded bytes, compression ratio, manifest size) against declared metadata, and only then decompresses the specific entries that survived. A decompression bomb is rejected from its central-directory record, never expanded.

`fflate` also decompresses purely in memory and never touches the filesystem, so "no extraction of untrusted paths" is structural rather than a convention we have to maintain.

Rejected:

- **`jszip@3.10.1`** — already a repository dependency, used by `src/export`. Rejected here anyway: its per-entry sizes live on the private `_data` internal, so bounding decompression means reaching into undocumented internals or decompressing first and measuring after. That inverts criterion 3. It also carries four transitive dependencies including `readable-stream`. It remains correct for *writing* the export ZIP, which is trusted, first-party content; it is the wrong tool for reading untrusted input.
- **Node `zlib` / `stream` + a hand-written central-directory parser.** Not browser-compatible, and a hand-written ZIP parser is exactly the custom binary parser the validation spec forbids.
- **`unzipit` / `zip.js`.** Capable, but heavier and oriented toward streaming remote fetches, which the inspector must not do.

## GLB / glTF parsing

**Selected: `@gltf-transform/core@4.4.2`.** MIT, one transitive dependency, maintained by the glTF-Transform author, first-class browser and Node/Bun support.

`archive.ts`-supplied bytes reach `glb.ts`, which calls `WebIO.binaryToJSON(bytes)`. That returns the parsed glTF JSON chunk plus binary resources with **nothing dropped** — `extras`, `extensionsUsed`, and `extensionsRequired` all survive verbatim, which the profile checks and round-trip preservation both need.

Deliberately *not* used: `io.readBinary()` / the `Document` object model. It resolves unknown extensions away and imposes library types on data we must inspect and preserve as-is. `binaryToJSON` gives the container parsing we want a maintained library for, and leaves semantic interpretation to `profile.ts`, where the contract lives.

Rejected:

- **`three`'s `GLTFLoader`** — already a repository dependency. Rejected: it is a renderer loader. It builds GPU-oriented scene objects, requires DOM/WebGL context pieces, discards data it cannot render, and is not a validation surface.
- **Hand-written GLB chunk parser.** The 12-byte header and chunk framing are easy; the reason to reject this is that "easy so far" is how binary parsers acquire bugs, and the validation spec explicitly requires a maintained parser.
- **`@gltf-transform/validator` / `gltf-validator`.** The official validator is a Dart-to-JS build, large, and asserts glTF conformance rather than Nook Portable Prefab Profile conformance. Worth revisiting as an *additional* upstream check once the contract is stable; it does not replace profile validation.

## Not added

No hashing dependency. `canonical.ts` uses `crypto.subtle.digest("SHA-256", …)`, available in browsers, Bun, and Node ≥ 20.

No filesystem, network, or process dependency of any kind. Inspection is pure: bytes in, result out.
