/**
 * Declared-parameter validation: types, constraints, defaults, values,
 * representation-scoped bindings, and reference envelopes.
 *
 * The asymmetry between representations is the point of this module. `full` is
 * bake input, so a required binding that cannot resolve makes the package
 * unusable. `proxy` is preview, and a manually authored proxy legitimately
 * lacks nodes and material slots that `full` has — so an unresolved optional
 * proxy binding degrades preview and says so, rather than invalidating full
 * semantics that are perfectly correct.
 */

import type { DiagnosticCollector } from "./diagnostics.ts";
import { isValidDigest } from "./canonical.ts";
import { isExactSemver, isJsonObject, isValidIdentifier, looksLikeVersionRange } from "./manifest.ts";
import { parsePath, resolveTargetOnNode, type ResolvedPath } from "./path.ts";
import {
  KNOWN_REPRESENTATIONS,
  PATH_CAPABILITY,
  isReservedParameterType,
  isSupportedParameterType,
  isTypeCompatible,
  parameterCapability,
  compatibleValueKinds,
} from "./registry.ts";
import type {
  DiscoveredReference,
  InspectionPolicy,
  JsonObject,
  JsonValue,
  PackageReference,
  ParameterDeclaration,
  PayloadRepresentation,
  PrefabManifest,
} from "./types.ts";

const COLOR_PATTERN = /^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

export interface ParameterValidation {
  /** Capabilities the declared parameters and their paths actually use. */
  usedCapabilities: readonly string[];
  /** Exact references contributed by reference-typed defaults. */
  discoveredReferences: readonly DiscoveredReference[];
}

export function validateParameters(
  manifest: PrefabManifest,
  representations: ReadonlyMap<string, PayloadRepresentation>,
  policy: InspectionPolicy,
  diagnostics: DiagnosticCollector,
): ParameterValidation {
  const usedCapabilities = new Set<string>();
  const discoveredReferences: DiscoveredReference[] = [];

  manifest.parameters.forEach((declaration, index) => {
    const at = `manifest.json#/parameters/${index}`;
    const context = { paramId: declaration.paramId || undefined };

    if (isReservedParameterType(declaration.type)) {
      // The name is registered precisely so a package cannot repurpose it, so
      // this is an unsupported-capability condition rather than an unknown type.
      diagnostics.add(
        "NOOK-PARAM-TYPE-RESERVED",
        `${at}/type`,
        `Parameter type ${declaration.type} is a reserved name with no supported capability in ` +
          "this contract version. Its semantics are not guessed.",
        { ...context, capability: parameterCapability(declaration.type) },
      );
      return;
    }

    if (!isSupportedParameterType(declaration.type)) {
      diagnostics.add(
        "NOOK-PARAM-TYPE-UNSUPPORTED",
        `${at}/type`,
        `Parameter type ${JSON.stringify(declaration.type)} is not a registered v1 parameter type.`,
        { ...context, capability: parameterCapability(declaration.type) },
      );
      return;
    }

    usedCapabilities.add(parameterCapability(declaration.type));

    const constraintsValid = validateConstraints(declaration, at, diagnostics);
    if (constraintsValid) {
      const problem = describeValueProblem(declaration.type, declaration.constraints, declaration.default);
      if (problem) {
        diagnostics.add("NOOK-PARAM-DEFAULT-INVALID", `${at}/default`, `Default value ${problem}`, context);
      }
    }

    if (declaration.type === "prefabRef") {
      const reference = readReferenceValue(declaration.default);
      if (reference) {
        discoveredReferences.push({
          reference,
          origin: "parameter-default",
          location: `${at}/default`,
          paramId: declaration.paramId,
        });
        validateReferenceRestriction(declaration, reference, `${at}/default`, diagnostics);
      }
    }

    validateBindings(declaration, at, representations, policy, usedCapabilities, diagnostics);
  });

  validateMigrationHints(manifest, diagnostics);

  if (manifest.parameters.length > 0) usedCapabilities.add(PATH_CAPABILITY);
  return { usedCapabilities: [...usedCapabilities].sort(), discoveredReferences };
}

// ---------------------------------------------------------------------------
// Constraints
// ---------------------------------------------------------------------------

function validateConstraints(
  declaration: ParameterDeclaration,
  at: string,
  diagnostics: DiagnosticCollector,
): boolean {
  const { type, constraints } = declaration;
  const context = { paramId: declaration.paramId || undefined };
  const location = `${at}/constraints`;
  let ok = true;

  const reject = (detail: string) => {
    ok = false;
    diagnostics.add("NOOK-PARAM-CONSTRAINT-INVALID", location, detail, context);
  };

  if (type === "int" || type === "float") {
    const min = constraints.min;
    const max = constraints.max;
    const step = constraints.step;
    if (min !== undefined && typeof min !== "number") reject("min must be a number.");
    if (max !== undefined && typeof max !== "number") reject("max must be a number.");
    if (typeof min === "number" && typeof max === "number" && min > max) {
      reject(`min ${min} is greater than max ${max}.`);
    }
    if (step !== undefined && (typeof step !== "number" || step <= 0)) {
      reject("step must be a positive number.");
    }
    if (type === "int") {
      for (const [name, value] of [["min", min], ["max", max], ["step", step]] as const) {
        if (typeof value === "number" && !Number.isInteger(value)) {
          reject(`${name} must be an integer for an int parameter.`);
        }
      }
    }
  }

  if (type === "string") {
    const maxLength = constraints.maxLength;
    if (maxLength !== undefined && (!Number.isInteger(maxLength) || (maxLength as number) < 0)) {
      reject("maxLength must be a non-negative integer.");
    }
  }

  if (type === "enum") {
    const options = constraints.options;
    if (!Array.isArray(options) || options.length === 0) {
      reject("enum parameters must declare a non-empty options array.");
    } else {
      const seen = new Set<string>();
      options.forEach((option, index) => {
        if (!isJsonObject(option) || option.value === undefined) {
          reject(`options[${index}] must be an object with a value.`);
          return;
        }
        const key = JSON.stringify(option.value);
        if (seen.has(key)) reject(`options[${index}] repeats value ${key}.`);
        seen.add(key);
      });
    }
  }

  if (type === "vec2" || type === "vec3") {
    const dimension = type === "vec2" ? 2 : 3;
    for (const bound of ["min", "max"] as const) {
      const value = constraints[bound];
      if (value === undefined) continue;
      if (!Array.isArray(value) || value.length !== dimension || !value.every((n) => typeof n === "number")) {
        reject(`${bound} must be an array of ${dimension} numbers for a ${type} parameter.`);
      }
    }
    const min = constraints.min;
    const max = constraints.max;
    if (Array.isArray(min) && Array.isArray(max) && min.length === max.length) {
      for (let i = 0; i < min.length; i += 1) {
        if (typeof min[i] === "number" && typeof max[i] === "number" && (min[i] as number) > (max[i] as number)) {
          reject(`min[${i}] is greater than max[${i}].`);
        }
      }
    }
  }

  if (type === "prefabRef") {
    for (const key of ["categories", "kinds"] as const) {
      const value = constraints[key];
      if (value === undefined) continue;
      if (!Array.isArray(value) || !value.every((entry) => typeof entry === "string")) {
        reject(`${key} must be an array of strings.`);
      }
    }
  }

  return ok;
}

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

/**
 * Validates one value against a declaration.
 *
 * Public because instance values must be checked against the declaration of
 * their *pinned* version — the same rule applies to a manifest default, a
 * world instance assignment, and a nested-instance parameter.
 */
export function validateParameterValue(
  declaration: ParameterDeclaration,
  value: JsonValue,
  location: string,
  diagnostics: DiagnosticCollector,
  extraContext: { representation?: string; nodeId?: string; packageRef?: string } = {},
): boolean {
  const problem = describeValueProblem(declaration.type, declaration.constraints, value);
  if (!problem) return true;
  diagnostics.add("NOOK-PARAM-VALUE-INVALID", location, `Value ${problem}`, {
    ...extraContext,
    paramId: declaration.paramId || undefined,
  });
  return false;
}

/** Returns a sentence fragment describing why a value is invalid, or null. */
export function describeValueProblem(
  type: string,
  constraints: JsonObject,
  value: JsonValue,
): string | null {
  switch (type) {
    case "bool":
      return typeof value === "boolean" ? null : `must be a boolean; found ${preview(value)}.`;

    case "int":
    case "float": {
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return `must be a finite number; found ${preview(value)}.`;
      }
      if (type === "int" && !Number.isInteger(value)) return `must be an integer; found ${value}.`;
      const min = constraints.min;
      const max = constraints.max;
      if (typeof min === "number" && value < min) return `${value} is below the minimum ${min}.`;
      if (typeof max === "number" && value > max) return `${value} is above the maximum ${max}.`;
      const step = constraints.step;
      if (typeof step === "number" && step > 0) {
        const base = typeof min === "number" ? min : 0;
        const steps = (value - base) / step;
        if (Math.abs(steps - Math.round(steps)) > 1e-9) {
          return `${value} is not a multiple of step ${step} from ${base}.`;
        }
      }
      return null;
    }

    case "string": {
      if (typeof value !== "string") return `must be a string; found ${preview(value)}.`;
      const maxLength = constraints.maxLength;
      if (Number.isInteger(maxLength) && value.length > (maxLength as number)) {
        return `is ${value.length} characters, over the maximum ${maxLength}.`;
      }
      return null;
    }

    case "enum": {
      const options = Array.isArray(constraints.options) ? constraints.options : [];
      const allowed = options
        .filter(isJsonObject)
        .map((option) => option.value)
        .filter((option) => option !== undefined) as JsonValue[];
      const match = allowed.some((option) => JSON.stringify(option) === JSON.stringify(value));
      return match
        ? null
        : `${preview(value)} is not one of the declared options ${preview(allowed as JsonValue)}.`;
    }

    case "color":
      return typeof value === "string" && COLOR_PATTERN.test(value)
        ? null
        : `must be #RRGGBB or #RRGGBBAA; found ${preview(value)}.`;

    case "vec2":
    case "vec3": {
      const dimension = type === "vec2" ? 2 : 3;
      if (
        !Array.isArray(value) ||
        value.length !== dimension ||
        !value.every((n) => typeof n === "number" && Number.isFinite(n))
      ) {
        return `must be an array of ${dimension} finite numbers; found ${preview(value)}.`;
      }
      const min = constraints.min;
      const max = constraints.max;
      for (let i = 0; i < dimension; i += 1) {
        const component = value[i] as number;
        if (Array.isArray(min) && typeof min[i] === "number" && component < (min[i] as number)) {
          return `component ${i} (${component}) is below the minimum ${min[i]}.`;
        }
        if (Array.isArray(max) && typeof max[i] === "number" && component > (max[i] as number)) {
          return `component ${i} (${component}) is above the maximum ${max[i]}.`;
        }
      }
      return null;
    }

    case "prefabRef": {
      const problem = describeReferenceProblem(value);
      if (problem) return problem;
      const kinds = constraints.kinds;
      if (Array.isArray(kinds) && kinds.length > 0) {
        const kind = (value as JsonObject).kind as string;
        if (!kinds.includes(kind)) {
          return `references kind ${JSON.stringify(kind)}, which the declaration does not accept.`;
        }
      }
      return null;
    }

    default:
      return `has unsupported parameter type ${JSON.stringify(type)}.`;
  }
}

function describeReferenceProblem(value: JsonValue): string | null {
  if (!isJsonObject(value)) return `must be a { kind, id, version, digest } envelope; found ${preview(value)}.`;
  if (!isValidIdentifier(value.kind)) return `has an invalid reference kind ${preview(value.kind ?? null)}.`;
  if (!isValidIdentifier(value.id)) return `has an invalid reference id ${preview(value.id ?? null)}.`;
  if (!isExactSemver(value.version)) {
    return looksLikeVersionRange(value.version)
      ? `pins version range ${preview(value.version ?? null)}; references must be exact.`
      : `has an invalid reference version ${preview(value.version ?? null)}.`;
  }
  if (!isValidDigest(value.digest)) return `has an invalid reference digest ${preview(value.digest ?? null)}.`;
  return null;
}

function readReferenceValue(value: JsonValue): PackageReference | null {
  if (describeReferenceProblem(value) !== null || !isJsonObject(value)) return null;
  return {
    kind: value.kind as string,
    id: value.id as string,
    version: value.version as string,
    digest: value.digest as string,
    unknown: Object.freeze({}),
  };
}

function validateReferenceRestriction(
  declaration: ParameterDeclaration,
  reference: PackageReference,
  location: string,
  diagnostics: DiagnosticCollector,
): void {
  const kinds = declaration.constraints.kinds;
  if (Array.isArray(kinds) && kinds.length > 0 && !kinds.includes(reference.kind)) {
    diagnostics.add(
      "NOOK-REFERENCE-CATEGORY-REJECTED",
      location,
      `Reference kind ${JSON.stringify(reference.kind)} is outside the declared accepted kinds ` +
        `${JSON.stringify(kinds)}.`,
      { paramId: declaration.paramId || undefined, packageRef: `${reference.id}@${reference.version}` },
    );
  }
}

/**
 * Checks a resolved reference against a declaration's accepted categories.
 *
 * Separate from value validation because it needs the *referenced* package's
 * metadata, which is only available once a dependency resolver supplies it.
 */
export function validateReferenceCategory(
  declaration: ParameterDeclaration,
  reference: PackageReference,
  resolved: PrefabManifest,
  location: string,
  diagnostics: DiagnosticCollector,
): void {
  const categories = declaration.constraints.categories;
  if (!Array.isArray(categories) || categories.length === 0) return;
  const category = resolved.meta.category ?? "";
  if (categories.includes(category)) return;
  diagnostics.add(
    "NOOK-REFERENCE-CATEGORY-REJECTED",
    location,
    `Referenced package category ${JSON.stringify(category)} is outside the declared accepted ` +
      `categories ${JSON.stringify(categories)}.`,
    { paramId: declaration.paramId || undefined, packageRef: `${reference.id}@${reference.version}` },
  );
}

// ---------------------------------------------------------------------------
// Bindings
// ---------------------------------------------------------------------------

function validateBindings(
  declaration: ParameterDeclaration,
  at: string,
  representations: ReadonlyMap<string, PayloadRepresentation>,
  policy: InspectionPolicy,
  usedCapabilities: Set<string>,
  diagnostics: DiagnosticCollector,
): void {
  const paramId = declaration.paramId || undefined;
  let hasProxyBinding = false;

  declaration.bindings.forEach((binding, index) => {
    const location = `${at}/bindings/${index}`;
    const context = {
      paramId,
      representation: binding.representation || undefined,
      nodeId: binding.nodeId || undefined,
    };

    if (binding.representation === "proxy") hasProxyBinding = true;

    if (
      binding.representation !== "" &&
      !(KNOWN_REPRESENTATIONS as readonly string[]).includes(binding.representation)
    ) {
      diagnostics.add(
        "NOOK-BINDING-REPRESENTATION-UNKNOWN",
        `${location}/representation`,
        `Representation ${JSON.stringify(binding.representation)} is not defined by this contract ` +
          "version. The binding is preserved and ignored.",
        context,
      );
      return;
    }

    const parsed = parsePath(binding.propertyPath, policy.path);
    if (!parsed.ok) {
      diagnostics.add(parsed.error.code, `${location}/propertyPath`, parsed.error.detail, context);
      return;
    }

    const path = parsed.path;
    for (const capability of path.capabilities) usedCapabilities.add(capability);

    if (path.fragile) {
      diagnostics.add(
        "NOOK-PATH-FRAGILE-INDEX",
        `${location}/propertyPath`,
        `Path ${path.canonical} selects by index. Reordering primitives or materials silently ` +
          "changes what it addresses; a named selector is stable across re-export.",
        context,
      );
    }

    if (!isTypeCompatible(declaration.type, path.valueKind)) {
      const accepted = compatibleValueKinds(declaration.type);
      diagnostics.add(
        "NOOK-PATH-TYPE-MISMATCH",
        `${location}/propertyPath`,
        `Parameter type ${declaration.type} cannot write ${path.valueKind} target ` +
          `${path.canonical}. ${declaration.type} accepts ` +
          `${accepted.length > 0 ? accepted.join(", ") : "no target registered in this version"}.`,
        context,
      );
      return;
    }

    resolveBinding(declaration, binding.representation, binding.nodeId, binding.required, path, location, representations, diagnostics, context);
  });

  if (!hasProxyBinding && declaration.bindings.length > 0) {
    diagnostics.add(
      "NOOK-BINDING-PROXY-ABSENT",
      `${at}/bindings`,
      "Parameter declares no proxy binding, so it has no preview effect. Full semantics are " +
        "unaffected.",
      { paramId, representation: "proxy" },
    );
  }
}

function resolveBinding(
  declaration: ParameterDeclaration,
  representation: string,
  nodeId: string,
  required: boolean,
  path: ResolvedPath,
  location: string,
  representations: ReadonlyMap<string, PayloadRepresentation>,
  diagnostics: DiagnosticCollector,
  context: { paramId?: string; representation?: string; nodeId?: string },
): void {
  const payload = representations.get(representation);
  // A representation that failed integrity or GLB parsing has already produced
  // its own error. Reporting every binding into it again would bury that.
  if (!payload || !payload.parsed) return;

  const node = payload.nodes.find((candidate) => candidate.nodeId === nodeId);
  if (!node) {
    report(
      `Representation ${representation} declares no node with id ${JSON.stringify(nodeId)}.`,
      "NOOK-BINDING-NODE-MISSING",
    );
    return;
  }

  const resolution = resolveTargetOnNode(path, node, payload);
  if (!resolution.ok) {
    report(
      `Target ${path.canonical} does not resolve on node ${JSON.stringify(nodeId)} of ` +
        `${representation}: ${resolution.detail}`,
      "NOOK-BINDING-TARGET-MISSING",
    );
  }

  function report(detail: string, optionalCode: "NOOK-BINDING-NODE-MISSING" | "NOOK-BINDING-TARGET-MISSING") {
    if (required) {
      diagnostics.add(
        "NOOK-BINDING-REQUIRED-UNRESOLVED",
        `${location}/propertyPath`,
        `Required binding for parameter ${JSON.stringify(declaration.paramId)} cannot resolve. ${detail}`,
        context,
      );
      return;
    }
    if (representation === "proxy") {
      diagnostics.add(
        "NOOK-BINDING-PROXY-DEGRADED",
        `${location}/propertyPath`,
        `${detail} The parameter has no preview effect; full semantics are unaffected.`,
        context,
      );
      return;
    }
    diagnostics.add(optionalCode, `${location}/propertyPath`, detail, context);
  }
}

// ---------------------------------------------------------------------------
// Migration hints
// ---------------------------------------------------------------------------

/**
 * `parameterReplacements` is an exceptional recovery channel, not a rename
 * mechanism. Chains are rejected because an upgrade would have to guess how
 * far to follow them, and the whole point of the channel is to be unambiguous.
 */
function validateMigrationHints(manifest: PrefabManifest, diagnostics: DiagnosticCollector): void {
  const hints = manifest.migrationHints;
  if (!hints) return;

  const declared = new Set(manifest.parameters.map((parameter) => parameter.paramId));
  const replacements = hints.parameterReplacements;

  for (const [from, to] of Object.entries(replacements)) {
    const location = `manifest.json#/migrationHints/parameterReplacements/${from}`;
    if (from === to) {
      diagnostics.add(
        "NOOK-MIGRATION-HINT-INVALID",
        location,
        `Parameter ${JSON.stringify(from)} is mapped to itself.`,
        { paramId: from },
      );
      continue;
    }
    // Checked before the declaration rules: a chained target would also trip
    // "not declared", and that message would send a creator looking for the
    // wrong problem.
    if (to in replacements) {
      diagnostics.add(
        "NOOK-MIGRATION-HINT-INVALID",
        location,
        `Replacement target ${JSON.stringify(to)} is itself replaced by ` +
          `${JSON.stringify(replacements[to])}. Replacement chains are ambiguous: upgrade tooling ` +
          "cannot know how far to follow them.",
        { paramId: to },
      );
      continue;
    }
    if (!declared.has(to)) {
      diagnostics.add(
        "NOOK-MIGRATION-HINT-INVALID",
        location,
        `Replacement target ${JSON.stringify(to)} is not declared by this manifest.`,
        { paramId: to },
      );
      continue;
    }
    if (declared.has(from)) {
      diagnostics.add(
        "NOOK-MIGRATION-HINT-INVALID",
        location,
        `Parameter ${JSON.stringify(from)} is still declared, so it has not been replaced.`,
        { paramId: from },
      );
    }
  }
}

function preview(value: JsonValue): string {
  const text = JSON.stringify(value) ?? String(value);
  return text.length <= 80 ? text : `${text.slice(0, 77)}...`;
}
