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
