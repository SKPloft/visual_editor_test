/**
 * The v1 capability registry: parameter types, Nook components, and the
 * writable-target whitelist with its parameter-type compatibility table.
 *
 * The contract treats the whitelist and the compatibility table as one
 * artifact, because validation and parameter-UI generation must not be able to
 * disagree about what a target accepts. Both are derived from the tables here.
 */

export const SPEC_NAME = "nook.prefab";
export const SUPPORTED_SPEC_MAJOR = 1;

/** Reserved logical-root node identity. No other node may claim it. */
export const RESERVED_ROOT_NODE_ID = "nook.root";

/** Payload roles this contract version defines. Both are required. */
export const REQUIRED_PAYLOAD_ROLES = ["full", "proxy"] as const;

/** Representations that may appear in a binding. Extensible by later capabilities. */
export const KNOWN_REPRESENTATIONS = ["full", "proxy"] as const;

export const PATH_CAPABILITY = "nook.path@1";

// ---------------------------------------------------------------------------
// Parameter types
// ---------------------------------------------------------------------------

/** Supported v1 parameter types, each governed by `nook.parameter/<type>@1`. */
export const SUPPORTED_PARAMETER_TYPES = [
  "bool",
  "color",
  "enum",
  "float",
  "int",
  "prefabRef",
  "string",
  "vec2",
  "vec3",
] as const;

export type SupportedParameterType = (typeof SUPPORTED_PARAMETER_TYPES)[number];

/**
 * Type names that are registered but deliberately unimplemented in v1. Using
 * one is an unsupported-capability condition, not an unknown-type condition:
 * the name is reserved precisely so a package cannot repurpose it.
 */
export const RESERVED_PARAMETER_TYPES = ["materialRef", "textureRef"] as const;

/** Parameter types that carry a package reference into the dependency closure. */
export const REFERENCE_PARAMETER_TYPES = ["prefabRef"] as const;

export function parameterCapability(type: string): string {
  return `nook.parameter/${type}@1`;
}

export function isSupportedParameterType(type: string): type is SupportedParameterType {
  return (SUPPORTED_PARAMETER_TYPES as readonly string[]).includes(type);
}

export function isReservedParameterType(type: string): boolean {
  return (RESERVED_PARAMETER_TYPES as readonly string[]).includes(type);
}

// ---------------------------------------------------------------------------
// Value kinds and the compatibility table
// ---------------------------------------------------------------------------

/** The value a writable target accepts, independent of parameter type names. */
export type ValueKind =
  | "bool"
  | "color3"
  | "color4"
  | "float"
  | "int"
  | "prefabRef"
  | "quat"
  | "string"
  | "vec2"
  | "vec3"
  | `enum:${string}`;

/**
 * Parameter type → value kinds it may be bound to.
 *
 * `quat` has no entry on purpose. `transform.rotation` is a registered target
 * because the contract names it, but v1 declares no four-component parameter
 * type, so binding to it is a type mismatch rather than a silent success. A
 * later `nook.parameter/quat@1` capability closes the gap without changing the
 * path language.
 */
const TYPE_COMPATIBILITY: Record<SupportedParameterType, readonly ValueKind[]> = {
  bool: ["bool"],
  color: ["color3", "color4"],
  enum: ["string"],
  float: ["float"],
  int: ["float", "int"],
  prefabRef: ["prefabRef"],
  string: ["string"],
  vec2: ["vec2"],
  vec3: ["vec3"],
};

export function isTypeCompatible(parameterType: string, valueKind: ValueKind): boolean {
  if (!isSupportedParameterType(parameterType)) return false;
  if (valueKind.startsWith("enum:")) {
    // A registered enum target accepts an enum parameter, or a string parameter
    // whose value the target validates itself.
    return parameterType === "enum" || parameterType === "string";
  }
  return TYPE_COMPATIBILITY[parameterType].includes(valueKind);
}

/** Value kinds a parameter type may bind to, for UI generation and diagnostics. */
export function compatibleValueKinds(parameterType: string): readonly ValueKind[] {
  return isSupportedParameterType(parameterType) ? TYPE_COMPATIBILITY[parameterType] : [];
}

// ---------------------------------------------------------------------------
// Nook semantic components
// ---------------------------------------------------------------------------

export interface ComponentFieldSchema {
  kind: ValueKind;
  required: boolean;
}

export interface ComponentSchema {
  name: string;
  capability: string;
  fields: Readonly<Record<string, ComponentFieldSchema>>;
}

/** Registered `extras.nook.components` entries for v1. */
export const COMPONENT_REGISTRY: Readonly<Record<string, ComponentSchema>> = {
  collider: {
    name: "collider",
    capability: "nook.component/collider@1",
    fields: {
      enabled: { kind: "bool", required: false },
      shape: { kind: "enum:collider.shape", required: true },
      isTrigger: { kind: "bool", required: false },
    },
  },
  pickable: {
    name: "pickable",
    capability: "nook.component/pickable@1",
    fields: {
      enabled: { kind: "bool", required: false },
    },
  },
  avatarPlaceholder: {
    name: "avatarPlaceholder",
    capability: "nook.component/avatarPlaceholder@1",
    fields: {
      enabled: { kind: "bool", required: false },
      avatarType: { kind: "enum:avatarPlaceholder.avatarType", required: true },
    },
  },
};

/** Allowed values for registered enum-valued component fields. */
export const ENUM_DOMAINS: Readonly<Record<string, readonly string[]>> = {
  "collider.shape": ["box", "capsule", "mesh", "sphere"],
  "avatarPlaceholder.avatarType": ["npc", "player"],
};

// ---------------------------------------------------------------------------
// glTF extension whitelist
// ---------------------------------------------------------------------------

/**
 * Official glTF extensions permitted by Portable Prefab Profile v1.
 *
 * Anything else that appears in `extensionsRequired` is an unsupported
 * required extension. Anything else in `extensionsUsed` alone is out-of-profile
 * content that must be reported rather than silently ignored.
 */
export const PROFILE_EXTENSIONS = [
  "KHR_lights_punctual",
  "KHR_materials_emissive_strength",
  "KHR_materials_ior",
  "KHR_materials_specular",
  "KHR_materials_unlit",
  "KHR_texture_transform",
] as const;

export function isProfileExtension(name: string): boolean {
  return (PROFILE_EXTENSIONS as readonly string[]).includes(name);
}

/**
 * glTF top-level properties that describe behavior Portable Prefab Profile v1
 * does not carry. Present-and-non-empty is an out-of-profile condition.
 */
export const OUT_OF_PROFILE_GLTF_PROPERTIES = ["animations", "skins", "cameras"] as const;

// ---------------------------------------------------------------------------
// Capability identifiers
// ---------------------------------------------------------------------------

/** Every capability a consumer supporting the full v1 contract implements. */
export function defaultSupportedCapabilities(): string[] {
  const capabilities = new Set<string>([PATH_CAPABILITY]);
  for (const type of SUPPORTED_PARAMETER_TYPES) capabilities.add(parameterCapability(type));
  for (const schema of Object.values(COMPONENT_REGISTRY)) capabilities.add(schema.capability);
  return [...capabilities].sort();
}
