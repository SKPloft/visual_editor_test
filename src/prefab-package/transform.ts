/**
 * Contract-space transform composition.
 *
 * The contract fixes one ordered rule:
 *
 *     effectiveRoot = worldAncestors × instancePlacement × storedPackageRoot
 *
 * These are the operations a conforming consumer needs to evaluate it, in
 * glTF's column-major convention. Handedness and coordinate-system conversion
 * are deliberately absent: that boundary is applied consistently *outside* this
 * semantic order, so two consumers targeting different engines still agree here.
 */

import type { Mat4 } from "./types.ts";

/**
 * Numeric tolerance for contract-space matrix equivalence.
 *
 * Composition is a handful of multiply-adds over creator-authored values, so
 * conforming implementations differ only in float rounding. The tolerance is
 * absolute because package-space coordinates are bounded by prefab dimensions,
 * not by world extents.
 */
export const TRANSFORM_TOLERANCE = 1e-6;

export const IDENTITY_MATRIX: Mat4 = Object.freeze([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
]);

/** `a × b`: applies `b` first, then `a`. Both column-major. */
export function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Array<number>(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let sum = 0;
      for (let k = 0; k < 4; k += 1) {
        sum += a[k * 4 + row] * b[column * 4 + k];
      }
      out[column * 4 + row] = sum;
    }
  }
  return out;
}

/** Left-to-right product. An empty chain is the identity. */
export function multiplyAll(matrices: readonly Mat4[]): Mat4 {
  return matrices.reduce<Mat4>((acc, m) => multiply(acc, m), IDENTITY_MATRIX);
}

/** Builds a matrix from glTF TRS, with rotation as an `[x, y, z, w]` quaternion. */
export function fromTRS(
  translation: readonly number[] = [0, 0, 0],
  rotation: readonly number[] = [0, 0, 0, 1],
  scale: readonly number[] = [1, 1, 1],
): Mat4 {
  const [x, y, z, w] = rotation;
  const [sx, sy, sz] = scale;

  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;

  return [
    (1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
    (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0,
    (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0,
    translation[0], translation[1], translation[2], 1,
  ];
}

/**
 * The contract's effective-root rule.
 *
 * `ancestors` is ordered outermost first, matching how a consumer walks a world
 * hierarchy downward. `storedPackageRoot` is the package root's own transform,
 * which is composed rather than replaced — discarding it is the data loss the
 * contract exists to prevent.
 */
export function composeEffectiveRoot(
  ancestors: readonly Mat4[],
  instancePlacement: Mat4,
  storedPackageRoot: Mat4,
): Mat4 {
  return multiply(multiply(multiplyAll(ancestors), instancePlacement), storedPackageRoot);
}

/**
 * Composition for a nested instance.
 *
 * A nested prefab's placement is the transform of the GLB node carrying its
 * `extras.nook.prefabInstance` record, and everything above it in the parent
 * package is an ancestor. That makes nesting recursively identical to the
 * top-level case rather than a second rule.
 */
export function composeNestedRoot(
  outerAncestors: readonly Mat4[],
  outerPlacement: Mat4,
  outerStoredRoot: Mat4,
  ancestorsWithinOuterPayload: readonly Mat4[],
  nestedNodeTransform: Mat4,
  nestedStoredRoot: Mat4,
): Mat4 {
  const outerEffective = composeEffectiveRoot(outerAncestors, outerPlacement, outerStoredRoot);
  return composeEffectiveRoot(
    [outerEffective, ...ancestorsWithinOuterPayload],
    nestedNodeTransform,
    nestedStoredRoot,
  );
}

export function matricesEquivalent(a: Mat4, b: Mat4, tolerance = TRANSFORM_TOLERANCE): boolean {
  if (a.length !== 16 || b.length !== 16) return false;
  for (let i = 0; i < 16; i += 1) {
    if (Math.abs(a[i] - b[i]) > tolerance) return false;
  }
  return true;
}

export function isIdentity(matrix: Mat4, tolerance = TRANSFORM_TOLERANCE): boolean {
  return matricesEquivalent(matrix, IDENTITY_MATRIX, tolerance);
}
