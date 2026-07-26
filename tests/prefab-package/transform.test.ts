import { describe as suite, expect, test } from "bun:test";

import {
  IDENTITY_MATRIX,
  TRANSFORM_TOLERANCE,
  composeEffectiveRoot,
  composeNestedRoot,
  fromTRS,
  isIdentity,
  matricesEquivalent,
  multiply,
  multiplyAll,
} from "../../src/prefab-package/index.ts";
import type { Mat4 } from "../../src/prefab-package/types.ts";

/** Applies a column-major matrix to a point, the way a consumer would. */
function apply(matrix: Mat4, point: readonly [number, number, number]): [number, number, number] {
  const [x, y, z] = point;
  return [
    matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12],
    matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13],
    matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14],
  ];
}

function expectClose(actual: readonly number[], expected: readonly number[]): void {
  expect(actual).toHaveLength(expected.length);
  for (let i = 0; i < expected.length; i += 1) {
    expect(Math.abs(actual[i] - expected[i])).toBeLessThanOrEqual(1e-9);
  }
}

/** A quarter turn about +Y, as an [x, y, z, w] quaternion. */
const QUARTER_TURN_Y = [0, Math.SQRT1_2, 0, Math.SQRT1_2] as const;

suite("matrix primitives", () => {
  test("identity is neutral on both sides", () => {
    const m = fromTRS([1, 2, 3], QUARTER_TURN_Y, [2, 2, 2]);
    expect(multiply(IDENTITY_MATRIX, m)).toEqual(m);
    expect(multiply(m, IDENTITY_MATRIX)).toEqual(m);
    expect(isIdentity(IDENTITY_MATRIX)).toBe(true);
  });

  test("fromTRS composes translation, rotation, and scale in glTF order", () => {
    const m = fromTRS([10, 0, 0], QUARTER_TURN_Y, [1, 1, 1]);
    // +X rotated a quarter turn about +Y lands on -Z, then translated by +10X.
    expectClose(apply(m, [1, 0, 0]), [10, 0, -1]);
  });

  test("scale is applied before rotation, matching glTF semantics", () => {
    const m = fromTRS([0, 0, 0], QUARTER_TURN_Y, [3, 1, 1]);
    expectClose(apply(m, [1, 0, 0]), [0, 0, -3]);
  });

  test("multiplication applies the right operand first", () => {
    const parent = fromTRS([0, 5, 0]);
    const child = fromTRS([2, 0, 0]);
    expectClose(apply(multiply(parent, child), [0, 0, 0]), [2, 5, 0]);
  });

  test("multiplyAll folds left to right and treats an empty chain as identity", () => {
    const a = fromTRS([1, 0, 0]);
    const b = fromTRS([0, 1, 0]);
    const c = fromTRS([0, 0, 1]);
    expect(multiplyAll([])).toEqual(IDENTITY_MATRIX);
    expect(multiplyAll([a, b, c])).toEqual(multiply(multiply(a, b), c));
  });
});

suite("effective root composition", () => {
  test("ancestors, placement, and stored root compose in the declared order", () => {
    const ancestor = fromTRS([100, 0, 0]);
    const placement = fromTRS([0, 10, 0]);
    const storedRoot = fromTRS([0, 0, 1]);

    const effective = composeEffectiveRoot([ancestor], placement, storedRoot);
    expectClose(apply(effective, [0, 0, 0]), [100, 10, 1]);
    expect(effective).toEqual(multiply(multiply(ancestor, placement), storedRoot));
  });

  test("the stored package-root transform is composed, never discarded", () => {
    const placement = fromTRS([0, 0, 0]);
    const storedRoot = fromTRS([0, 0, 0.25]);

    const withRoot = composeEffectiveRoot([], placement, storedRoot);
    const ifDiscarded = composeEffectiveRoot([], placement, IDENTITY_MATRIX);

    expectClose(apply(withRoot, [0, 0, 0]), [0, 0, 0.25]);
    expect(matricesEquivalent(withRoot, ifDiscarded)).toBe(false);
  });

  test("an identity stored root degenerates naturally", () => {
    const ancestor = fromTRS([1, 2, 3]);
    const placement = fromTRS([4, 5, 6]);
    expect(composeEffectiveRoot([ancestor], placement, IDENTITY_MATRIX)).toEqual(
      multiply(ancestor, placement),
    );
  });

  test("a rotating ancestor turns the placement offset with it", () => {
    const ancestor = fromTRS([0, 0, 0], QUARTER_TURN_Y);
    const placement = fromTRS([5, 0, 0]);
    const effective = composeEffectiveRoot([ancestor], placement, IDENTITY_MATRIX);
    expectClose(apply(effective, [0, 0, 0]), [0, 0, -5]);
  });

  test("a chain of ancestors accumulates outermost first", () => {
    const outer = fromTRS([0, 0, 0], QUARTER_TURN_Y);
    const inner = fromTRS([2, 0, 0]);
    const effective = composeEffectiveRoot([outer, inner], fromTRS([0, 1, 0]), IDENTITY_MATRIX);
    expectClose(apply(effective, [0, 0, 0]), [0, 1, -2]);
  });
});

suite("nested composition", () => {
  test("a nested instance is the top-level rule applied recursively", () => {
    const outerAncestors = [fromTRS([100, 0, 0])];
    const outerPlacement = fromTRS([0, 10, 0]);
    const outerStoredRoot = fromTRS([0, 0, 1]);
    const withinOuter = [fromTRS([0, 0, 0.5])];
    const nestedNode = fromTRS([0, -0.1, 0]);
    const nestedStoredRoot = fromTRS([0.25, 0, 0]);

    const nested = composeNestedRoot(
      outerAncestors,
      outerPlacement,
      outerStoredRoot,
      withinOuter,
      nestedNode,
      nestedStoredRoot,
    );

    // Same result as treating the outer effective root as one more ancestor.
    const outerEffective = composeEffectiveRoot(outerAncestors, outerPlacement, outerStoredRoot);
    const manual = composeEffectiveRoot(
      [outerEffective, ...withinOuter],
      nestedNode,
      nestedStoredRoot,
    );
    expect(nested).toEqual(manual);
    expectClose(apply(nested, [0, 0, 0]), [100.25, 9.9, 1.5]);
  });

  test("nesting two levels deep stays associative", () => {
    const a = fromTRS([1, 0, 0], QUARTER_TURN_Y);
    const b = fromTRS([0, 2, 0]);
    const c = fromTRS([0, 0, 3]);

    const grouped = composeEffectiveRoot([composeEffectiveRoot([a], b, IDENTITY_MATRIX)], c, IDENTITY_MATRIX);
    const flat = composeEffectiveRoot([a, b], c, IDENTITY_MATRIX);
    expect(matricesEquivalent(grouped, flat)).toBe(true);
  });
});

suite("numeric tolerance", () => {
  test("equivalence holds within the declared tolerance", () => {
    const base = fromTRS([1, 2, 3], QUARTER_TURN_Y, [1.5, 1.5, 1.5]);
    const drifted = base.map((value) => value + TRANSFORM_TOLERANCE / 2);
    expect(matricesEquivalent(base, drifted)).toBe(true);
  });

  test("equivalence fails beyond the declared tolerance", () => {
    const base = fromTRS([1, 2, 3]);
    const drifted = base.map((value, index) => (index === 12 ? value + TRANSFORM_TOLERANCE * 10 : value));
    expect(matricesEquivalent(base, drifted)).toBe(false);
  });

  test("two orderings of the same composition agree within tolerance", () => {
    // Independent implementations may associate the product differently; the
    // contract only fixes the operand order.
    const ancestors = [fromTRS([0.1, 0.2, 0.3], QUARTER_TURN_Y, [1.1, 0.9, 1.3])];
    const placement = fromTRS([-4.25, 0.75, 2.5], [0.2, 0.3, 0.1, 0.927], [0.5, 2, 1]);
    const storedRoot = fromTRS([0, 0, 0.25], [0, 0, 0.3826834, 0.9238795]);

    const leftAssociated = multiply(multiply(multiplyAll(ancestors), placement), storedRoot);
    const rightAssociated = multiply(multiplyAll(ancestors), multiply(placement, storedRoot));

    expect(matricesEquivalent(leftAssociated, rightAssociated)).toBe(true);
    expect(
      matricesEquivalent(composeEffectiveRoot(ancestors, placement, storedRoot), rightAssociated),
    ).toBe(true);
  });

  test("a malformed matrix is never equivalent", () => {
    expect(matricesEquivalent([1, 2, 3], IDENTITY_MATRIX)).toBe(false);
  });
});
