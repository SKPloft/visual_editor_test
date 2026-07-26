/**
 * The normative conformance corpus.
 *
 * Each entry is a named package plus the exact diagnostic codes a conforming
 * validator must produce for it under the stated policy. An implementation
 * claiming `nook.prefab/1` conformance should reproduce every `expectedCodes`
 * list, or document the role-scoped unsupported state that prevents it.
 *
 * `emit.ts` writes these packages and an inspection report to disk so
 * consumers outside this repository can use the same artifacts.
 */

import type { DiagnosticCode } from "../../../src/prefab-package/diagnostics.ts";
import type { InspectOptions } from "../../../src/prefab-package/inspect.ts";
import { inspectPackageArchive } from "../../../src/prefab-package/index.ts";
import type { BuiltPackage } from "./build.ts";
import { node, scene, utf8 } from "./build.ts";
import {
  BULB_ID,
  BULB_VERSION,
  buildBulb,
  buildWallLamp,
  buildWallLampWithNestedBulb,
} from "./packages.ts";

export interface CorpusEntry {
  name: string;
  /** What contract rule this artifact exercises. */
  description: string;
  build(): Promise<BuiltPackage>;
  options?: InspectOptions;
  /** Exact diagnostic codes, in contract order. */
  expectedCodes: DiagnosticCode[];
  expectedValid: boolean;
  expectedSupportState: "supported" | "unsupported-spec" | "unsupported-capability";
  expectedConfigurable: boolean;
}

/** Resolves the bulb package's canonical digest once, for nested fixtures. */
async function bulbDigest(): Promise<string> {
  const bulb = await buildBulb();
  const result = await inspectPackageArchive(bulb.archive);
  if (!result.manifestDigest) throw new Error("bulb fixture did not canonicalize");
  return result.manifestDigest;
}

export const CORPUS: CorpusEntry[] = [
  {
    name: "valid-wall-lamp",
    description:
      "Reference package: both roles, a non-identity package root, a colour parameter bound " +
      "through different selectors per representation, a scalar parameter on the root transform, " +
      "and one registered component.",
    build: () => buildWallLamp(),
    expectedCodes: ["NOOK-PATH-FRAGILE-INDEX"],
    expectedValid: true,
    expectedSupportState: "supported",
    expectedConfigurable: true,
  },
  {
    name: "valid-nested-dependency",
    description: "A dynamically linked nested prefab whose exact reference is declared.",
    build: async () => buildWallLampWithNestedBulb(await bulbDigest()),
    expectedCodes: ["NOOK-PATH-FRAGILE-INDEX"],
    expectedValid: true,
    expectedSupportState: "supported",
    expectedConfigurable: true,
  },
  {
    name: "valid-degraded-proxy",
    description:
      "Valid full semantics with an unresolvable optional proxy binding: the package stays valid " +
      "and records degraded preview.",
    build: () =>
      buildWallLamp({
        manifest: (manifest) => {
          const bindings = (manifest.parameters as Record<string, unknown>[])[0]
            .bindings as Record<string, unknown>[];
          bindings[1].nodeId = "n_absent_in_proxy";
        },
      }),
    expectedCodes: ["NOOK-BINDING-PROXY-DEGRADED", "NOOK-PATH-FRAGILE-INDEX"],
    expectedValid: true,
    expectedSupportState: "supported",
    expectedConfigurable: true,
  },
  {
    name: "invalid-archive-traversal",
    description: "A ZIP entry normalizing outside the package root; a fatal envelope defect.",
    build: () => buildWallLamp({ extraEntries: { "../escaped.txt": utf8("nope") } }),
    expectedCodes: ["NOOK-ARCHIVE-PATH-TRAVERSAL"],
    expectedValid: false,
    expectedSupportState: "unsupported-spec",
    expectedConfigurable: false,
  },
  {
    name: "invalid-blob-substituted",
    description:
      "A blob keeping its digest-derived filename while carrying other bytes. Resolving by name " +
      "would accept it; resolving by content must not.",
    build: () =>
      buildWallLamp({
        payloadOverrides: { full: { substituteBytes: utf8("substituted payload") } },
      }),
    // The full payload never reaches profile inspection, so the collider it
    // would have used is not discovered and its declaration reads as unused.
    expectedCodes: [
      "NOOK-BLOB-DIGEST-MISMATCH",
      "NOOK-BLOB-SIZE-MISMATCH",
      "NOOK-PATH-FRAGILE-INDEX",
      "NOOK-CAPABILITY-UNUSED",
    ],
    expectedValid: false,
    expectedSupportState: "supported",
    expectedConfigurable: false,
  },
  {
    name: "invalid-missing-package-root",
    description: "A representation with no node marked as the logical package root.",
    build: () =>
      buildWallLamp({
        proxy: scene({ nodes: [node({ name: "Root", nodeId: "n_root" })] }),
        manifest: (manifest) => {
          manifest.parameters = [];
          manifest.requires = ["nook.component/collider@1"];
        },
      }),
    expectedCodes: ["NOOK-ROOT-MISSING"],
    expectedValid: false,
    expectedSupportState: "supported",
    expectedConfigurable: false,
  },
  {
    name: "invalid-required-binding-unresolved",
    description:
      "A required full binding naming a node the representation does not contain. The normative " +
      "diagnostic-consistency fixture.",
    build: () =>
      buildWallLamp({
        manifest: (manifest) => {
          const bindings = (manifest.parameters as Record<string, unknown>[])[0]
            .bindings as Record<string, unknown>[];
          bindings[0].nodeId = "n_absent";
        },
      }),
    expectedCodes: ["NOOK-BINDING-REQUIRED-UNRESOLVED", "NOOK-PATH-FRAGILE-INDEX"],
    expectedValid: false,
    expectedSupportState: "supported",
    expectedConfigurable: false,
  },
  {
    name: "invalid-capability-underreported",
    description: "A payload using a registered component the manifest does not declare.",
    build: () =>
      buildWallLamp({
        manifest: (manifest) => {
          manifest.requires = ["nook.parameter/color@1", "nook.parameter/float@1", "nook.path@1"];
        },
      }),
    expectedCodes: ["NOOK-PATH-FRAGILE-INDEX", "NOOK-CAPABILITY-UNDERREPORTED"],
    expectedValid: false,
    expectedSupportState: "supported",
    expectedConfigurable: false,
  },
  {
    name: "invalid-dependency-undeclared",
    description: "A nested instance whose exact reference is absent from manifest.dependencies.",
    build: async () =>
      buildWallLampWithNestedBulb(await bulbDigest(), { declareDependency: false }),
    expectedCodes: ["NOOK-PATH-FRAGILE-INDEX", "NOOK-DEPENDENCY-UNDECLARED"],
    expectedValid: false,
    expectedSupportState: "supported",
    expectedConfigurable: false,
  },
  {
    name: "invalid-dependency-digest-mismatch",
    description:
      "One kind:id@version pinned to two different digests — inside the payload and in the manifest.",
    build: async () =>
      buildWallLampWithNestedBulb(await bulbDigest(), {
        declaredDigest: `sha256:${"9".repeat(64)}`,
      }),
    expectedCodes: ["NOOK-PATH-FRAGILE-INDEX", "NOOK-DEPENDENCY-MISMATCH"],
    expectedValid: false,
    expectedSupportState: "supported",
    expectedConfigurable: false,
  },
  {
    name: "unsupported-spec-major",
    description:
      "A manifest major above the consumer's support. Metadata and integrity are still readable; " +
      "nothing semantic is interpreted.",
    build: () =>
      buildWallLamp({
        manifest: (manifest) => {
          manifest.spec = "nook.prefab/99";
        },
      }),
    expectedCodes: ["NOOK-UNSUPPORTED-SPEC"],
    expectedValid: false,
    expectedSupportState: "unsupported-spec",
    expectedConfigurable: false,
  },
  {
    name: "unsupported-capability-inspect-only",
    description:
      "An unrecognized required capability read under inspect-only degradation: data preserved and " +
      "exposed, configuration and republication prohibited.",
    build: () =>
      buildWallLamp({
        manifest: (manifest) => {
          manifest.requires = [
            ...(manifest.requires as string[]),
            "nook.component/portal@1",
          ].sort();
        },
      }),
    options: { policy: { role: "inspect-only" } },
    expectedCodes: [
      "NOOK-PATH-FRAGILE-INDEX",
      // Declared but never used, because nothing in the package exercises it.
      "NOOK-CAPABILITY-UNUSED",
      "NOOK-UNSUPPORTED-CAPABILITY",
    ],
    expectedValid: false,
    expectedSupportState: "unsupported-capability",
    expectedConfigurable: false,
  },
];

export { BULB_ID, BULB_VERSION };
