/**
 * Axis constants
 *
 * @readonly
 * @memberof Vector3
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
 * @memberof Vector3
 * @type {Array}
 */
const DEFAULT = [0.0, 0.0, 0.0];

Object.freeze(DEFAULT);

/**
 * Element length
 *
 * @readonly
 * @memberof Vector3
 * @type {Number}
 */
const LENGTH = 3;

/**
 * A 3-component vector.
 *
 * @extends Float32Array
 */
class Vector3 extends Float32Array {
  /**
   * Create a new vector.
   *
   * @param {...*} args Arguments for new vector
   */
  constructor(...args) {
    if (args.length === 0) {
      super(DEFAULT);
    } else {
      super(...args);
    }

    if (this.length !== LENGTH) {
      throw new Error('Invalid length');
    }
  }

  /**
   * Add given vector v to this vector.
   *
   * @param {Vector3} v Vector to add
   * @returns {Vector3} Self
   */
  add(v) {
    this[0] += v[0];
    this[1] += v[1];
    this[2] += v[2];

    return this;
  }

  /**
   * Add given scalar s to this vector's components.
   *
   * @param {Number} s Scalar to add
   * @returns {Vector3} Self
   */
  addScalar(s) {
    this[0] += s;
    this[1] += s;
    this[2] += s;

    return this;
  }

  /**
   * Check for exact equality against the given vector.
   *
   * @param {Vector3} v Vector to compare
   * @returns {Boolean} Equality
   */
  equals(v) {
    return this[0] === v[0] && this[1] === v[1] && this[2] === v[2];
  }

  /**
   * Return the magnitude (length) of the vector.
   *
   * @returns {Number} Magnitude of the vector
   */
  magnitude() {
    const x = this[0];
    const y = this[1];
    const z = this[2];

    return Math.sqrt(x * x + y * y + z * z);
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

  /**
   * Multiply this vector by given vector v.
   *
   * @param {Vector3} v Vector to multiply by
   * @returns {Vector3} Self
   */
  multiply(v) {
    this[0] *= v[0];
    this[1] *= v[1];
    this[2] *= v[2];

    return this;
  }

  /**
   * Multiply this vector by given scalar s.
   *
   * @param {Number} s Scalar to multiply by
   * @returns {Vector3} Self
   */
  multiplyScalar(s) {
    this[0] *= s;
    this[1] *= s;
    this[2] *= s;

    return this;
  }

  /**
   * Normalize the vector.
   *
   * @returns {Vector3} Self
   */
  normalize() {
    const x = this[0];
    const y = this[1];
    const z = this[2];

    const m = Math.sqrt(x * x + y * y + z * z);

    if (m > 0.0) {
      const im = 1.0 / m;

      this[0] = x * im;
      this[1] = y * im;
      this[2] = z * im;
    }

    return this;
  }

  /**
   * Subtract given vector v from this vector.
   *
   * @param {Vector3} v Vector to subtract
   * @returns {Vector3} Self
   */
  sub(v) {
    this[0] -= v[0];
    this[1] -= v[1];
    this[2] -= v[2];

    return this;
  }

  /**
   * Subtract given scalar s from this vector's components.
   *
   * @param {Number} s Scalar to subtract
   * @returns {Vector3} Self
   */
  subScalar(s) {
    this[0] -= s;
    this[1] -= s;
    this[2] -= s;

    return this;
  }

  /**
   * Execute the provided function once for each vector in the given array.
   *
   * @param {(Float32Array|Array)} arr Array to traverse
   * @param {Function} cb Callback
   * @returns {void}
   */
  static forEach(arr, cb) {
    if (arr.length % LENGTH !== 0) {
      throw new Error('Invalid length');
    }

    const l = arr.length;
    const v = new Vector3();

    for (let i = 0; i < l; i += LENGTH) {
      v[0] = arr[i];
      v[1] = arr[i + 1];
      v[2] = arr[i + 2];

      cb.call(this, v, i / LENGTH, arr);

      arr[i] = v[0];
      arr[i + 1] = v[1];
      arr[i + 2] = v[2];
    }
  }

  /**
   * Generate an iterator capable of iterating over an array as vector indices.
   *
   * @param {(Float32Array|Array)} arr Array to iterate
   * @returns {Iterator} New iterator
   */
  static *keys(arr) {
    if (arr.length % LENGTH !== 0) {
      throw new Error('Invalid length');
    }

    const l = arr.length / LENGTH;

    for (let i = 0; i < l; i++) {
      yield i;
    }
  }

  /**
   * Create a new vector with a variable number of arguments.
   *
   * @param {...*} args Arguments for new vector
   * @returns {Vector3} New vector
   */
  static of(...args) {
    if (args.length === 0) {
      return new Vector3();
    } else {
      return new Vector3(args);
    }
  }

  /**
   * Generate an iterator capable of iterating over an array as vectors.
   *
   * @param {(Float32Array|Array)} arr Array to iterate
   * @returns {Iterator} New iterator
   */
  static *values(arr) {
    if (arr.length % LENGTH !== 0) {
      throw new Error('Invalid length');
    }

    const l = arr.length;
    const v = new Vector3();

    for (let i = 0; i < l; i += LENGTH) {
      v[0] = arr[i];
      v[1] = arr[i + 1];
      v[2] = arr[i + 2];

      yield v;

      arr[i] = v[0];
      arr[i + 1] = v[1];
      arr[i + 2] = v[2];
    }
  }
}

Vector3.AXIS = AXIS;

Vector3.DEFAULT = DEFAULT;

Vector3.LENGTH = LENGTH;

export default Vector3;
