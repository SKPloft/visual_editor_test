# Prefab package diagnostic codes

Companion to [`PREFAB_PACKAGE_FORMAT.md`](PREFAB_PACKAGE_FORMAT.md) §12.3.

Diagnostic codes are part of the contract. Independent conforming validators must assign the same code and the same severity to the same contract violation under the same consumer role and policy. Message wording is *not* contractual and may change without notice; a consumer that matches on message text is relying on something this contract does not promise.

The machine-readable source of truth is `DIAGNOSTIC_CATALOG` in `src/prefab-package/diagnostics.ts`. Severities and fatality below are generated from it.

## Diagnostic record

| Field | Always present | Meaning |
| --- | --- | --- |
| `code` | yes | Stable machine-readable identifier from this catalog. |
| `severity` | yes | `ERROR`, `WARNING`, or `INFO`. |
| `phase` | yes | Which validation phase produced it. |
| `location` | yes | Package-relative path (`manifest.json`, `blobs/sha256_….glb`, `README.txt`) or semantic path within one (`manifest.json#/parameters/2/bindings/0/propertyPath`, `blobs/….glb#/nodes/3/extras/nook/components/collider`). |
| `detail` | yes | Human-readable, remediation-oriented explanation. Not contractual. |
| `representation` | when applicable | Payload role, e.g. `proxy` or `full`. |
| `blobDigest` | when applicable | Declared digest of the blob concerned. |
| `packageRef` | when applicable | `kind:id@version` of another package involved. |
| `nodeId` | when applicable | `extras.nook.nodeId` of the node concerned. |
| `paramId` | when applicable | Declared parameter identity concerned. |
| `capability` | when applicable | Capability identifier concerned. |

**Fatal** means the defect prevents safe parsing of anything deeper. When a fatal diagnostic is raised, inspection stops rather than interpreting untrusted bytes whose framing is already known to be wrong. Every non-fatal diagnostic is accumulated, so one inspection reports every safely discoverable problem.

Two codes take their severity from policy rather than this catalog: `NOOK-DEPENDENCY-UNUSED` (`unusedDependencySeverity`, default `WARNING`) and `NOOK-DEPENDENCY-UNRESOLVED` (`unresolvedDependencySeverity`, default `INFO`). Both describe conditions whose seriousness legitimately differs between a publishing gate and a local inspector. A conformance claim must therefore state its policy.

Diagnostics are ordered deterministically by phase, then `location`, then `code`.

---

## Phase 1 — archive envelope

Establishes that the `.nookpkg` container can be read safely at all. Every check runs against central-directory metadata *before* the work it bounds, so a decompression bomb is refused from its declared size rather than expanded and measured. Nothing in this phase writes to a filesystem.

| Code | Severity | Fatal | Means | Remedy |
| --- | --- | --- | --- | --- |
| `NOOK-ARCHIVE-UNREADABLE` | ERROR | yes | The bytes are not a readable ZIP, or an entry listed in the central directory could not be expanded. | Re-export the package; the file is truncated or corrupt in transit. |
| `NOOK-ARCHIVE-TOO-LARGE` | ERROR | yes | Archive exceeds `archive.maxArchiveBytes`. | Reduce payload size, or raise the limit if the consumer can afford it. |
| `NOOK-ARCHIVE-TOO-MANY-ENTRIES` | ERROR | yes | Entry count exceeds `archive.maxEntries`. | A `.nookpkg` holds one manifest and that package's own blobs; remove the rest. |
| `NOOK-ARCHIVE-PATH-TRAVERSAL` | ERROR | yes | An entry path normalizes outside the package root. | Never write `..` segments; entry paths are package-relative. |
| `NOOK-ARCHIVE-ABSOLUTE-PATH` | ERROR | yes | An entry path is absolute (`/…`, `\…`, or `X:\…`). | Store package-relative paths only. |
| `NOOK-ARCHIVE-PATH-TOO-LONG` | ERROR | yes | An entry path exceeds `archive.maxPathLength`. | Shorten blob filenames; they are digest-derived and need no extra prefix. |
| `NOOK-ARCHIVE-DUPLICATE-PATH` | ERROR | yes | Two entries normalize to the same package path, so which bytes a consumer reads is ambiguous. | Emit each path once. |
| `NOOK-ARCHIVE-UNSAFE-ENTRY` | ERROR | yes | An entry is encrypted, is a symbolic link, uses a compression method other than store/deflate, or expanded to a size other than it declared. | Write plain stored or deflated entries with honest sizes and no links. |
| `NOOK-ARCHIVE-ENTRY-TOO-LARGE` | ERROR | yes | An entry's declared expansion exceeds `archive.maxEntryExpandedBytes`. The entry is not expanded. | Reduce the payload, or raise the limit. |
| `NOOK-ARCHIVE-EXPANSION-LIMIT` | ERROR | yes | Total declared expansion exceeds `archive.maxTotalExpandedBytes`. Expansion stops. | Reduce total payload size, or raise the limit. |
| `NOOK-ARCHIVE-COMPRESSION-RATIO` | ERROR | yes | An entry's declared expansion ratio exceeds `archive.maxCompressionRatio`. | Legitimate GLB payloads do not compress this far; check for a decompression bomb. |
| `NOOK-ARCHIVE-MANIFEST-MISSING` | ERROR | yes | No `manifest.json` at the archive root. | Every `.nookpkg` contains exactly one root manifest. |
| `NOOK-ARCHIVE-MANIFEST-MISPLACED` | ERROR | yes | A `manifest.json` exists but is nested inside a directory. | Do not wrap the package in a top-level folder when zipping. |
| `NOOK-ARCHIVE-MANIFEST-TOO-LARGE` | ERROR | yes | The manifest's declared expansion exceeds `archive.maxManifestBytes`. | The manifest carries semantics, not structure; move bulk data into payloads. |
| `NOOK-ARCHIVE-UNEXPECTED-ENTRY` | WARNING | no | An entry sits outside `manifest.json` and `blobs/`. It is preserved but not read. | Remove stray files, or ignore if the extra content is intentional. |

## Phase 2 — manifest structure

Parses and structurally validates the manifest. Only a non-object root, unparseable bytes, or an unsupported `spec` major stops the phase; every other defect is reported with a best-effort value so independent problems surface together.

| Code | Severity | Fatal | Means | Remedy |
| --- | --- | --- | --- | --- |
| `NOOK-MANIFEST-UNPARSABLE` | ERROR | yes | Manifest bytes are not valid UTF-8 or not valid JSON. | Re-export; the manifest was corrupted or written with a bad encoder. |
| `NOOK-MANIFEST-NOT-OBJECT` | ERROR | yes | The manifest's JSON root is not an object. | The manifest root is always a JSON object. |
| `NOOK-UNSUPPORTED-SPEC` | ERROR | yes | `spec` names an unknown specification, or a `nook.prefab` major above `supportedSpecMajor`. Sets `supportState` to `unsupported-spec`. | Upgrade the consumer. Metadata and integrity are still reported for identification. |
| `NOOK-MANIFEST-FIELD-MISSING` | ERROR | no | A required manifest field is absent. | Declare it. `requires`, `parameters`, and `dependencies` are required even when empty. |
| `NOOK-MANIFEST-FIELD-TYPE` | ERROR | no | A field has the wrong JSON type, or a parameter/binding is structurally malformed. | Match the shape in §2 and §7 of the format contract. |
| `NOOK-MANIFEST-INVALID-ID` | ERROR | no | `id` is not a legal identifier. | Use the SDK-assigned prefab id; it must be printable, bounded, and filesystem-safe. |
| `NOOK-MANIFEST-INVALID-VERSION` | ERROR | no | `version` is not a semantic version. | Publish `MAJOR.MINOR.PATCH`, optionally with prerelease/build. |
| `NOOK-MANIFEST-SELF-DIGEST` | ERROR | no | The manifest contains a `digest` field. | Version identity is derived from the manifest; embedding it would make identity self-referential. |
| `NOOK-MANIFEST-NONCANONICAL-ARRAY` | ERROR | no | `requires` or `dependencies` is unsorted or contains duplicates. | Sort and deduplicate before publishing: ordering feeds the version digest, so two identical packages would otherwise hash differently. |
| `NOOK-MANIFEST-DUPLICATE-PARAM` | ERROR | no | A `paramId` is declared more than once. | Parameter identity is the migration anchor and must be unique within a manifest. |
| `NOOK-REFERENCE-INVALID` | ERROR | no | A `{kind, id, version, digest}` envelope is missing or malformed. | Supply all four fields; `digest` is `sha256:` plus 64 lowercase hex. |
| `NOOK-REFERENCE-VERSION-RANGE` | ERROR | no | A reference pins a range (`^2.x`, `~1.0`, `*`) rather than an exact version. | The SDK resolves ranges to exact versions and digests at publish time; published packages are reproducible. |
| `NOOK-PAYLOAD-ROLE-MISSING` | ERROR | no | A payload role required by `nook.prefab/1` is absent. | Both `proxy` and `full` are required. |
| `NOOK-PAYLOAD-DESCRIPTOR-INVALID` | ERROR | no | A payload descriptor is not an object, or its `digest`, `size`, or `mediaType` is malformed. | Declare all three; `size` is a non-negative integer. |
| `NOOK-PAYLOAD-UNKNOWN-ROLE` | INFO | no | A payload slot this contract version does not define. Preserved and ignored, never parsed. | Nothing to fix; new slots do not change the format version. |
| `NOOK-MIGRATION-HINT-INVALID` | ERROR | no | `migrationHints` is malformed, a replacement maps a parameter to itself, the target is not declared, the source is still declared, or the replacements form a chain. | Use the exceptional channel only for genuine identity replacement, one hop, target declared and source removed. |

## Phase 3 — canonical identity and blob integrity

Verifies the manifest digest against a caller-supplied expectation, and every blob's raw bytes against its descriptor. Blob identity is content, never filename: a file named after the expected digest but holding other bytes is a substitution.

| Code | Severity | Fatal | Means | Remedy |
| --- | --- | --- | --- | --- |
| `NOOK-MANIFEST-DIGEST-MISMATCH` | ERROR | no | The manifest canonicalizes to a different digest than the caller expected. | The content does not match the identity it is being resolved under; re-fetch, or correct the pinned reference. |
| `NOOK-BLOB-MISSING` | ERROR | no | A declared payload's bytes are not available. | Bundle every blob the manifest declares, or supply it from the CAS. |
| `NOOK-BLOB-EXTRA` | ERROR | no | A blob exists that no payload descriptor declares. | A `.nookpkg` carries exactly one manifest and that package's own payloads, not a dependency closure. |
| `NOOK-BLOB-SIZE-MISMATCH` | ERROR | no | Blob byte length differs from the declared `size`. | Regenerate the descriptor from the actual bytes. |
| `NOOK-BLOB-DIGEST-MISMATCH` | ERROR | no | Blob bytes hash to something other than the declared digest. The bytes are not parsed as a trusted payload. | The payload was substituted or corrupted; re-fetch from a trusted source. |

## Phase 4 — GLB parse and Portable Prefab Profile

Bounds and parses each verified payload, then checks it against Portable Prefab Profile v1. Out-of-profile content is always reported rather than ignored, so a creator learns what did not survive export.

| Code | Severity | Fatal | Means | Remedy |
| --- | --- | --- | --- | --- |
| `NOOK-GLB-MALFORMED` | ERROR | no | The payload is not a readable GLB, its JSON chunk is not an object, or it declares no glTF asset version. | Re-export the payload with a conforming glTF writer. |
| `NOOK-GLB-EXTERNAL-URI` | ERROR | no | The payload depends on a buffer or image it does not embed. | v1 payloads are self-contained; embed every buffer and image. `data:` URIs count as embedded. |
| `NOOK-GLB-LIMIT-EXCEEDED` | ERROR | no | The payload exceeds a `payload.*` limit on bytes, JSON bytes, nodes, primitives, materials, textures, images, or hierarchy depth. No runtime graph is built for it. | Simplify the payload, or raise the limit if the consumer can afford it. |
| `NOOK-GLB-UNSUPPORTED-EXTENSION` | ERROR | no | `extensionsRequired` names an extension outside the profile whitelist. | The representation cannot be consumed as declared; remove the dependency or wait for a capability that covers it. |
| `NOOK-PROFILE-UNSUPPORTED-FEATURE` | ERROR | no | The payload carries content Profile v1 does not define — an extension used but not required, or animations, skins, or cameras. | Remove it, or accept that it is reported rather than silently dropped at export. |
| `NOOK-ROOT-MISSING` | ERROR | no | No node is marked `extras.nook.packageRoot = true`. | Every representation exposes exactly one addressable logical root. |
| `NOOK-ROOT-DUPLICATE` | ERROR | no | More than one node is marked as the package root. | Mark exactly one. |
| `NOOK-ROOT-RESERVED-ID-MISUSE` | ERROR | no | The logical root does not declare `nodeId = "nook.root"`, or a non-root node claims that reserved identity. | Reserve `nook.root` for the logical package root alone. |
| `NOOK-ROOT-NOT-TOP-LEVEL` | ERROR | no | The package root is parented to another node, or has top-level siblings. | An export with multiple source roots must wrap them in one synthesized identity root carrying the package-root markers. |
| `NOOK-NODE-DUPLICATE-ID` | ERROR | no | Two nodes declare the same `extras.nook.nodeId`. | Bindings address nodes by this id, so it must be unique within a representation. |
| `NOOK-COMPONENT-INVALID` | ERROR | no | `extras.nook.components` is not an object, a component is not an object, a required field is missing, a field value is outside its domain, or a field is not defined by the capability. | Match the registered component schema exactly. |
| `NOOK-COMPONENT-UNREGISTERED` | ERROR | no | A component name is not in the Nook component registry. | Unregistered semantic components cannot be validated or mapped by any consumer; register the capability first. |
| `NOOK-NESTED-INSTANCE-INVALID` | ERROR | no | `extras.nook.prefabInstance` is not an object, references a kind other than `prefab`, or its `params` is not an object. | Encode nested instances as an exact prefab reference plus a parameter map. |

## Phase 5 — parameters, paths, and bindings

Validates declarations, constraints, defaults, the `nook.path/1` targets bindings address, and whether those targets resolve in each representation.

| Code | Severity | Fatal | Means | Remedy |
| --- | --- | --- | --- | --- |
| `NOOK-PARAM-TYPE-UNSUPPORTED` | ERROR | no | The declared type is not a registered v1 parameter type. | Use a v1 type. `curve` and `gradient` are not registered. |
| `NOOK-PARAM-TYPE-RESERVED` | ERROR | no | The declared type is `materialRef` or `textureRef` — names registered precisely so a package cannot repurpose them, with no supported capability yet. | Wait for the capability; semantics are never guessed. |
| `NOOK-PARAM-CONSTRAINT-INVALID` | ERROR | no | Constraints are incoherent: `min > max`, non-positive `step`, negative `maxLength`, empty or duplicated enum options, or vector bounds of the wrong arity. | Fix the domain. A default cannot be judged against a contradictory one, so it is not checked until this is resolved. |
| `NOOK-PARAM-DEFAULT-INVALID` | ERROR | no | The default is absent, of the wrong type, or outside the declared constraints. | Every parameter declares a default valid for its own type and constraints. |
| `NOOK-PARAM-VALUE-INVALID` | ERROR | no | An instance value is invalid for its pinned declaration, or assigns a `paramId` the pinned package does not declare. | Instances may only set declared parameters, with values their declaration accepts. |
| `NOOK-PATH-SYNTAX-INVALID` | ERROR | no | The `propertyPath` is not well-formed `nook.path/1`, or exceeds `path.maxPathLength` / `path.maxSegments`. | Follow the segment grammar; inside `named("…")` only `\\` and `\"` are defined escapes. |
| `NOOK-PATH-UNREGISTERED-TARGET` | ERROR | no | The path is well-formed but addresses a namespace, property, component, field, or component index outside the v1 whitelist. | Arbitrary JSON paths are forbidden; use a registered target or register a new path capability. |
| `NOOK-PATH-TYPE-MISMATCH` | ERROR | no | The parameter type cannot write the target's value kind. | Consult the compatibility table. `transform.rotation` has no compatible v1 type until a quaternion capability exists. |
| `NOOK-PATH-FRAGILE-INDEX` | INFO | no | The path selects a primitive by index. Reordering primitives or materials silently changes what it addresses. | Prefer `named("…")`, which is stable across re-export. |
| `NOOK-BINDING-REPRESENTATION-UNKNOWN` | WARNING | no | The binding names a representation this contract version does not define. It is preserved and ignored. | Nothing to fix; the enum is extensible. |
| `NOOK-BINDING-NODE-MISSING` | WARNING | no | An optional binding in a non-proxy representation names a node that does not exist there. | Re-point the binding, or drop it. |
| `NOOK-BINDING-TARGET-MISSING` | WARNING | no | An optional binding in a non-proxy representation resolves its node but not its target. | Re-point the binding, or drop it. |
| `NOOK-BINDING-REQUIRED-UNRESOLVED` | ERROR | no | A binding declared `required: true` does not resolve, for any reason. Carries `representation`, `paramId`, `nodeId`, and the path location. | The package cannot be published or baked until the target exists; re-point the binding or restore the node/material. |
| `NOOK-BINDING-PROXY-DEGRADED` | WARNING | no | An optional `proxy` binding does not resolve, so the parameter has no preview effect. Valid `full` semantics are unaffected. | Map the parameter onto the manual proxy, or accept no live preview for it. |
| `NOOK-BINDING-PROXY-ABSENT` | INFO | no | The parameter declares no `proxy` binding at all. Same consequence, different cause. | As above. |
| `NOOK-REFERENCE-CATEGORY-REJECTED` | ERROR | no | A reference value falls outside the declaration's accepted `kinds` or `categories`. | Reference a package the declaration accepts, or widen the constraint. |

## Phase 6 — dependency coverage and graph

Compares references discovered inside the package against `manifest.dependencies`, and checks the graph using only injected local context. No implicit fetch ever occurs.

| Code | Severity | Fatal | Means | Remedy |
| --- | --- | --- | --- | --- |
| `NOOK-DEPENDENCY-UNDECLARED` | ERROR | no | A nested instance or reference-typed default names a package `manifest.dependencies` does not declare. | Nothing can resolve the reference reproducibly; declare it. |
| `NOOK-DEPENDENCY-MISMATCH` | ERROR | no | A usage and a declaration agree on `kind:id@version` but disagree on `digest`. | One tuple cannot denote two artifacts; re-resolve the dependency at publish time. |
| `NOOK-DEPENDENCY-DUPLICATE` | ERROR | no | The same tuple is declared more than once, possibly with conflicting digests. | Declare each dependency once. |
| `NOOK-DEPENDENCY-CYCLE` | ERROR | no | Locally resolvable dependencies form a cycle. The chain is reported first element repeated at the end. | A package cannot depend on itself, directly or transitively; break the cycle or flatten one side. |
| `NOOK-DEPENDENCY-UNUSED` | WARNING (policy) | no | A declared dependency that no nested instance or reference-typed default uses. | Remove it, or keep it if the declaration is deliberate. |
| `NOOK-DEPENDENCY-UNRESOLVED` | INFO (policy) | no | The injected local resolver has no manifest for a correctly declared dependency — missing *external context*, not an inconsistency in this package. | Supply the dependency manifest locally if the graph needs checking. Deliberately distinct from `NOOK-DEPENDENCY-UNDECLARED`. |

## Phase 7 — capability governance

Proves `requires ⊇ actual usage` and evaluates the declared capabilities against what this consumer supports.

| Code | Severity | Fatal | Means | Remedy |
| --- | --- | --- | --- | --- |
| `NOOK-CAPABILITY-MALFORMED` | ERROR | no | A `requires` entry is not `namespace[/name]@version`. | Emit registry-shaped identifiers, e.g. `nook.parameter/color@1`. |
| `NOOK-CAPABILITY-UNDERREPORTED` | ERROR | no | The package uses a capability it does not declare. | `requires` is mechanically generated from usage; regenerate it. A consumer trusting an incomplete list would accept a package it cannot honour and then silently do nothing. |
| `NOOK-UNSUPPORTED-CAPABILITY` | ERROR | no | A required capability this consumer does not support. Sets `supportState` to `unsupported-capability` and `configurable` to false. | Upgrade the consumer. Under `inspect-only` or `proxy-render-only` the data stays readable, but configuring and republishing remain prohibited — which is what makes reading an unsupported package safe. |
| `NOOK-CAPABILITY-EXPERIMENTAL-REJECTED` | ERROR | no | A required capability uses the reserved `x.*` prefix while `policy.marketplace` is set. | Marketplace packages must not require experimental capabilities; promote the capability first. |
| `NOOK-CAPABILITY-UNUSED` | INFO | no | A declared capability with no discovered usage. | Harmless, but usually means `requires` was hand-edited rather than generated. |
