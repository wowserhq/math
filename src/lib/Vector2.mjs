import { EPSILON } from './common.mjs';

/**
 * Default values
 *
 * @readonly
 * @memberof Vector2
 * @type {Array}
 */
const DEFAULT = [0.0, 0.0];

Object.freeze(DEFAULT);

/**
 * Element length
 *
 * @readonly
 * @memberof Vector2
 * @type {Number}
 */
const LENGTH = 2;

/**
 * A 2-component vector.
 *
 * @extends Float32Array
 */
class Vector2 extends Float32Array {
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
   * @type {Number}
   */
  get x() {
    return this[0];
  }

  set x(x) {
    this[0] = x;
  }

  /**
   * @type {Number}
   */
  get y() {
    return this[1];
  }

  set y(y) {
    this[1] = y;
  }

  /**
   * Check for approximate equality against the given vector using given
   * epsilon.
   *
   * @param {Vector2} v Vector to compare
   * @param {Number} e Epsilon
   * @returns {Boolean} Approximate equality
   */
  approximates(v, e = EPSILON) {
    const t0 = this[0], t1 = this[1];
    const v0 = v[0],    v1 = v[1];

    return Math.abs(t0 - v0) <= e * Math.max(1.0, Math.abs(t0), Math.abs(v0)) &&
           Math.abs(t1 - v1) <= e * Math.max(1.0, Math.abs(t1), Math.abs(v1));
  }

  /**
   * Check for exact equality against the given vector.
   *
   * @param {Vector2} v Vector to compare
   * @returns {Boolean} Equality
   */
  equals(v) {
    return this[0] === v[0] && this[1] === v[1];
  }

  /**
   * Set the elements of this vector to the given values.
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {Vector2} Self
   */
  setElements(x, y) {
    this[0] = x;
    this[1] = y;

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
    const v = new Vector2();

    for (let i = 0; i < l; i += LENGTH) {
      v[0] = arr[i];
      v[1] = arr[i + 1];

      cb.call(this, v, i / LENGTH, arr);

      arr[i] = v[0];
      arr[i + 1] = v[1];
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
   * @returns {Vector2} New vector
   */
  static of(...args) {
    if (args.length === 0) {
      return new Vector2();
    } else {
      return new Vector2(args);
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
    const v = new Vector2();

    for (let i = 0; i < l; i += LENGTH) {
      v[0] = arr[i];
      v[1] = arr[i + 1];

      yield v;

      arr[i] = v[0];
      arr[i + 1] = v[1];
    }
  }
}

Vector2.DEFAULT = DEFAULT;

Vector2.LENGTH = LENGTH;

export default Vector2;
