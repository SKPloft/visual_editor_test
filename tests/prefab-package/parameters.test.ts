import { describe as suite, expect, test } from "bun:test";

import {
  DEFAULT_POLICY,
  inspectPackageArchive,
  parseCapabilityId,
  parsePath,
  registeredTargets,
} from "../../src/prefab-package/index.ts";
import type { InspectionResult, JsonObject } from "../../src/prefab-package/types.ts";
import { buildTexturedPackage, buildWallLamp } from "../fixtures/prefab-package/packages.ts";
import { codes, describe, errorCodes, find } from "./helpers.ts";

const COLLIDER = "nook.component/collider@1";

/** Capabilities the reference payload uses, plus whatever the parameter adds. */
function requiresFor(...extra: string[]): string[] {
  return [...new Set([COLLIDER, "nook.path@1", ...extra])].sort();
}

/** Inspects the reference package carrying exactly one declared parameter. */
async function withParameter(
  parameter: JsonObject,
  requires: string[] = requiresFor(`nook.parameter/${parameter.type}@1`),
): Promise<InspectionResult> {
  const { archive } = await buildWallLamp({
    manifest: (manifest) => {
      manifest.parameters = [parameter];
      manifest.requires = requires;
    },
  });
  return inspectPackageArchive(archive);
}

/** A binding onto the reference payload's shade material, valid in both roles. */
function shadeColorBindings(): JsonObject[] {
  return [
    {
      representation: "full",
      nodeId: "n_shade",
      propertyPath: 'mesh.material.named("ShadeGlass").pbrMetallicRoughness.baseColorFactor',
      required: true,
    },
    {
      representation: "proxy",
      nodeId: "n_shade_proxy",
      propertyPath: 'mesh.material.named("ProxyGlass").pbrMetallicRoughness.baseColorFactor',
      required: false,
    },
  ];
}

function rootTransformBindings(component = 2): JsonObject[] {
  return [
    {
      representation: "full",
      nodeId: "nook.root",
      propertyPath: `transform.translation[${component}]`,
      required: true,
    },
    {
      representation: "proxy",
      nodeId: "nook.root",
      propertyPath: `transform.translation[${component}]`,
      required: false,
    },
  ];
}

// ---------------------------------------------------------------------------

suite("supported parameter types", () => {
  test("every v1 scalar, enum, colour, and vector type validates end to end", async () => {
    const cases: JsonObject[] = [
      { paramId: "p_int", type: "int", constraints: { min: 0, max: 10, step: 2 }, default: 4 },
      { paramId: "p_float", type: "float", constraints: { min: 0, max: 1 }, default: 0.5 },
      { paramId: "p_bool", type: "bool", constraints: {}, default: true },
      { paramId: "p_string", type: "string", constraints: { maxLength: 8 }, default: "brass" },
      {
        paramId: "p_enum",
        type: "enum",
        constraints: { options: [{ value: "warm", label: "Warm" }, { value: "cool", label: "Cool" }] },
        default: "warm",
      },
      { paramId: "p_color", type: "color", constraints: {}, default: "#FFD700" },
      { paramId: "p_vec3", type: "vec3", constraints: {}, default: [0, 0, 0] },
    ];

    for (const declaration of cases) {
      const bindings =
        declaration.type === "color"
          ? shadeColorBindings()
          : declaration.type === "vec3"
            ? [
                { representation: "full", nodeId: "nook.root", propertyPath: "transform.translation", required: true },
                { representation: "proxy", nodeId: "nook.root", propertyPath: "transform.translation", required: false },
              ]
            : declaration.type === "bool"
              ? [
                  { representation: "full", nodeId: "nook.root", propertyPath: "nook.components.collider.isTrigger", required: true },
                  { representation: "proxy", nodeId: "nook.root", propertyPath: "nook.components.collider.isTrigger", required: false },
                ]
              : declaration.type === "string" || declaration.type === "enum"
                ? [{ representation: "full", nodeId: "nook.root", propertyPath: "nook.components.collider.shape", required: false }]
                : rootTransformBindings();

      const result = await withParameter({ ...declaration, bindings });
      const defectCodes = errorCodes(result).filter(
        (code) => code.startsWith("NOOK-PARAM") || code.startsWith("NOOK-PATH"),
      );
      expect({ type: declaration.type, defectCodes }).toEqual({ type: declaration.type, defectCodes: [] });
    }
  });

  test("a vec2 parameter binds to a texture-transform target", async () => {
    const { archive } = await buildTexturedPackage(
      {
        paramId: "p_uv_offset",
        displayName: "Pattern offset",
        type: "vec2",
        constraints: { min: [0, 0], max: [1, 1] },
        default: [0.25, 0.5],
        bindings: [
          {
            representation: "full",
            nodeId: "nook.root",
            propertyPath:
              'mesh.material.named("PanelSurface").pbrMetallicRoughness.baseColorTexture.transform.offset',
            required: true,
          },
          {
            representation: "proxy",
            nodeId: "nook.root",
            propertyPath:
              'mesh.material.named("PanelSurface").pbrMetallicRoughness.baseColorTexture.transform.offset',
            required: false,
          },
        ],
      },
      ["nook.parameter/vec2@1", "nook.path@1"],
    );
    const result = await inspectPackageArchive(archive);

    expect(describe(result)).not.toContain("ERROR");
    expect(result.valid).toBe(true);
  });

  test("a texture-transform target on a material without a texture does not resolve", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.parameters = [
          {
            paramId: "p_uv_offset",
            type: "vec2",
            constraints: {},
            default: [0, 0],
            bindings: [
              {
                representation: "full",
                nodeId: "n_shade",
                propertyPath:
                  'mesh.material.named("ShadeGlass").pbrMetallicRoughness.baseColorTexture.transform.offset',
                required: true,
              },
            ],
          },
        ];
        manifest.requires = requiresFor("nook.parameter/vec2@1");
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-BINDING-REQUIRED-UNRESOLVED")?.detail).toContain(
      "no base-colour texture",
    );
  });

  test("a reserved type name is an unsupported capability, not an unknown type", async () => {
    const result = await withParameter(
      {
        paramId: "p_material",
        type: "materialRef",
        constraints: {},
        default: null,
        bindings: shadeColorBindings(),
      },
      requiresFor(),
    );

    const diagnostic = find(result, "NOOK-PARAM-TYPE-RESERVED");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.capability).toBe("nook.parameter/materialRef@1");
    expect(diagnostic?.detail).toContain("not guessed");
    expect(codes(result)).not.toContain("NOOK-PARAM-TYPE-UNSUPPORTED");
  });

  test("textureRef is reserved on the same terms", async () => {
    const result = await withParameter(
      { paramId: "p_tex", type: "textureRef", constraints: {}, default: null, bindings: shadeColorBindings() },
      requiresFor(),
    );
    expect(errorCodes(result)).toContain("NOOK-PARAM-TYPE-RESERVED");
  });

  test("curve and gradient are not registered v1 types", async () => {
    for (const type of ["curve", "gradient"]) {
      const result = await withParameter(
        { paramId: "p_x", type, constraints: {}, default: null, bindings: shadeColorBindings() },
        requiresFor(),
      );
      expect(errorCodes(result)).toContain("NOOK-PARAM-TYPE-UNSUPPORTED");
    }
  });
});

suite("defaults and constraints", () => {
  test("a default outside its numeric range is rejected", async () => {
    const result = await withParameter({
      paramId: "p_float",
      type: "float",
      constraints: { min: 0, max: 1 },
      default: 4,
      bindings: rootTransformBindings(),
    });
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("above the maximum 1");
  });

  test("a default that misses the declared step is rejected", async () => {
    const result = await withParameter({
      paramId: "p_float",
      type: "float",
      constraints: { min: 0, max: 1, step: 0.25 },
      default: 0.3,
      bindings: rootTransformBindings(),
    });
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("multiple of step");
  });

  test("a non-integer default for an int parameter is rejected", async () => {
    const result = await withParameter({
      paramId: "p_int",
      type: "int",
      constraints: {},
      default: 1.5,
      bindings: rootTransformBindings(),
    });
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("must be an integer");
  });

  test("an enum default outside the declared options is rejected", async () => {
    const result = await withParameter({
      paramId: "p_enum",
      type: "enum",
      constraints: { options: [{ value: "warm" }, { value: "cool" }] },
      default: "neon",
      bindings: [
        { representation: "full", nodeId: "nook.root", propertyPath: "nook.components.collider.shape", required: false },
      ],
    });
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("not one of the declared options");
  });

  test("a malformed colour default is rejected", async () => {
    const result = await withParameter({
      paramId: "p_color",
      type: "color",
      constraints: {},
      default: "gold",
      bindings: shadeColorBindings(),
    });
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("#RRGGBB");
  });

  test("a vector default of the wrong arity is rejected", async () => {
    const result = await withParameter({
      paramId: "p_vec3",
      type: "vec3",
      constraints: {},
      default: [1, 2],
      bindings: [
        { representation: "full", nodeId: "nook.root", propertyPath: "transform.translation", required: true },
      ],
    });
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("3 finite numbers");
  });

  test("a string default over its maxLength is rejected", async () => {
    const result = await withParameter({
      paramId: "p_string",
      type: "string",
      constraints: { maxLength: 3 },
      default: "brass",
      bindings: [
        { representation: "full", nodeId: "nook.root", propertyPath: "nook.components.collider.shape", required: false },
      ],
    });
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("over the maximum 3");
  });

  test("incoherent constraints are rejected before the default is judged", async () => {
    const result = await withParameter({
      paramId: "p_float",
      type: "float",
      constraints: { min: 10, max: 0 },
      default: 5,
      bindings: rootTransformBindings(),
    });
    expect(find(result, "NOOK-PARAM-CONSTRAINT-INVALID")?.detail).toContain("greater than max");
    // A default cannot be meaningfully checked against a contradictory domain.
    expect(codes(result)).not.toContain("NOOK-PARAM-DEFAULT-INVALID");
  });

  test("an empty enum option set is rejected", async () => {
    const result = await withParameter({
      paramId: "p_enum",
      type: "enum",
      constraints: { options: [] },
      default: "warm",
      bindings: [
        { representation: "full", nodeId: "nook.root", propertyPath: "nook.components.collider.shape", required: false },
      ],
    });
    expect(errorCodes(result)).toContain("NOOK-PARAM-CONSTRAINT-INVALID");
  });

  test("duplicate enum options are rejected", async () => {
    const result = await withParameter({
      paramId: "p_enum",
      type: "enum",
      constraints: { options: [{ value: "warm" }, { value: "warm" }] },
      default: "warm",
      bindings: [
        { representation: "full", nodeId: "nook.root", propertyPath: "nook.components.collider.shape", required: false },
      ],
    });
    expect(find(result, "NOOK-PARAM-CONSTRAINT-INVALID")?.detail).toContain("repeats value");
  });

  test("a non-positive step is rejected", async () => {
    const result = await withParameter({
      paramId: "p_float",
      type: "float",
      constraints: { step: 0 },
      default: 0,
      bindings: rootTransformBindings(),
    });
    expect(find(result, "NOOK-PARAM-CONSTRAINT-INVALID")?.detail).toContain("positive number");
  });

  test("vector bounds of the wrong arity are rejected", async () => {
    const result = await withParameter({
      paramId: "p_vec2",
      type: "vec2",
      constraints: { min: [0, 0, 0] },
      default: [0, 0],
      bindings: [
        { representation: "full", nodeId: "n_shade", propertyPath: "transform.translation", required: false },
      ],
    });
    expect(find(result, "NOOK-PARAM-CONSTRAINT-INVALID")?.detail).toContain("array of 2 numbers");
  });
});

suite("parameter identity", () => {
  test("a duplicated paramId is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const parameters = manifest.parameters as JsonObject[];
        parameters[1] = { ...(parameters[1] as JsonObject), paramId: "prm_shade_color" };
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-MANIFEST-DUPLICATE-PARAM");
    expect(diagnostic?.paramId).toBe("prm_shade_color");
  });

  test("a display-name change alone does not disturb parameter identity", async () => {
    const original = await buildWallLamp();
    const renamed = await buildWallLamp({
      manifest: (manifest) => {
        (manifest.parameters as JsonObject[])[0].displayName = "Lampshade colour";
      },
    });

    const before = await inspectPackageArchive(original.archive);
    const after = await inspectPackageArchive(renamed.archive);

    expect(after.valid).toBe(true);
    expect(after.manifest?.parameters.map((p) => p.paramId)).toEqual(
      before.manifest?.parameters.map((p) => p.paramId),
    );
    // Presentation metadata is not identity, so the version digest still moves.
    expect(after.manifestDigest).not.toBe(before.manifestDigest);
  });

  test("a parameter with no bindings is rejected", async () => {
    const result = await withParameter({
      paramId: "p_unbound",
      type: "float",
      constraints: {},
      default: 0,
      bindings: [],
    });
    expect(errorCodes(result)).toContain("NOOK-MANIFEST-FIELD-TYPE");
  });

  test("a parameter with no default is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const parameter = (manifest.parameters as JsonObject[])[0];
        delete parameter.default;
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-PARAM-DEFAULT-INVALID");
  });
});

// ---------------------------------------------------------------------------

suite("nook.path/1 syntax", () => {
  const limits = DEFAULT_POLICY.path;

  test("registered forms parse to a canonical target", () => {
    const cases: Array<[string, string]> = [
      ["transform.translation", "transform.translation"],
      ["transform.translation[1]", "transform.translation[1]"],
      ["transform.scale", "transform.scale"],
      [
        "mesh.primitives[2].material.pbrMetallicRoughness.baseColorFactor",
        "mesh.primitives[2].material.pbrMetallicRoughness.baseColorFactor",
      ],
      [
        'mesh.material.named("BulbGlass").emissiveFactor[0]',
        'mesh.material.named("BulbGlass").emissiveFactor[0]',
      ],
      ["nook.components.collider.isTrigger", "nook.components.collider.isTrigger"],
      ["nook.prefabInstance.reference", "nook.prefabInstance.reference"],
    ];
    for (const [input, canonical] of cases) {
      const parsed = parsePath(input, limits);
      expect(parsed.ok ? parsed.path.canonical : parsed.error.detail).toBe(canonical);
    }
  });

  test("value kinds come from the registry, not from the document", () => {
    const kind = (path: string) => {
      const parsed = parsePath(path, limits);
      return parsed.ok ? parsed.path.valueKind : parsed.error.code;
    };
    expect(kind("transform.translation")).toBe("vec3");
    expect(kind("transform.translation[0]")).toBe("float");
    expect(kind("transform.rotation")).toBe("quat");
    expect(kind("mesh.primitives[0].material.pbrMetallicRoughness.baseColorFactor")).toBe("color4");
    expect(kind("mesh.primitives[0].material.emissiveFactor")).toBe("color3");
    expect(kind("mesh.primitives[0].material.doubleSided")).toBe("bool");
    expect(kind("nook.components.collider.shape")).toBe("enum:collider.shape");
    expect(kind("nook.prefabInstance.reference")).toBe("prefabRef");
  });

  test("escaping inside named() follows the declared rules", () => {
    const parsed = parsePath('mesh.material.named("A\\"B\\\\C").alphaCutoff', limits);
    expect(parsed.ok && parsed.path.target).toMatchObject({
      selector: { by: "materialName", name: 'A"B\\C' },
    });
  });

  test("an undefined escape is a syntax error", () => {
    const parsed = parsePath('mesh.material.named("A\\nB").alphaCutoff', limits);
    expect(parsed.ok).toBe(false);
    expect(!parsed.ok && parsed.error.code).toBe("NOOK-PATH-SYNTAX-INVALID");
  });

  test("malformed syntax is rejected", () => {
    const malformed = [
      "",
      "transform..translation",
      "transform.translation[",
      "transform.translation[]",
      'mesh.material.named("unterminated',
      "[0].translation",
      "transform.translation.extra.segments",
    ];
    for (const path of malformed) {
      const parsed = parsePath(path, limits);
      expect({ path, ok: parsed.ok }).toEqual({ path, ok: false });
    }
  });

  test("an unregistered namespace, property, or field is rejected as unregistered", () => {
    const cases = [
      "physics.mass",
      "transform.shear",
      "mesh.primitives[0].material.customSheen",
      "nook.components.teleporter.destination",
      "nook.components.collider.friction",
      "nook.prefabInstance.params",
    ];
    for (const path of cases) {
      const parsed = parsePath(path, limits);
      expect({ path, code: parsed.ok ? "ok" : parsed.error.code }).toEqual({
        path,
        code: "NOOK-PATH-UNREGISTERED-TARGET",
      });
    }
  });

  test("a component index outside the target's arity is rejected", () => {
    for (const path of ["transform.translation[3]", "mesh.primitives[0].material.emissiveFactor[3]"]) {
      const parsed = parsePath(path, limits);
      expect(!parsed.ok && parsed.error.code).toBe("NOOK-PATH-UNREGISTERED-TARGET");
    }
  });

  test("a scalar target takes no component index", () => {
    const parsed = parsePath("mesh.primitives[0].material.alphaCutoff[0]", limits);
    expect(!parsed.ok && parsed.error.detail).toContain("scalar");
  });

  test("arbitrary JSON paths are forbidden", () => {
    for (const path of ["$.nodes[0].name", "extensions.VENDOR_x.value", "extras.nook.nodeId"]) {
      expect(parsePath(path, limits).ok).toBe(false);
    }
  });

  test("path length and segment count are bounded", () => {
    expect(parsePath("transform.translation", { maxPathLength: 4, maxSegments: 32 }).ok).toBe(false);
    expect(parsePath("transform.translation[0]", { maxPathLength: 512, maxSegments: 2 }).ok).toBe(false);
  });

  test("the whitelist is enumerable for UI generation", () => {
    const targets = registeredTargets();
    expect(targets).toContain("transform.translation");
    expect(targets).toContain("nook.components.collider.isTrigger");
    expect(targets).toContain("nook.prefabInstance.reference");
    expect(targets.every((target) => typeof target === "string" && target.length > 0)).toBe(true);
  });
});

suite("path and parameter type compatibility", () => {
  test("a boolean parameter cannot write a colour target", async () => {
    const result = await withParameter({
      paramId: "p_bool",
      type: "bool",
      constraints: {},
      default: true,
      bindings: shadeColorBindings(),
    });
    const diagnostic = find(result, "NOOK-PATH-TYPE-MISMATCH");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.detail).toContain("cannot write color4 target");
  });

  test("a vec3 parameter cannot write a scalar component", async () => {
    const result = await withParameter({
      paramId: "p_vec3",
      type: "vec3",
      constraints: {},
      default: [0, 0, 0],
      bindings: rootTransformBindings(),
    });
    expect(errorCodes(result)).toContain("NOOK-PATH-TYPE-MISMATCH");
  });

  test("an int parameter may write a float target", async () => {
    const result = await withParameter({
      paramId: "p_int",
      type: "int",
      constraints: {},
      default: 0,
      bindings: rootTransformBindings(),
    });
    expect(codes(result)).not.toContain("NOOK-PATH-TYPE-MISMATCH");
  });

  test("rotation is registered but has no compatible v1 parameter type", async () => {
    const result = await withParameter({
      paramId: "p_rot",
      type: "vec3",
      constraints: {},
      default: [0, 0, 0],
      bindings: [
        { representation: "full", nodeId: "nook.root", propertyPath: "transform.rotation", required: true },
      ],
    });
    expect(find(result, "NOOK-PATH-TYPE-MISMATCH")?.detail).toContain("quat");
  });
});

suite("binding resolution", () => {
  test("a required full binding onto a missing node is an error", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const bindings = (manifest.parameters as JsonObject[])[0].bindings as JsonObject[];
        bindings[0].nodeId = "n_does_not_exist";
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-BINDING-REQUIRED-UNRESOLVED");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.representation).toBe("full");
    expect(diagnostic?.paramId).toBe("prm_shade_color");
    expect(diagnostic?.nodeId).toBe("n_does_not_exist");
    expect(diagnostic?.location).toContain("/bindings/0/propertyPath");
    expect(result.valid).toBe(false);
  });

  test("a required full binding onto a missing material is an error", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const bindings = (manifest.parameters as JsonObject[])[0].bindings as JsonObject[];
        bindings[0].propertyPath =
          'mesh.material.named("NoSuchMaterial").pbrMetallicRoughness.baseColorFactor';
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-BINDING-REQUIRED-UNRESOLVED")?.detail).toContain("NoSuchMaterial");
  });

  test("a required binding onto a node without a mesh is an error", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const bindings = (manifest.parameters as JsonObject[])[0].bindings as JsonObject[];
        bindings[0].nodeId = "nook.root";
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-BINDING-REQUIRED-UNRESOLVED")?.detail).toContain("no mesh");
  });

  test("an optional proxy binding that cannot resolve degrades preview only", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const bindings = (manifest.parameters as JsonObject[])[0].bindings as JsonObject[];
        bindings[1].propertyPath =
          'mesh.material.named("NotInProxy").pbrMetallicRoughness.baseColorFactor';
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-BINDING-PROXY-DEGRADED");
    expect(diagnostic?.severity).toBe("WARNING");
    expect(diagnostic?.detail).toContain("full semantics are unaffected");
    expect(result.valid).toBe(true);
  });

  test("a parameter with no proxy binding reports absent preview, not a defect", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const parameter = (manifest.parameters as JsonObject[])[0];
        parameter.bindings = [(parameter.bindings as JsonObject[])[0]];
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-BINDING-PROXY-ABSENT");
    expect(diagnostic?.severity).toBe("INFO");
    expect(diagnostic?.paramId).toBe("prm_shade_color");
    expect(result.valid).toBe(true);
  });

  test("an index-based selector is reported as fragile without being invalid", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-PATH-FRAGILE-INDEX");
    expect(diagnostic?.severity).toBe("INFO");
    expect(diagnostic?.representation).toBe("proxy");
    expect(diagnostic?.detail).toContain("named selector is stable");
    expect(result.valid).toBe(true);
  });

  test("an unknown representation is preserved and ignored", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        const bindings = (manifest.parameters as JsonObject[])[0].bindings as JsonObject[];
        bindings.push({
          representation: "baked",
          nodeId: "n_shade",
          propertyPath: "mesh.primitives[0].material.pbrMetallicRoughness.baseColorFactor",
          required: true,
        });
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-BINDING-REPRESENTATION-UNKNOWN");
    expect(diagnostic?.severity).toBe("WARNING");
    expect(result.valid).toBe(true);
    expect(result.manifest?.parameters[0].bindings).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------

suite("reference-typed parameters", () => {
  const bulbReference = {
    kind: "prefab",
    id: "p_bulb",
    version: "2.0.1",
    digest: `sha256:${"a".repeat(64)}`,
  };

  test("a prefabRef default contributes an exact reference to the closure", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.parameters = [
          {
            paramId: "p_bulb_choice",
            type: "prefabRef",
            constraints: {},
            default: bulbReference,
            bindings: [
              { representation: "full", nodeId: "n_shade", propertyPath: "nook.prefabInstance.reference", required: false },
            ],
          },
        ];
        manifest.requires = requiresFor("nook.parameter/prefabRef@1");
        manifest.dependencies = [bulbReference];
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(result.discoveredReferences).toHaveLength(1);
    expect(result.discoveredReferences[0].origin).toBe("parameter-default");
    expect(result.discoveredReferences[0].paramId).toBe("p_bulb_choice");
    expect(result.dependencyReport?.undeclared).toEqual([]);
  });

  test("a prefabRef default outside the declared accepted kinds is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.parameters = [
          {
            paramId: "p_bulb_choice",
            type: "prefabRef",
            constraints: { kinds: ["material"] },
            default: bulbReference,
            bindings: [
              { representation: "full", nodeId: "n_shade", propertyPath: "nook.prefabInstance.reference", required: false },
            ],
          },
        ];
        manifest.requires = requiresFor("nook.parameter/prefabRef@1");
        manifest.dependencies = [bulbReference];
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-REFERENCE-CATEGORY-REJECTED");
  });

  test("a prefabRef default that is not an exact reference is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.parameters = [
          {
            paramId: "p_bulb_choice",
            type: "prefabRef",
            constraints: {},
            default: { ...bulbReference, version: "^2.0.0" },
            bindings: [
              { representation: "full", nodeId: "n_shade", propertyPath: "nook.prefabInstance.reference", required: false },
            ],
          },
        ];
        manifest.requires = requiresFor("nook.parameter/prefabRef@1");
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-PARAM-DEFAULT-INVALID")?.detail).toContain("references must be exact");
  });
});

suite("migration hints", () => {
  test("a valid exceptional replacement is accepted", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.migrationHints = { parameterReplacements: { prm_colour_old: "prm_shade_color" } };
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(describe(result)).not.toContain("NOOK-MIGRATION-HINT-INVALID");
    expect(result.manifest?.migrationHints?.parameterReplacements).toEqual({
      prm_colour_old: "prm_shade_color",
    });
  });

  test("a replacement target the manifest does not declare is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.migrationHints = { parameterReplacements: { prm_old: "prm_nonexistent" } };
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-MIGRATION-HINT-INVALID")?.detail).toContain("not declared");
  });

  test("replacing a parameter that still exists is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.migrationHints = {
          parameterReplacements: { prm_shade_color: "prm_extension" },
        };
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-MIGRATION-HINT-INVALID")?.detail).toContain("has not been replaced");
  });

  test("a replacement chain is ambiguous and rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.migrationHints = {
          parameterReplacements: { prm_a: "prm_b", prm_b: "prm_shade_color" },
        };
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(find(result, "NOOK-MIGRATION-HINT-INVALID")?.detail).toContain("chains are ambiguous");
  });
});

// ---------------------------------------------------------------------------

suite("capability governance", () => {
  test("capability identifiers parse into namespace, name, and version", () => {
    expect(parseCapabilityId("nook.parameter/color@1")).toMatchObject({
      namespace: "nook.parameter",
      name: "color",
      version: 1,
      experimental: false,
    });
    expect(parseCapabilityId("nook.path@2")).toMatchObject({
      namespace: "nook.path",
      version: 2,
      experimental: false,
    });
    expect(parseCapabilityId("x.vendor/thing@1")?.experimental).toBe(true);
    expect(parseCapabilityId("nook.parameter/color")).toBeNull();
    expect(parseCapabilityId("nook.parameter/color@v1")).toBeNull();
  });

  test("under-reported usage is an error naming the missing capability", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = ["nook.parameter/color@1", "nook.parameter/float@1", "nook.path@1"];
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-CAPABILITY-UNDERREPORTED");
    expect(diagnostic?.severity).toBe("ERROR");
    expect(diagnostic?.capability).toBe(COLLIDER);
    expect(result.valid).toBe(false);
  });

  test("a declared capability with no discovered usage is reported as unused", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [...(manifest.requires as string[]), "nook.parameter/vec3@1"].sort();
      },
    });
    const result = await inspectPackageArchive(archive);

    const diagnostic = find(result, "NOOK-CAPABILITY-UNUSED");
    expect(diagnostic?.severity).toBe("INFO");
    expect(diagnostic?.capability).toBe("nook.parameter/vec3@1");
    expect(result.valid).toBe(true);
  });

  test("an unrecognized required capability rejects normal consumption", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [...(manifest.requires as string[]), "nook.component/portal@1"].sort();
      },
    });
    const result = await inspectPackageArchive(archive);

    expect(find(result, "NOOK-UNSUPPORTED-CAPABILITY")?.capability).toBe("nook.component/portal@1");
    expect(result.supportState).toBe("unsupported-capability");
    expect(result.configurable).toBe(false);
    expect(result.valid).toBe(false);
  });

  test("capability versions are supported independently", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [COLLIDER, "nook.parameter/color@2", "nook.parameter/float@1", "nook.path@1"];
      },
    });
    const result = await inspectPackageArchive(archive);

    // Supporting color@1 says nothing about color@2.
    expect(find(result, "NOOK-UNSUPPORTED-CAPABILITY")?.capability).toBe("nook.parameter/color@2");
    expect(find(result, "NOOK-CAPABILITY-UNDERREPORTED")?.capability).toBe("nook.parameter/color@1");
  });

  test("inspect-only degradation exposes data without claiming configurability", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [...(manifest.requires as string[]), "nook.component/portal@1"].sort();
      },
    });
    const result = await inspectPackageArchive(archive, { policy: { role: "inspect-only" } });

    expect(result.supportState).toBe("unsupported-capability");
    expect(result.configurable).toBe(false);
    expect(find(result, "NOOK-UNSUPPORTED-CAPABILITY")?.detail).toContain(
      "cannot be configured or republished",
    );
    // The package data is still fully exposed for reading.
    expect(result.manifest?.parameters).toHaveLength(2);
    expect(result.representations.every((r) => r.parsed)).toBe(true);
  });

  test("a supported package is not configurable under a degraded role either", async () => {
    const { archive } = await buildWallLamp();
    const result = await inspectPackageArchive(archive, { policy: { role: "proxy-render-only" } });

    expect(result.supportState).toBe("supported");
    expect(result.valid).toBe(true);
    expect(result.configurable).toBe(false);
  });

  test("an experimental capability is rejected under marketplace policy only", async () => {
    const build = () =>
      buildWallLamp({
        manifest: (manifest) => {
          manifest.requires = [...(manifest.requires as string[]), "x.vendor/preview@1"].sort();
        },
      });

    const { archive } = await build();
    const marketplace = await inspectPackageArchive(archive, {
      policy: {
        marketplace: true,
        supportedCapabilities: [
          ...DEFAULT_POLICY.supportedCapabilities,
          "x.vendor/preview@1",
        ],
      },
    });
    expect(find(result_(marketplace), "NOOK-CAPABILITY-EXPERIMENTAL-REJECTED")?.capability).toBe(
      "x.vendor/preview@1",
    );

    const local = await inspectPackageArchive(archive, {
      policy: {
        marketplace: false,
        supportedCapabilities: [
          ...DEFAULT_POLICY.supportedCapabilities,
          "x.vendor/preview@1",
        ],
      },
    });
    expect(codes(local)).not.toContain("NOOK-CAPABILITY-EXPERIMENTAL-REJECTED");
  });

  test("a malformed capability identifier is rejected", async () => {
    const { archive } = await buildWallLamp({
      manifest: (manifest) => {
        manifest.requires = [COLLIDER, "definitely not a capability"].sort();
      },
    });
    const result = await inspectPackageArchive(archive);
    expect(errorCodes(result)).toContain("NOOK-CAPABILITY-MALFORMED");
  });
});

/** Identity helper so the marketplace test reads symmetrically. */
function result_(result: InspectionResult): InspectionResult {
  return result;
}
