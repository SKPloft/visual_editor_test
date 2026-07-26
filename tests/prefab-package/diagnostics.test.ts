/**
 * The diagnostic catalog is an interoperability surface, so the document that
 * publishes it must not drift from the code that emits it. These tests compare
 * the two directly.
 */

import { readFileSync } from "node:fs";
import { describe as suite, expect, test } from "bun:test";

import {
  DIAGNOSTIC_CATALOG,
  DIAGNOSTIC_CODES,
  PHASES,
  compareDiagnostics,
  sortDiagnostics,
  type Diagnostic,
} from "../../src/prefab-package/index.ts";

const CATALOG_DOC = new URL("../../docs/PREFAB_PACKAGE_DIAGNOSTICS.md", import.meta.url);

/** Rows look like: | `NOOK-…` | ERROR | yes | means | remedy | */
const ROW = /^\|\s*`(NOOK-[A-Z0-9-]+)`\s*\|\s*(ERROR|WARNING|INFO)[^|]*\|\s*(yes|no)\s*\|/gm;

function documentedCodes(): Map<string, { severity: string; fatal: boolean }> {
  const markdown = readFileSync(CATALOG_DOC, "utf8");
  const documented = new Map<string, { severity: string; fatal: boolean }>();
  for (const match of markdown.matchAll(ROW)) {
    documented.set(match[1], { severity: match[2], fatal: match[3] === "yes" });
  }
  return documented;
}

suite("diagnostic catalog", () => {
  test("every emitted code is documented", () => {
    const documented = documentedCodes();
    const undocumented = DIAGNOSTIC_CODES.filter((code) => !documented.has(code));
    expect(undocumented).toEqual([]);
  });

  test("no code is documented that the inspector cannot emit", () => {
    const known = new Set<string>(DIAGNOSTIC_CODES);
    const phantom = [...documentedCodes().keys()].filter((code) => !known.has(code));
    expect(phantom).toEqual([]);
  });

  test("documented severity and fatality match the catalog", () => {
    const documented = documentedCodes();
    const drift: string[] = [];
    for (const code of DIAGNOSTIC_CODES) {
      const entry = DIAGNOSTIC_CATALOG[code];
      const doc = documented.get(code);
      if (!doc) continue;
      if (doc.severity !== entry.severity || doc.fatal !== entry.fatal) {
        drift.push(
          `${code}: doc says ${doc.severity}/${doc.fatal}, catalog says ${entry.severity}/${entry.fatal}`,
        );
      }
    }
    expect(drift).toEqual([]);
  });

  test("every code belongs to a declared phase", () => {
    for (const code of DIAGNOSTIC_CODES) {
      expect(PHASES).toContain(DIAGNOSTIC_CATALOG[code].phase);
    }
  });

  test("only envelope-class codes are fatal", () => {
    // Stopping deeper parsing is justified when the framing itself is in doubt.
    // Anything past that must accumulate so one pass reports every defect.
    const fatalPhases = new Set(
      DIAGNOSTIC_CODES.filter((code) => DIAGNOSTIC_CATALOG[code].fatal).map(
        (code) => DIAGNOSTIC_CATALOG[code].phase,
      ),
    );
    expect([...fatalPhases].sort()).toEqual(["archive", "manifest"]);
  });
});

suite("diagnostic ordering", () => {
  const make = (over: Partial<Diagnostic>): Diagnostic => ({
    code: "NOOK-BLOB-MISSING",
    severity: "ERROR",
    phase: "integrity",
    location: "manifest.json",
    detail: "",
    ...over,
  });

  test("phase dominates location and code", () => {
    const later = make({ phase: "capabilities", location: "a", code: "NOOK-CAPABILITY-UNUSED" });
    const earlier = make({ phase: "archive", location: "z", code: "NOOK-ARCHIVE-UNREADABLE" });
    expect(sortDiagnostics([later, earlier])).toEqual([earlier, later]);
  });

  test("location dominates code within a phase", () => {
    const a = make({ location: "blobs/a.glb", code: "NOOK-BLOB-SIZE-MISMATCH" });
    const b = make({ location: "blobs/b.glb", code: "NOOK-BLOB-DIGEST-MISMATCH" });
    expect(sortDiagnostics([b, a])).toEqual([a, b]);
  });

  test("code breaks ties within a location", () => {
    const a = make({ code: "NOOK-BLOB-DIGEST-MISMATCH" });
    const b = make({ code: "NOOK-BLOB-SIZE-MISMATCH" });
    expect(sortDiagnostics([b, a])).toEqual([a, b]);
  });

  test("fully tied diagnostics keep insertion order rather than relying on sort stability", () => {
    const first = make({ detail: "first" });
    const second = make({ detail: "second" });
    expect(sortDiagnostics([first, second])).toEqual([first, second]);
    expect(compareDiagnostics(first, second, 0, 1)).toBeLessThan(0);
    expect(compareDiagnostics(first, second, 1, 0)).toBeGreaterThan(0);
  });
});
