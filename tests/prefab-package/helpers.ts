import type { Diagnostic, DiagnosticCode } from "../../src/prefab-package/diagnostics.ts";
import type { InspectionResult } from "../../src/prefab-package/types.ts";

export function codes(result: InspectionResult): DiagnosticCode[] {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

export function errors(result: InspectionResult): Diagnostic[] {
  return result.diagnostics.filter((diagnostic) => diagnostic.severity === "ERROR");
}

export function errorCodes(result: InspectionResult): DiagnosticCode[] {
  return errors(result).map((diagnostic) => diagnostic.code);
}

export function find(result: InspectionResult, code: DiagnosticCode): Diagnostic | undefined {
  return result.diagnostics.find((diagnostic) => diagnostic.code === code);
}

export function all(result: InspectionResult, code: DiagnosticCode): Diagnostic[] {
  return result.diagnostics.filter((diagnostic) => diagnostic.code === code);
}

/** Formats diagnostics for assertion failure output. */
export function describe(result: InspectionResult): string {
  return result.diagnostics
    .map((d) => `${d.severity} ${d.code} @ ${d.location}: ${d.detail}`)
    .join("\n");
}
