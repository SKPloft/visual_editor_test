/**
 * Stable diagnostic contract for Nook prefab package inspection.
 *
 * Codes are an interoperability surface: independent validators must emit the
 * same code and severity for the same contract violation. Message wording may
 * change freely; codes and severities may not. See
 * `docs/PREFAB_PACKAGE_DIAGNOSTICS.md`.
 */

/** Validation phases, in the order the contract requires them to run. */
export const PHASES = [
  "archive",
  "manifest",
  "integrity",
  "payload",
  "parameters",
  "dependencies",
  "capabilities",
] as const;

export type ValidationPhase = (typeof PHASES)[number];

export type DiagnosticSeverity = "ERROR" | "WARNING" | "INFO";

/**
 * Every code the inspector can emit, with its phase and severity.
 *
 * Severity here is the contract default. A few checks are policy-sensitive
 * (unused dependencies, unresolved external context) and carry the severity
 * their policy resolves to; those are marked in the catalog document.
 */
export const DIAGNOSTIC_CATALOG = {
  // --- archive envelope -----------------------------------------------------
  "NOOK-ARCHIVE-UNREADABLE": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-TOO-LARGE": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-TOO-MANY-ENTRIES": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-PATH-TRAVERSAL": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-ABSOLUTE-PATH": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-PATH-TOO-LONG": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-DUPLICATE-PATH": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-UNSAFE-ENTRY": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-ENTRY-TOO-LARGE": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-EXPANSION-LIMIT": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-COMPRESSION-RATIO": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-MANIFEST-MISSING": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-MANIFEST-MISPLACED": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-MANIFEST-TOO-LARGE": { phase: "archive", severity: "ERROR", fatal: true },
  "NOOK-ARCHIVE-UNEXPECTED-ENTRY": { phase: "archive", severity: "WARNING", fatal: false },

  // --- manifest structure ---------------------------------------------------
  "NOOK-MANIFEST-UNPARSABLE": { phase: "manifest", severity: "ERROR", fatal: true },
  "NOOK-MANIFEST-NOT-OBJECT": { phase: "manifest", severity: "ERROR", fatal: true },
  "NOOK-UNSUPPORTED-SPEC": { phase: "manifest", severity: "ERROR", fatal: true },
  "NOOK-MANIFEST-FIELD-MISSING": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-MANIFEST-FIELD-TYPE": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-MANIFEST-INVALID-ID": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-MANIFEST-INVALID-VERSION": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-MANIFEST-SELF-DIGEST": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-MANIFEST-NONCANONICAL-ARRAY": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-MANIFEST-DUPLICATE-PARAM": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-REFERENCE-INVALID": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-REFERENCE-VERSION-RANGE": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-PAYLOAD-ROLE-MISSING": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-PAYLOAD-DESCRIPTOR-INVALID": { phase: "manifest", severity: "ERROR", fatal: false },
  "NOOK-PAYLOAD-UNKNOWN-ROLE": { phase: "manifest", severity: "INFO", fatal: false },
  "NOOK-MIGRATION-HINT-INVALID": { phase: "manifest", severity: "ERROR", fatal: false },

  // --- canonical identity and blob integrity --------------------------------
  "NOOK-MANIFEST-DIGEST-MISMATCH": { phase: "integrity", severity: "ERROR", fatal: false },
  "NOOK-BLOB-MISSING": { phase: "integrity", severity: "ERROR", fatal: false },
  "NOOK-BLOB-EXTRA": { phase: "integrity", severity: "ERROR", fatal: false },
  "NOOK-BLOB-SIZE-MISMATCH": { phase: "integrity", severity: "ERROR", fatal: false },
  "NOOK-BLOB-DIGEST-MISMATCH": { phase: "integrity", severity: "ERROR", fatal: false },

  // --- payload / portable profile -------------------------------------------
  "NOOK-GLB-MALFORMED": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-GLB-EXTERNAL-URI": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-GLB-LIMIT-EXCEEDED": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-GLB-UNSUPPORTED-EXTENSION": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-PROFILE-UNSUPPORTED-FEATURE": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-ROOT-MISSING": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-ROOT-DUPLICATE": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-ROOT-RESERVED-ID-MISUSE": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-ROOT-NOT-TOP-LEVEL": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-NODE-DUPLICATE-ID": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-COMPONENT-INVALID": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-COMPONENT-UNREGISTERED": { phase: "payload", severity: "ERROR", fatal: false },
  "NOOK-NESTED-INSTANCE-INVALID": { phase: "payload", severity: "ERROR", fatal: false },

  // --- parameters, paths, bindings ------------------------------------------
  "NOOK-PARAM-TYPE-UNSUPPORTED": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PARAM-TYPE-RESERVED": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PARAM-CONSTRAINT-INVALID": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PARAM-DEFAULT-INVALID": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PARAM-VALUE-INVALID": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PATH-SYNTAX-INVALID": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PATH-UNREGISTERED-TARGET": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PATH-TYPE-MISMATCH": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-PATH-FRAGILE-INDEX": { phase: "parameters", severity: "INFO", fatal: false },
  "NOOK-BINDING-REPRESENTATION-UNKNOWN": { phase: "parameters", severity: "WARNING", fatal: false },
  "NOOK-BINDING-NODE-MISSING": { phase: "parameters", severity: "WARNING", fatal: false },
  "NOOK-BINDING-TARGET-MISSING": { phase: "parameters", severity: "WARNING", fatal: false },
  "NOOK-BINDING-REQUIRED-UNRESOLVED": { phase: "parameters", severity: "ERROR", fatal: false },
  "NOOK-BINDING-PROXY-DEGRADED": { phase: "parameters", severity: "WARNING", fatal: false },
  "NOOK-BINDING-PROXY-ABSENT": { phase: "parameters", severity: "INFO", fatal: false },
  "NOOK-REFERENCE-CATEGORY-REJECTED": { phase: "parameters", severity: "ERROR", fatal: false },

  // --- dependencies ---------------------------------------------------------
  "NOOK-DEPENDENCY-UNDECLARED": { phase: "dependencies", severity: "ERROR", fatal: false },
  "NOOK-DEPENDENCY-MISMATCH": { phase: "dependencies", severity: "ERROR", fatal: false },
  "NOOK-DEPENDENCY-DUPLICATE": { phase: "dependencies", severity: "ERROR", fatal: false },
  "NOOK-DEPENDENCY-CYCLE": { phase: "dependencies", severity: "ERROR", fatal: false },
  "NOOK-DEPENDENCY-UNUSED": { phase: "dependencies", severity: "WARNING", fatal: false },
  "NOOK-DEPENDENCY-UNRESOLVED": { phase: "dependencies", severity: "INFO", fatal: false },

  // --- capabilities ---------------------------------------------------------
  "NOOK-CAPABILITY-MALFORMED": { phase: "capabilities", severity: "ERROR", fatal: false },
  "NOOK-CAPABILITY-UNDERREPORTED": { phase: "capabilities", severity: "ERROR", fatal: false },
  "NOOK-UNSUPPORTED-CAPABILITY": { phase: "capabilities", severity: "ERROR", fatal: false },
  "NOOK-CAPABILITY-EXPERIMENTAL-REJECTED": { phase: "capabilities", severity: "ERROR", fatal: false },
  "NOOK-CAPABILITY-UNUSED": { phase: "capabilities", severity: "INFO", fatal: false },
} as const satisfies Record<
  string,
  { phase: ValidationPhase; severity: DiagnosticSeverity; fatal: boolean }
>;

export type DiagnosticCode = keyof typeof DIAGNOSTIC_CATALOG;

export const DIAGNOSTIC_CODES = Object.keys(DIAGNOSTIC_CATALOG).sort() as DiagnosticCode[];

/** Contextual identities attached to a diagnostic when they apply. */
export interface DiagnosticContext {
  /** Payload role, e.g. `proxy` or `full`. */
  representation?: string;
  /** Payload blob digest, when the diagnostic concerns specific bytes. */
  blobDigest?: string;
  /** `id@version` of a package involved beyond the one being inspected. */
  packageRef?: string;
  /** `extras.nook.nodeId` of the node involved. */
  nodeId?: string;
  /** Declared parameter identity involved. */
  paramId?: string;
  /** Capability identifier involved, e.g. `nook.parameter/color@1`. */
  capability?: string;
}

export interface Diagnostic extends DiagnosticContext {
  code: DiagnosticCode;
  severity: DiagnosticSeverity;
  phase: ValidationPhase;
  /**
   * Package-relative location or semantic path, e.g. `manifest.json`,
   * `manifest.parameters[2].bindings[0].propertyPath`, or `blobs/sha256_….glb`.
   */
  location: string;
  /** Human-readable, remediation-oriented explanation. Wording is not contractual. */
  detail: string;
}

const PHASE_ORDER = new Map<ValidationPhase, number>(PHASES.map((p, i) => [p, i]));

/**
 * Deterministic diagnostic ordering: phase, then location, then code.
 *
 * Insertion index breaks remaining ties so two diagnostics that agree on all
 * three keys still order reproducibly rather than depending on sort stability.
 */
export function compareDiagnostics(
  a: Diagnostic,
  b: Diagnostic,
  aIndex = 0,
  bIndex = 0,
): number {
  const phase = (PHASE_ORDER.get(a.phase) ?? 0) - (PHASE_ORDER.get(b.phase) ?? 0);
  if (phase !== 0) return phase;
  if (a.location !== b.location) return a.location < b.location ? -1 : 1;
  if (a.code !== b.code) return a.code < b.code ? -1 : 1;
  return aIndex - bIndex;
}

export function sortDiagnostics(diagnostics: readonly Diagnostic[]): Diagnostic[] {
  return diagnostics
    .map((diagnostic, index) => ({ diagnostic, index }))
    .sort((a, b) => compareDiagnostics(a.diagnostic, b.diagnostic, a.index, b.index))
    .map((entry) => entry.diagnostic);
}

/**
 * Accumulates diagnostics across phases.
 *
 * `fatal` records that a phase established an envelope defect severe enough
 * that deeper parsing of untrusted bytes is unsafe. Callers check `isFatal()`
 * to decide whether to continue; the collector never throws on its own.
 */
export class DiagnosticCollector {
  private readonly entries: Diagnostic[] = [];
  private fatal = false;

  /**
   * Records a diagnostic. Phase and severity come from the catalog so a code
   * cannot be emitted with an inconsistent severity from two call sites.
   * `severityOverride` exists only for the policy-sensitive codes documented
   * in the catalog.
   */
  add(
    code: DiagnosticCode,
    location: string,
    detail: string,
    context: DiagnosticContext = {},
    severityOverride?: DiagnosticSeverity,
  ): Diagnostic {
    const entry = DIAGNOSTIC_CATALOG[code];
    const diagnostic: Diagnostic = {
      code,
      severity: severityOverride ?? entry.severity,
      phase: entry.phase,
      location,
      detail,
      ...context,
    };
    this.entries.push(diagnostic);
    if (entry.fatal && diagnostic.severity === "ERROR") this.fatal = true;
    return diagnostic;
  }

  isFatal(): boolean {
    return this.fatal;
  }

  hasErrors(): boolean {
    return this.entries.some((d) => d.severity === "ERROR");
  }

  /** Diagnostics in deterministic contract order. */
  drainSorted(): Diagnostic[] {
    return sortDiagnostics(this.entries);
  }

  get size(): number {
    return this.entries.length;
  }
}
