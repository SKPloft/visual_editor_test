/**
 * Writes the normative corpus to disk.
 *
 * Run with `bun run fixtures:emit`. Output is byte-deterministic, so a
 * regenerated corpus differs only when a fixture actually changed.
 *
 * The artifacts exist so implementations outside this repository — creator
 * SDKs, the marketplace, the bake backend, third-party validators — can test
 * against the same packages rather than against a prose description of them.
 * `report.json` records what a conforming validator must produce for each.
 */

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { inspectPackageArchive } from "../../../src/prefab-package/index.ts";
import { CORPUS } from "./corpus.ts";

const OUTPUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "generated");

interface EmittedEntry {
  name: string;
  description: string;
  file: string;
  policy: unknown;
  manifestDigest: string | null;
  valid: boolean;
  supportState: string;
  configurable: boolean;
  diagnostics: Array<{ code: string; severity: string; phase: string; location: string }>;
}

async function main(): Promise<void> {
  rmSync(OUTPUT_DIR, { recursive: true, force: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const entries: EmittedEntry[] = [];

  for (const entry of CORPUS) {
    const { archive, manifestBytes } = await entry.build();
    const result = await inspectPackageArchive(archive, entry.options);

    const file = `${entry.name}.nookpkg`;
    writeFileSync(join(OUTPUT_DIR, file), archive);
    // The manifest is written alongside so a reader can inspect the semantics
    // without unpacking the archive.
    writeFileSync(join(OUTPUT_DIR, `${entry.name}.manifest.json`), manifestBytes);

    entries.push({
      name: entry.name,
      description: entry.description,
      file,
      policy: entry.options?.policy ?? null,
      manifestDigest: result.manifestDigest,
      valid: result.valid,
      supportState: result.supportState,
      configurable: result.configurable,
      diagnostics: result.diagnostics.map((diagnostic) => ({
        code: diagnostic.code,
        severity: diagnostic.severity,
        phase: diagnostic.phase,
        location: diagnostic.location,
      })),
    });

    const status = result.valid ? "valid" : "invalid";
    console.log(`${entry.name.padEnd(38)} ${status.padEnd(8)} ${result.diagnostics.length} diagnostic(s)`);
  }

  writeFileSync(
    join(OUTPUT_DIR, "report.json"),
    `${JSON.stringify({ spec: "nook.prefab/1", entries }, null, 2)}\n`,
  );

  console.log(`\nWrote ${entries.length} packages and report.json to ${OUTPUT_DIR}`);
}

await main();
