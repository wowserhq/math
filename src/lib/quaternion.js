import { EPSILON } from './common';

/**
 * Default values
 *
 * @readonly
 * @memberof Quaternion
 * @type {Array}
 */
const DEFAULT = [0.0, 0.0, 0.0, 1.0];

Object.freeze(DEFAULT);

/**
 * Element length
 *
 * @readonly
 * @memberof Quaternion
 * @type {Number}
 */
const LENGTH = 4;

/**
 * A quaternion.
 *
 * @extends Float32Array
 */
class Quaternion extends Float32Array {
  /**
   * Create a new quaternion.
   *
   * @param {...*} args Arguments for new quaternion
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
   * Check for approximate equality against the given quaternion using given
   * epsilon.
   *
   * @param {Quaternion} q Quaternion to compare
   * @param {Number} e Epsilon
   * @returns {Boolean} Approximate equality
   */
  approximates(q, e = EPSILON) {
    const t0 = this[0], t1 = this[1], t2 = this[2], t3 = this[3];

    const q0 = q[0],    q1 = q[1],    q2 = q[2],    q3 = q[3];

    return Math.abs(t0 - q0) <= e * Math.max(1.0, Math.abs(t0), Math.abs(q0)) &&
           Math.abs(t1 - q1) <= e * Math.max(1.0, Math.abs(t1), Math.abs(q1)) &&
           Math.abs(t2 - q2) <= e * Math.max(1.0, Math.abs(t2), Math.abs(q2)) &&
           Math.abs(t3 - q3) <= e * Math.max(1.0, Math.abs(t3), Math.abs(q3));
  }

  /**
   * Check for exact equality against the given quaternion.
   *
   * @param {Quaternion} q Quaternion to compare
   * @returns {Boolean} Equality
   */
  equals(q) {
    return this[0] === q[0] &&
           this[1] === q[1] &&
           this[2] === q[2] &&
           this[3] === q[3];
  }

  /**
   * Return the magnitude (length) of the quaternion.
   *
   * @returns {Number} Magnitude of the quaternion
   */
  magnitude() {
    const x = this[0];
    const y = this[1];
    const z = this[2];
    const w = this[3];

    return Math.sqrt(x * x + y * y + z * z + w * w);
  }

  /**
   * Multiply this quaternion by given quaternion.
   *
   * @param {Quaternion} q Quaternion to multiply by
   * @returns {Quaternion} Self
   */
  multiply(q) {
    const tx = this[0], ty = this[1], tz = this[2], tw = this[3];
    const qx = q[0],    qy = q[1],    qz = q[2],    qw = q[3];

    this[0] = tx * qw + tw * qx + ty * qz - tz * qy;
    this[1] = ty * qw + tw * qy + tz * qx - tx * qz;
    this[2] = tz * qw + tw * qz + tx * qy - ty * qx;
    this[3] = tw * qw - tx * qx - ty * qy - tz * qz;

    return this;
  }

  /**
   * Normalize the quaternion.
   *
   * @returns {Quaternion} Self
   */
  normalize() {
    const x = this[0];
    const y = this[1];
    const z = this[2];
    const w = this[3];

    const m = Math.sqrt(x * x + y * y + z * z + w * w);

    if (m > 0.0) {
      const im = 1.0 / m;

      this[0] = x * im;
      this[1] = y * im;
      this[2] = z * im;
      this[3] = w * im;
    }

    return this;
  }

  /**
   * Execute the provided function once for each quaternion in the given array.
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
    const q = new Quaternion();

    for (let i = 0; i < l; i += LENGTH) {
      q[0] = arr[i];
      q[1] = arr[i + 1];
      q[2] = arr[i + 2];
      q[3] = arr[i + 3];

      cb.call(this, q, i / LENGTH, arr);

      arr[i]     = q[0];
      arr[i + 1] = q[1];
      arr[i + 2] = q[2];
      arr[i + 3] = q[3];
    }
  }

  /**
   * Generate an iterator capable of iterating over an array as quaternion indices.
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
   * Create a new quaternion with a variable number of arguments.
   *
   * @param {...*} args Arguments for new quaternion
   * @returns {Quat} New quaternion
   */
  static of(...args) {
    if (args.length === 0) {
      return new Quaternion();
    } else {
      return new Quaternion(args);
    }
  }

  /**
   * Generate an iterator capable of iterating over an array as quaterions.
   *
   * @param {(Float32Array|Array)} arr Array to iterate
   * @returns {Iterator} New iterator
   */
  static *values(arr) {
    if (arr.length % LENGTH !== 0) {
      throw new Error('Invalid length');
    }

    const l = arr.length;
    const q = new Quaternion();

    for (let i = 0; i < l; i += LENGTH) {
      q[0] = arr[i];
      q[1] = arr[i + 1];
      q[2] = arr[i + 2];
      q[3] = arr[i + 3];

      yield q;

      arr[i]     = q[0];
      arr[i + 1] = q[1];
      arr[i + 2] = q[2];
      arr[i + 3] = q[3];
    }
  }
}

Quaternion.DEFAULT = DEFAULT;

Quaternion.LENGTH = LENGTH;

export default Quaternion;
