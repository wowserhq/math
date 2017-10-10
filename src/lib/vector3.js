/**
 * Vector3
 *
 * @module Vector3
 */

/**
 * Default values for new vectors.
 */
export const DEFAULT = new Float32Array([0, 0, 0]);

/**
 * Axis constants
 */
export const AXIS_X = 0;
export const AXIS_Y = 1;
export const AXIS_Z = 2;

/**
 * Create new vector.
 *
 * @returns {Vector3} The new vector
 */
export function create() {

  return new Float32Array(DEFAULT);

}

/**
 * Create new vector from given values.
 *
 * @param {Number} x The x term
 * @param {Number} y The y term
 * @param {Number} z The z term
 *
 * @returns {Vector3} The new vector
 */
export function fromValues(x, y, z) {

  const vector = create();

  vector[0] = x;
  vector[1] = y;
  vector[2] = z;

  return vector;

}

/**
 * Return the axis with the largest absolute value for the given vector. In cases of
 * equality, the returned axis is biased toward the right of X, Y, and Z.
 *
 * @param {Vector3} vector The vector
 *
 * @returns {Number} Axis with the largest value
 */
export function majorAxis(vector) {

  const ax = Math.abs(vector[0]);
  const ay = Math.abs(vector[1]);
  const az = Math.abs(vector[2]);

  if (az >= ax && az >= ay) {

    return AXIS_Z;

  } else if (ay >= ax) {

    return AXIS_Y;

  } else {

    return AXIS_X;

  }

}
