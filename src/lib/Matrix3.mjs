/* eslint-disable prefer-const */

import { EPSILON } from './common.mjs';

/**
 * Default values (identity)
 *
 * @readonly
 * @memberof Matrix3
 * @type {Array}
 */
const DEFAULT = [
  1.0, 0.0, 0.0, // col 0
  0.0, 1.0, 0.0, // col 1
  0.0, 0.0, 1.0, // col 2
];

Object.freeze(DEFAULT);

/**
 * Element length
 *
 * @readonly
 * @memberof Matrix3
 * @type {Number}
 */
const LENGTH = 9;

/**
 * A 3x3 matrix.
 *
 * @extends Float32Array
 */
class Matrix3 extends Float32Array {
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
   * Check for approximate equality against the given matrix using given
   * epsilon.
   *
   * @param {Matrix3} m Matrix to compare
   * @param {Number} e Epsilon
   * @returns {Boolean} Approximate equality
   */
  approximates(m, e = EPSILON) {
    const t0 = this[0], t1 = this[1], t2 = this[2];
    const t3 = this[3], t4 = this[4], t5 = this[5];
    const t6 = this[6], t7 = this[7], t8 = this[8];

    const m0 = m[0], m1 = m[1], m2 = m[2];
    const m3 = m[3], m4 = m[4], m5 = m[5];
    const m6 = m[6], m7 = m[7], m8 = m[8];

    return Math.abs(t0 - m0) <= e * Math.max(1.0, Math.abs(t0), Math.abs(m0)) &&
           Math.abs(t1 - m1) <= e * Math.max(1.0, Math.abs(t1), Math.abs(m1)) &&
           Math.abs(t2 - m2) <= e * Math.max(1.0, Math.abs(t2), Math.abs(m2)) &&
           Math.abs(t3 - m3) <= e * Math.max(1.0, Math.abs(t3), Math.abs(m3)) &&
           Math.abs(t4 - m4) <= e * Math.max(1.0, Math.abs(t4), Math.abs(m4)) &&
           Math.abs(t5 - m5) <= e * Math.max(1.0, Math.abs(t5), Math.abs(m5)) &&
           Math.abs(t6 - m6) <= e * Math.max(1.0, Math.abs(t6), Math.abs(m6)) &&
           Math.abs(t7 - m7) <= e * Math.max(1.0, Math.abs(t7), Math.abs(m7)) &&
           Math.abs(t8 - m8) <= e * Math.max(1.0, Math.abs(t8), Math.abs(m8));
  }

  /**
   * Set this matrix to an orientation matrix matching the given yaw, pitch,
   * and roll.
   *
   * This implementation is compatible with C33Matrix::FromEulerAnglesZYX.
   *
   * @param {Number} yaw Yaw (in radians)
   * @param {Number} pitch Pitch (in radians)
   * @param {Number} roll Roll (in radians)
   * @returns {Matrix3} Self
   */
  fromEulerAnglesZYX(yaw, pitch, roll) {
    // z
    const yawSin = Math.sin(yaw);
    const yawCos = Math.cos(yaw);

    /* eslint-disable indent */
    const z = Matrix3.of(
      yawCos, -yawSin, 0.0,
      yawSin,  yawCos, 0.0,
      0.0,     0.0,    1.0
    );
    /* eslint-enable indent */

    // y
    const pitchSin = Math.sin(pitch);
    const pitchCos = Math.cos(pitch);

    /* eslint-disable indent */
    const y = Matrix3.of(
       pitchCos, 0.0, pitchSin,
       0.0,      1.0, 0.0,
      -pitchSin, 0.0, pitchCos
    );
    /* eslint-enable indent */

    // x
    const rollSin = Math.sin(roll);
    const rollCos = Math.cos(roll);

    /* eslint-disable indent */
    const x = Matrix3.of(
      1.0, 0.0,      0.0,
      0.0, rollCos, -rollSin,
      0.0, rollSin,  rollCos
    );
    /* eslint-enable indent */

    const zyx = z.multiply(y.multiply(x));

    this[0] = zyx[0];
    this[1] = zyx[3];
    this[2] = zyx[6];

    this[3] = zyx[1];
    this[4] = zyx[4];
    this[5] = zyx[7];

    this[6] = zyx[2];
    this[7] = zyx[5];
    this[8] = zyx[8];

    return this;
  }

  /**
   * Multiply this matrix as left-hand-side against given matrix r as
   * right-hand-side.
   *
   * @param {Matrix3} r Right-hand-side matrix
   * @returns {Matrix3} Self
   */
  multiply(r) {
    const r0 = r[0], r1 = r[1], r2 = r[2];
    const r3 = r[3], r4 = r[4], r5 = r[5];
    const r6 = r[6], r7 = r[7], r8 = r[8];

    let l0 = this[0], l1 = this[1], l2 = this[2];

    this[0] = l0 * r0 + l1 * r3 + l2 * r6;
    this[1] = l0 * r1 + l1 * r4 + l2 * r7;
    this[2] = l0 * r2 + l1 * r5 + l2 * r8;

    l0 = this[3], l1 = this[4], l2 = this[5];

    this[3] = l0 * r0 + l1 * r3 + l2 * r6;
    this[4] = l0 * r1 + l1 * r4 + l2 * r7;
    this[5] = l0 * r2 + l1 * r5 + l2 * r8;

    l0 = this[6], l1 = this[7], l2 = this[8];

    this[6] = l0 * r0 + l1 * r3 + l2 * r6;
    this[7] = l0 * r1 + l1 * r4 + l2 * r7;
    this[8] = l0 * r2 + l1 * r5 + l2 * r8;

    return this;
  }
}

Matrix3.DEFAULT = DEFAULT;

export default Matrix3;
