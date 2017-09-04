/**
 * Plane
 *
 * @module Plane
 */

/**
 * Default equation for a new plane.
 */
export const DEFAULT = new Float32Array([0, 0, 1, 0]);

/**
 * Create new plane.
 *
 * @returns {Plane} The new plane
 */
export function create() {

  return new Float32Array(DEFAULT);

}

/**
 * Copy the values from one plane to another.
 *
 * @param {Plane} dst The receiving plane
 * @param {Plane} src The source plane
 *
 * @returns {Plane} The receiving plane
 */
export function copy(dst, src) {

  // Normal
  dst[0] = src[0];
  dst[1] = src[1];
  dst[2] = src[2];

  // Constant
  dst[3] = src[3];

  return dst;

}

/**
 * Set the normal and constant of a plane to the given values.
 *
 * @param {Plane} dst The receiving plane
 * @param {Number} nx The plane normal's x coord
 * @param {Number} ny The plane normal's y coord
 * @param {Number} nz The plane normal's z coord
 * @param {Number} c The plane's constant
 *
 * @returns {Plane} The receiving plane
 */
export function set(dst, nx, ny, nz, c) {

  // Normal
  dst[0] = nx;
  dst[1] = ny;
  dst[2] = nz;

  // Constant
  dst[3] = c;

  return dst;

}

/**
 * Create new plane from given values.
 *
 * @param {Number} nx The plane normal's x coord
 * @param {Number} ny The plane normal's y coord
 * @param {Number} nz The plane normal's z coord
 * @param {Number} c The plane's constant
 *
 * @returns {Plane} The new plane
 */
export function fromValues(nx, ny, nz, c) {

  const plane = create();

  // Normal
  plane[0] = nx;
  plane[1] = ny;
  plane[2] = nz;

  // Constant
  plane[3] = c;

  return plane;

}
