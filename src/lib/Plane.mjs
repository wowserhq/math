import { EPSILON } from './common';

/**
 * Default values
 *
 * @readonly
 * @memberof Plane
 * @type {Array}
 */
const DEFAULT = [0.0, 0.0, 1.0, 0.0];

Object.freeze(DEFAULT);

/**
 * Element length
 *
 * @readonly
 * @memberof Plane
 * @type {Number}
 */
const LENGTH = 4;

/**
 * A plane in the general form (normal, distance).
 *
 * @extends Float32Array
 */
class Plane extends Float32Array {
  /**
   * Create a new plane.
   *
   * @param {...*} args Arguments for new plane
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
   * Check for approximate equality against the given plane using given
   * epsilon.
   *
   * @param {Plane} p Plane to compare
   * @param {Number} e Epsilon
   * @returns {Boolean} Approximate equality
   */
  approximates(p, e = EPSILON) {
    const t0 = this[0], t1 = this[1], t2 = this[2], t3 = this[3];

    const p0 = p[0],    p1 = p[1],    p2 = p[2],    p3 = p[3];

    return Math.abs(t0 - p0) <= e * Math.max(1.0, Math.abs(t0), Math.abs(p0)) &&
           Math.abs(t1 - p1) <= e * Math.max(1.0, Math.abs(t1), Math.abs(p1)) &&
           Math.abs(t2 - p2) <= e * Math.max(1.0, Math.abs(t2), Math.abs(p2)) &&
           Math.abs(t3 - p3) <= e * Math.max(1.0, Math.abs(t3), Math.abs(p3));
  }

  /**
   * Check for exact equality against the given plane.
   *
   * @param {Plane} p Plane to compare
   * @returns {Boolean} Equality
   */
  equals(p) {
    return this[0] === p[0] &&
           this[1] === p[1] &&
           this[2] === p[2] &&
           this[3] === p[3];
  }

  /**
   * Execute the provided function once for each plane in the given array.
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
    const p = new Plane();

    for (let i = 0; i < l; i += LENGTH) {
      p[0] = arr[i];
      p[1] = arr[i + 1];
      p[2] = arr[i + 2];
      p[3] = arr[i + 3];

      cb.call(this, p, i / LENGTH, arr);

      arr[i]     = p[0];
      arr[i + 1] = p[1];
      arr[i + 2] = p[2];
      arr[i + 3] = p[3];
    }
  }

  /**
   * Generate an iterator capable of iterating over an array as plane indices.
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
   * Create a new plane with a variable number of arguments.
   *
   * @param {...*} args Arguments for new plane
   * @returns {Plane} New plane
   */
  static of(...args) {
    if (args.length === 0) {
      return new Plane();
    } else {
      return new Plane(args);
    }
  }

  /**
   * Generate an iterator capable of iterating over an array as planes.
   *
   * @param {(Float32Array|Array)} arr Array to iterate
   * @returns {Iterator} New iterator
   */
  static *values(arr) {
    if (arr.length % LENGTH !== 0) {
      throw new Error('Invalid length');
    }

    const l = arr.length;
    const p = new Plane();

    for (let i = 0; i < l; i += LENGTH) {
      p[0] = arr[i];
      p[1] = arr[i + 1];
      p[2] = arr[i + 2];
      p[3] = arr[i + 3];

      yield p;

      arr[i]     = p[0];
      arr[i + 1] = p[1];
      arr[i + 2] = p[2];
      arr[i + 3] = p[3];
    }
  }
}

Plane.DEFAULT = DEFAULT;

Plane.LENGTH = LENGTH;

export default Plane;
