/**
 * `nook.prefab/1` manifest parsing and structural validation.
 *
 * Parsing is deliberately lenient and reporting is deliberately exhaustive: a
 * malformed field produces a diagnostic and a best-effort value rather than an
 * exception, so a package with several independent defects reports all of them
 * in one pass. Only a non-object root or an unsupported major stops the phase.
 *
 * The verbatim source object is retained on `raw`. Every unrecognized field is
 * additionally surfaced in an `unknown` bag at its own level, so a consumer can
 * see what it did not understand without re-walking the source.
 */

import type { DiagnosticCollector } from "./diagnostics.ts";
import { canonicalStringArray, isCanonicalStringArray, isValidDigest } from "./canonical.ts";
import {
  REQUIRED_PAYLOAD_ROLES,
  SPEC_NAME,
} from "./registry.ts";
import type {
  InspectionPolicy,
  JsonObject,
  JsonValue,
  ManifestMeta,
  MigrationHints,
  PackageReference,
  ParameterBinding,
  ParameterDeclaration,
  PayloadDescriptor,
  PrefabManifest,
  UnknownFields,
} from "./types.ts";

/** Package and parameter identifiers: printable, bounded, and filesystem-safe. */
const IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

/** Official SemVer 2.0.0 pattern. */
const SEMVER_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

/** Characters that make a version string a range rather than an exact version. */
const RANGE_PATTERN = /[\^~*><=|\s]|(?:^|\.)x(?:\.|$)/i;

const SPEC_PATTERN = /^([A-Za-z0-9._]+)\/(\d+)$/;

const KNOWN_MANIFEST_FIELDS = new Set([
  "spec",
  "id",
  "version",
  "meta",
  "requires",
  "parameters",
  "dependencies",
  "payloads",
  "migrationHints",
]);

const KNOWN_META_FIELDS = new Set(["name", "author", "category", "tags"]);
const KNOWN_REFERENCE_FIELDS = new Set(["kind", "id", "version", "digest"]);
const KNOWN_PAYLOAD_FIELDS = new Set(["digest", "size", "mediaType"]);
const KNOWN_PARAMETER_FIELDS = new Set([
  "paramId",
  "displayName",
  "description",
  "type",
  "constraints",
  "default",
  "bindings",
]);
const KNOWN_BINDING_FIELDS = new Set(["representation", "nodeId", "propertyPath", "required"]);
const KNOWN_MIGRATION_FIELDS = new Set(["parameterReplacements"]);

// ---------------------------------------------------------------------------
// Small typed accessors
// ---------------------------------------------------------------------------

export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectUnknown(source: JsonObject, known: ReadonlySet<string>): UnknownFields {
  const unknown: Record<string, JsonValue> = {};
  for (const [key, value] of Object.entries(source)) {
    if (!known.has(key) && value !== undefined) unknown[key] = value;
  }
  return Object.freeze(unknown);
}

export function isValidIdentifier(value: unknown): value is string {
  return typeof value === "string" && IDENTIFIER_PATTERN.test(value);
}

export function isExactSemver(value: unknown): value is string {
  return typeof value === "string" && SEMVER_PATTERN.test(value);
}

export function looksLikeVersionRange(value: unknown): boolean {
  return typeof value === "string" && RANGE_PATTERN.test(value);
}

// ---------------------------------------------------------------------------
// Reference envelope
// ---------------------------------------------------------------------------

/**
 * Validates the unified `{kind, id, version, digest}` envelope.
 *
 * Returns a best-effort reference even when fields are wrong, so dependency
 * comparison can still report *which* reference was malformed rather than
 * silently dropping it from the closure.
 */
export function parseReference(
  value: JsonValue | undefined,
  location: string,
  diagnostics: DiagnosticCollector,
): PackageReference | null {
  if (!isJsonObject(value)) {
    diagnostics.add(
      "NOOK-REFERENCE-INVALID",
      location,
      "A package reference must be an object with kind, id, version, and digest.",
    );
    return null;
  }

  const kind = typeof value.kind === "string" ? value.kind : "";
  const id = typeof value.id === "string" ? value.id : "";
  const version = typeof value.version === "string" ? value.version : "";
  const digest = typeof value.digest === "string" ? value.digest : "";

  if (!isValidIdentifier(kind)) {
    diagnostics.add(
      "NOOK-REFERENCE-INVALID",
      `${location}.kind`,
      `Reference kind ${JSON.stringify(value.kind)} is not a legal identifier.`,
    );
  }
  if (!isValidIdentifier(id)) {
    diagnostics.add(
      "NOOK-REFERENCE-INVALID",
      `${location}.id`,
      `Reference id ${JSON.stringify(value.id)} is not a legal identifier.`,
    );
  }
  if (!isExactSemver(version)) {
    if (looksLikeVersionRange(version)) {
      diagnostics.add(
        "NOOK-REFERENCE-VERSION-RANGE",
        `${location}.version`,
        `Published references must pin an exact version; ${JSON.stringify(version)} is a range. ` +
          "The SDK resolves ranges to exact versions and digests at publish time.",
      );
    } else {
      diagnostics.add(
        "NOOK-REFERENCE-INVALID",
        `${location}.version`,
        `Reference version ${JSON.stringify(value.version)} is not a semantic version.`,
      );
    }
  }
  if (!isValidDigest(digest)) {
    diagnostics.add(
      "NOOK-REFERENCE-INVALID",
      `${location}.digest`,
      `Reference digest ${JSON.stringify(value.digest)} is not sha256:<64 lowercase hex>.`,
    );
  }

  return {
    kind,
    id,
    version,
    digest,
    unknown: collectUnknown(value, KNOWN_REFERENCE_FIELDS),
  };
}

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

export interface ManifestParse {
  manifest: PrefabManifest | null;
  /** False when the declared major exceeds the consumer's support. */
  specSupported: boolean;
}

/** Parses manifest bytes. Reports and stops on anything that is not a JSON object. */
export function parseManifestBytes(
  bytes: Uint8Array,
  location: string,
  policy: InspectionPolicy,
  diagnostics: DiagnosticCollector,
): ManifestParse {
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    diagnostics.add("NOOK-MANIFEST-UNPARSABLE", location, "Manifest bytes are not valid UTF-8.");
    return { manifest: null, specSupported: false };
  }

  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (error) {
    diagnostics.add(
      "NOOK-MANIFEST-UNPARSABLE",
      location,
      `Manifest is not valid JSON: ${(error as Error).message}`,
    );
    return { manifest: null, specSupported: false };
  }

  if (!isJsonObject(value)) {
    diagnostics.add("NOOK-MANIFEST-NOT-OBJECT", location, "Manifest root must be a JSON object.");
    return { manifest: null, specSupported: false };
  }

  return parseManifest(value, location, policy, diagnostics);
}

export function parseManifest(
  raw: JsonObject,
  location: string,
  policy: InspectionPolicy,
  diagnostics: DiagnosticCollector,
): ManifestParse {
  const spec = typeof raw.spec === "string" ? raw.spec : "";
  const match = SPEC_PATTERN.exec(spec);
  let specName = "";
  let specMajor = Number.NaN;

  if (!match) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-TYPE",
      `${location}#/spec`,
      `spec must be "<name>/<major>"; found ${JSON.stringify(raw.spec)}.`,
    );
  } else {
    specName = match[1];
    specMajor = Number.parseInt(match[2], 10);
    if (specName !== SPEC_NAME) {
      diagnostics.add(
        "NOOK-UNSUPPORTED-SPEC",
        `${location}#/spec`,
        `Unknown manifest specification ${JSON.stringify(specName)}; expected ${SPEC_NAME}.`,
      );
    } else if (specMajor > policy.supportedSpecMajor) {
      diagnostics.add(
        "NOOK-UNSUPPORTED-SPEC",
        `${location}#/spec`,
        `Manifest major ${specMajor} exceeds the highest supported ${SPEC_NAME} major ` +
          `${policy.supportedSpecMajor}. Semantic consumption is rejected; metadata may still be read.`,
      );
    }
  }

  const specSupported = specName === SPEC_NAME && specMajor <= policy.supportedSpecMajor;

  // The manifest must never carry its own digest — the digest is derived from
  // the manifest, so embedding it would make identity self-referential.
  if (raw.digest !== undefined) {
    diagnostics.add(
      "NOOK-MANIFEST-SELF-DIGEST",
      `${location}#/digest`,
      "A manifest must not contain its own digest; version identity is sha256(JCS(manifest)).",
    );
  }

  const id = requireString(raw, "id", location, diagnostics);
  if (id !== "" && !isValidIdentifier(id)) {
    diagnostics.add(
      "NOOK-MANIFEST-INVALID-ID",
      `${location}#/id`,
      `Prefab id ${JSON.stringify(id)} is not a legal identifier.`,
    );
  }

  const version = requireString(raw, "version", location, diagnostics);
  if (version !== "" && !isExactSemver(version)) {
    diagnostics.add(
      "NOOK-MANIFEST-INVALID-VERSION",
      `${location}#/version`,
      `Prefab version ${JSON.stringify(version)} is not a semantic version.`,
    );
  }

  const manifest: PrefabManifest = {
    spec,
    specName,
    specMajor: Number.isNaN(specMajor) ? -1 : specMajor,
    id,
    version,
    meta: parseMeta(raw.meta, location, diagnostics),
    requires: parseRequires(raw.requires, location, diagnostics),
    parameters: parseParameters(raw.parameters, location, diagnostics),
    dependencies: parseDependencies(raw.dependencies, location, diagnostics),
    payloads: parsePayloads(raw.payloads, location, diagnostics),
    migrationHints: parseMigrationHints(raw.migrationHints, location, diagnostics),
    unknown: collectUnknown(raw, KNOWN_MANIFEST_FIELDS),
    raw,
  };

  return { manifest, specSupported };
}

function requireString(
  source: JsonObject,
  field: string,
  location: string,
  diagnostics: DiagnosticCollector,
): string {
  const value = source[field];
  if (value === undefined) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-MISSING",
      `${location}#/${field}`,
      `Required manifest field ${field} is missing.`,
    );
    return "";
  }
  if (typeof value !== "string") {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-TYPE",
      `${location}#/${field}`,
      `Manifest field ${field} must be a string.`,
    );
    return "";
  }
  return value;
}

function parseMeta(
  value: JsonValue | undefined,
  location: string,
  diagnostics: DiagnosticCollector,
): ManifestMeta {
  const empty: ManifestMeta = { name: "", tags: [], unknown: Object.freeze({}) };
  if (value === undefined) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-MISSING",
      `${location}#/meta`,
      "Required manifest field meta is missing.",
    );
    return empty;
  }
  if (!isJsonObject(value)) {
    diagnostics.add("NOOK-MANIFEST-FIELD-TYPE", `${location}#/meta`, "meta must be an object.");
    return empty;
  }

  const name = requireString(value, "name", `${location}#/meta`, diagnostics);
  let tags: string[] = [];
  if (value.tags !== undefined) {
    if (Array.isArray(value.tags) && value.tags.every((t) => typeof t === "string")) {
      tags = value.tags as string[];
    } else {
      diagnostics.add(
        "NOOK-MANIFEST-FIELD-TYPE",
        `${location}#/meta/tags`,
        "meta.tags must be an array of strings.",
      );
    }
  }

  return {
    name,
    author: typeof value.author === "string" ? value.author : undefined,
    category: typeof value.category === "string" ? value.category : undefined,
    tags,
    unknown: collectUnknown(value, KNOWN_META_FIELDS),
  };
}

/**
 * `requires` must be sorted and deduplicated because ordering feeds canonical
 * identity: two packages that declare the same capabilities in different orders
 * would otherwise hash differently and be treated as different versions.
 */
function parseRequires(
  value: JsonValue | undefined,
  location: string,
  diagnostics: DiagnosticCollector,
): readonly string[] {
  if (value === undefined) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-MISSING",
      `${location}#/requires`,
      "Required manifest field requires is missing; declare an empty array when nothing is used.",
    );
    return [];
  }
  if (!Array.isArray(value) || !value.every((entry) => typeof entry === "string")) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-TYPE",
      `${location}#/requires`,
      "requires must be an array of capability identifier strings.",
    );
    return [];
  }

  const values = value as string[];
  if (!isCanonicalStringArray(values)) {
    diagnostics.add(
      "NOOK-MANIFEST-NONCANONICAL-ARRAY",
      `${location}#/requires`,
      "requires must be sorted ascending and free of duplicates; ordering participates in " +
        `canonical identity. Expected ${JSON.stringify(canonicalStringArray(values))}.`,
    );
  }
  return values;
}

function parseDependencies(
  value: JsonValue | undefined,
  location: string,
  diagnostics: DiagnosticCollector,
): readonly PackageReference[] {
  if (value === undefined) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-MISSING",
      `${location}#/dependencies`,
      "Required manifest field dependencies is missing; declare an empty array when there are none.",
    );
    return [];
  }
  if (!Array.isArray(value)) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-TYPE",
      `${location}#/dependencies`,
      "dependencies must be an array of package references.",
    );
    return [];
  }

  const references: PackageReference[] = [];
  const keys: string[] = [];
  value.forEach((entry, index) => {
    const reference = parseReference(entry, `${location}#/dependencies/${index}`, diagnostics);
    if (reference) {
      references.push(reference);
      keys.push(`${reference.kind}:${reference.id}@${reference.version}`);
    }
  });

  if (!isCanonicalStringArray(keys)) {
    diagnostics.add(
      "NOOK-MANIFEST-NONCANONICAL-ARRAY",
      `${location}#/dependencies`,
      "dependencies must be sorted by kind:id@version and free of duplicate tuples; ordering " +
        "participates in canonical identity.",
    );
  }

  return references;
}

function parsePayloads(
  value: JsonValue | undefined,
  location: string,
  diagnostics: DiagnosticCollector,
): Readonly<Record<string, PayloadDescriptor>> {
  if (value === undefined) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-MISSING",
      `${location}#/payloads`,
      "Required manifest field payloads is missing.",
    );
    return {};
  }
  if (!isJsonObject(value)) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-TYPE",
      `${location}#/payloads`,
      "payloads must be an object keyed by role.",
    );
    return {};
  }

  const payloads: Record<string, PayloadDescriptor> = {};
  for (const role of Object.keys(value).sort()) {
    const descriptor = value[role];
    const at = `${location}#/payloads/${role}`;
    const known = (REQUIRED_PAYLOAD_ROLES as readonly string[]).includes(role);

    if (!isJsonObject(descriptor)) {
      diagnostics.add(
        "NOOK-PAYLOAD-DESCRIPTOR-INVALID",
        at,
        `Payload descriptor for role ${role} must be an object.`,
        { representation: role },
      );
      continue;
    }

    const digest = typeof descriptor.digest === "string" ? descriptor.digest : "";
    const size = typeof descriptor.size === "number" ? descriptor.size : Number.NaN;
    const mediaType = typeof descriptor.mediaType === "string" ? descriptor.mediaType : "";

    if (!isValidDigest(digest)) {
      diagnostics.add(
        "NOOK-PAYLOAD-DESCRIPTOR-INVALID",
        `${at}/digest`,
        `Payload digest ${JSON.stringify(descriptor.digest)} is not sha256:<64 lowercase hex>.`,
        { representation: role },
      );
    }
    if (!Number.isInteger(size) || size < 0) {
      diagnostics.add(
        "NOOK-PAYLOAD-DESCRIPTOR-INVALID",
        `${at}/size`,
        `Payload size must be a non-negative integer; found ${JSON.stringify(descriptor.size)}.`,
        { representation: role, blobDigest: digest || undefined },
      );
    }
    if (mediaType === "") {
      diagnostics.add(
        "NOOK-PAYLOAD-DESCRIPTOR-INVALID",
        `${at}/mediaType`,
        "Payload descriptor must declare a media type.",
        { representation: role, blobDigest: digest || undefined },
      );
    }
    if (!known) {
      diagnostics.add(
        "NOOK-PAYLOAD-UNKNOWN-ROLE",
        at,
        `Payload role ${role} is not defined by this contract version. It is preserved and ignored.`,
        { representation: role, blobDigest: digest || undefined },
      );
    }

    payloads[role] = {
      role,
      digest,
      size: Number.isNaN(size) ? -1 : size,
      mediaType,
      known,
      unknown: collectUnknown(descriptor, KNOWN_PAYLOAD_FIELDS),
    };
  }

  for (const role of REQUIRED_PAYLOAD_ROLES) {
    if (!(role in payloads)) {
      diagnostics.add(
        "NOOK-PAYLOAD-ROLE-MISSING",
        `${location}#/payloads/${role}`,
        `Payload role ${role} is required by ${SPEC_NAME}/1.`,
        { representation: role },
      );
    }
  }

  return payloads;
}

function parseParameters(
  value: JsonValue | undefined,
  location: string,
  diagnostics: DiagnosticCollector,
): readonly ParameterDeclaration[] {
  if (value === undefined) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-MISSING",
      `${location}#/parameters`,
      "Required manifest field parameters is missing; declare an empty array when there are none.",
    );
    return [];
  }
  if (!Array.isArray(value)) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-TYPE",
      `${location}#/parameters`,
      "parameters must be an array of parameter declarations.",
    );
    return [];
  }

  const declarations: ParameterDeclaration[] = [];
  const seen = new Set<string>();

  value.forEach((entry, index) => {
    const at = `${location}#/parameters/${index}`;
    if (!isJsonObject(entry)) {
      diagnostics.add(
        "NOOK-MANIFEST-FIELD-TYPE",
        at,
        "A parameter declaration must be an object.",
      );
      return;
    }

    const paramId = typeof entry.paramId === "string" ? entry.paramId : "";
    if (!isValidIdentifier(paramId)) {
      diagnostics.add(
        "NOOK-MANIFEST-FIELD-TYPE",
        `${at}/paramId`,
        `paramId ${JSON.stringify(entry.paramId)} must be a non-empty legal identifier; it is the ` +
          "migration anchor and must stay stable across versions.",
      );
    } else if (seen.has(paramId)) {
      diagnostics.add(
        "NOOK-MANIFEST-DUPLICATE-PARAM",
        `${at}/paramId`,
        `paramId ${JSON.stringify(paramId)} is declared more than once; parameter identities must ` +
          "be unique within a manifest.",
        { paramId },
      );
    } else {
      seen.add(paramId);
    }

    const type = typeof entry.type === "string" ? entry.type : "";
    if (type === "") {
      diagnostics.add(
        "NOOK-MANIFEST-FIELD-TYPE",
        `${at}/type`,
        "A parameter declaration must declare a type.",
        { paramId: paramId || undefined },
      );
    }

    declarations.push({
      paramId,
      displayName: typeof entry.displayName === "string" ? entry.displayName : undefined,
      description: typeof entry.description === "string" ? entry.description : undefined,
      type,
      constraints: isJsonObject(entry.constraints) ? entry.constraints : {},
      default: entry.default ?? null,
      bindings: parseBindings(entry.bindings, at, paramId, diagnostics),
      unknown: collectUnknown(entry, KNOWN_PARAMETER_FIELDS),
    });

    if (entry.constraints !== undefined && !isJsonObject(entry.constraints)) {
      diagnostics.add(
        "NOOK-PARAM-CONSTRAINT-INVALID",
        `${at}/constraints`,
        "constraints must be an object when present.",
        { paramId: paramId || undefined },
      );
    }
    if (entry.default === undefined) {
      diagnostics.add(
        "NOOK-PARAM-DEFAULT-INVALID",
        `${at}/default`,
        "Every parameter must declare a default value valid for its type and constraints.",
        { paramId: paramId || undefined },
      );
    }
  });

  return declarations;
}

function parseBindings(
  value: JsonValue | undefined,
  location: string,
  paramId: string,
  diagnostics: DiagnosticCollector,
): readonly ParameterBinding[] {
  if (value === undefined || !Array.isArray(value) || value.length === 0) {
    diagnostics.add(
      "NOOK-MANIFEST-FIELD-TYPE",
      `${location}/bindings`,
      "A parameter must declare at least one representation-scoped binding.",
      { paramId: paramId || undefined },
    );
    return [];
  }

  const bindings: ParameterBinding[] = [];
  value.forEach((entry, index) => {
    const at = `${location}/bindings/${index}`;
    if (!isJsonObject(entry)) {
      diagnostics.add("NOOK-MANIFEST-FIELD-TYPE", at, "A binding must be an object.", {
        paramId: paramId || undefined,
      });
      return;
    }

    const representation = typeof entry.representation === "string" ? entry.representation : "";
    const nodeId = typeof entry.nodeId === "string" ? entry.nodeId : "";
    const propertyPath = typeof entry.propertyPath === "string" ? entry.propertyPath : "";

    for (const [field, actual] of [
      ["representation", representation],
      ["nodeId", nodeId],
      ["propertyPath", propertyPath],
    ] as const) {
      if (actual === "") {
        diagnostics.add(
          "NOOK-MANIFEST-FIELD-TYPE",
          `${at}/${field}`,
          `A binding must declare a non-empty ${field}.`,
          { paramId: paramId || undefined, representation: representation || undefined },
        );
      }
    }
    if (entry.required !== undefined && typeof entry.required !== "boolean") {
      diagnostics.add(
        "NOOK-MANIFEST-FIELD-TYPE",
        `${at}/required`,
        "binding.required must be a boolean when present.",
        { paramId: paramId || undefined, representation: representation || undefined },
      );
    }

    bindings.push({
      representation,
      nodeId,
      propertyPath,
      required: entry.required === true,
      unknown: collectUnknown(entry, KNOWN_BINDING_FIELDS),
    });
  });

  return bindings;
}

function parseMigrationHints(
  value: JsonValue | undefined,
  location: string,
  diagnostics: DiagnosticCollector,
): MigrationHints | undefined {
  if (value === undefined) return undefined;
  if (!isJsonObject(value)) {
    diagnostics.add(
      "NOOK-MIGRATION-HINT-INVALID",
      `${location}#/migrationHints`,
      "migrationHints must be an object when present.",
    );
    return undefined;
  }

  const replacements: Record<string, string> = {};
  const raw = value.parameterReplacements;
  if (raw !== undefined) {
    if (!isJsonObject(raw)) {
      diagnostics.add(
        "NOOK-MIGRATION-HINT-INVALID",
        `${location}#/migrationHints/parameterReplacements`,
        "parameterReplacements must be an object mapping obsolete paramId to replacement paramId.",
      );
    } else {
      for (const [from, to] of Object.entries(raw)) {
        const at = `${location}#/migrationHints/parameterReplacements/${from}`;
        if (typeof to !== "string" || !isValidIdentifier(to)) {
          diagnostics.add(
            "NOOK-MIGRATION-HINT-INVALID",
            at,
            `Replacement target for ${JSON.stringify(from)} must be a legal paramId.`,
            { paramId: from },
          );
          continue;
        }
        replacements[from] = to;
      }
    }
  }

  return {
    parameterReplacements: Object.freeze(replacements),
    unknown: collectUnknown(value, KNOWN_MIGRATION_FIELDS),
  };
}
