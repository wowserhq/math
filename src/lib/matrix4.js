/**
 * Default values (identity)
 *
 * @readonly
 * @memberof Matrix4
 * @type {Array}
 */
const DEFAULT = [
  1.0, 0.0, 0.0, 0.0, // col 0
  0.0, 1.0, 0.0, 0.0, // col 1
  0.0, 0.0, 1.0, 0.0, // col 2
  0.0, 0.0, 0.0, 1.0  // col 3
];

Object.freeze(DEFAULT);

/**
 * Element length
 *
 * @readonly
 * @memberof Matrix4
 * @type {Number}
 */
const LENGTH = 16;

/**
 * A 4x4 matrix.
 *
 * @extends Float32Array
 */
class Matrix4 extends Float32Array {
  /**
   * Create a new matrix.
   *
   * @param {...*} args Arguments for new matrix
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
   * Multiply this matrix by given matrix m.
   *
   * @param {Matrix4} m Matrix to multiply by
   * @returns {Matrix4} Self
   */
  multiply(m) {
    const t0  = this[0],  t1  = this[1],  t2  = this[2],  t3  = this[3];
    const t4  = this[4],  t5  = this[5],  t6  = this[6],  t7  = this[7];
    const t8  = this[8],  t9  = this[9],  t10 = this[10], t11 = this[11];
    const t12 = this[12], t13 = this[13], t14 = this[14], t15 = this[15];

    let m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3];

    this[0]  = m0 * t0 + m1 * t4 + m2 * t8  + m3 * t12;
    this[1]  = m0 * t1 + m1 * t5 + m2 * t9  + m3 * t13;
    this[2]  = m0 * t2 + m1 * t6 + m2 * t10 + m3 * t14;
    this[3]  = m0 * t3 + m1 * t7 + m2 * t11 + m3 * t15;

    m0 = m[4], m1 = m[5], m2 = m[6], m3 = m[7];

    this[4]  = m0 * t0 + m1 * t4 + m2 * t8  + m3 * t12;
    this[5]  = m0 * t1 + m1 * t5 + m2 * t9  + m3 * t13;
    this[6]  = m0 * t2 + m1 * t6 + m2 * t10 + m3 * t14;
    this[7]  = m0 * t3 + m1 * t7 + m2 * t11 + m3 * t15;

    m0 = m[8], m1 = m[9], m2 = m[10], m3 = m[11];

    this[8]  = m0 * t0 + m1 * t4 + m2 * t8  + m3 * t12;
    this[9]  = m0 * t1 + m1 * t5 + m2 * t9  + m3 * t13;
    this[10] = m0 * t2 + m1 * t6 + m2 * t10 + m3 * t14;
    this[11] = m0 * t3 + m1 * t7 + m2 * t11 + m3 * t15;

    m0 = m[12], m1 = m[13], m2 = m[14], m3 = m[15];

    this[12] = m0 * t0 + m1 * t4 + m2 * t8  + m3 * t12;
    this[13] = m0 * t1 + m1 * t5 + m2 * t9  + m3 * t13;
    this[14] = m0 * t2 + m1 * t6 + m2 * t10 + m3 * t14;
    this[15] = m0 * t3 + m1 * t7 + m2 * t11 + m3 * t15;

    return this;
  }

  /**
   * Create a new matrix with a variable number of arguments.
   *
   * @param {...*} args Arguments for new matrix
   * @returns {Matrix4} New matrix
   */
  static of(...args) {
    if (args.length === 0) {
      return new Matrix4();
    } else {
      return new Matrix4(args);
    }
  }
}

Matrix4.DEFAULT = DEFAULT;

export default Matrix4;
