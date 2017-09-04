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
