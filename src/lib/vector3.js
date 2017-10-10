/**
 * Axis constants
 *
 * @readonly
 *
 * @memberof Vector3
 *
 * @enum {Number}
 */
const AXIS = {
  /** X axis */
  X: 0,

  /** Y axis */
  Y: 1,

  /** Z axis */
  Z: 2
};

Object.freeze(AXIS);

/**
 * Default values
 *
 * @readonly
 *
 * @memberof Vector3
 *
 * @type {Array}
 */
const DEFAULT = [0.0, 0.0, 0.0];

Object.freeze(DEFAULT);

/**
 * Vector3
 *
 * @extends Float32Array
 */
class Vector3 extends Float32Array {

  /**
   * Create a new vector.
   *
   * @param {Array} arr Initial values
   */
  constructor(arr = DEFAULT) {

    if (arr && arr.length > 3) {
      throw new Error('Invalid length');
    }

    super(arr);

  }

  /**
   * Check for exact equality against the given vector.
   *
   * @param {Vector3} v Vector to compare
   *
   * @returns {Boolean} Equality
   */
  equals(v) {

    return this[0] === v[0] && this[1] === v[1] && this[2] === v[2];

  }

  /**
   * Return the axis with the largest absolute value for the given vector. In cases of
   * equality, the returned axis is biased toward the right of X, Y, and Z.
   *
   * @returns {Number} Axis with the largest value
   */
  majorAxis() {

    const ax = Math.abs(this[0]);
    const ay = Math.abs(this[1]);
    const az = Math.abs(this[2]);

    if (az >= ax && az >= ay) {

      return AXIS.Z;

    } else if (ay >= ax) {

      return AXIS.Y;

    } else {

      return AXIS.X;

    }

  }

}

/**
 * Creates a new vector with a variable number of arguments.
 *
 * @param {...*} args Arguments for new vector
 *
 * @returns {Vector3} New vector
 */
Vector3.of = function(...args) {

  if (args.length === 0) {

    return new Vector3();

  } else {

    return new Vector3(args);

  }

};

Vector3.AXIS = AXIS;

Vector3.DEFAULT = DEFAULT;

export default Vector3;
