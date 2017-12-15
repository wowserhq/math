import { EPSILON } from './common';

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
   * Matrix elements are stored such that x, y, z == this[12], this[13], this[14]
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
   * @param {Matrix4} m Matrix to compare
   * @param {Number} e Epsilon
   * @returns {Boolean} Approximate equality
   */
  approximates(m, e = EPSILON) {
    const t0  = this[0],  t1  = this[1],  t2  = this[2],  t3  = this[3];
    const t4  = this[4],  t5  = this[5],  t6  = this[6],  t7  = this[7];
    const t8  = this[8],  t9  = this[9],  t10 = this[10], t11 = this[11];
    const t12 = this[12], t13 = this[13], t14 = this[14], t15 = this[15];

    const m0  = m[0],     m1  = m[1],     m2  = m[2],     m3  = m[3];
    const m4  = m[4],     m5  = m[5],     m6  = m[6],     m7  = m[7];
    const m8  = m[8],     m9  = m[9],     m10 = m[10],    m11 = m[11];
    const m12 = m[12],    m13 = m[13],    m14 = m[14],    m15 = m[15];

    return Math.abs(t0  - m0)  <= e * Math.max(1.0, Math.abs(t0),  Math.abs(m0))  &&
           Math.abs(t1  - m1)  <= e * Math.max(1.0, Math.abs(t1),  Math.abs(m1))  &&
           Math.abs(t2  - m2)  <= e * Math.max(1.0, Math.abs(t2),  Math.abs(m2))  &&
           Math.abs(t3  - m3)  <= e * Math.max(1.0, Math.abs(t3),  Math.abs(m3))  &&
           Math.abs(t4  - m4)  <= e * Math.max(1.0, Math.abs(t4),  Math.abs(m4))  &&
           Math.abs(t5  - m5)  <= e * Math.max(1.0, Math.abs(t5),  Math.abs(m5))  &&
           Math.abs(t6  - m6)  <= e * Math.max(1.0, Math.abs(t6),  Math.abs(m6))  &&
           Math.abs(t7  - m7)  <= e * Math.max(1.0, Math.abs(t7),  Math.abs(m7))  &&
           Math.abs(t8  - m8)  <= e * Math.max(1.0, Math.abs(t8),  Math.abs(m8))  &&
           Math.abs(t9  - m9)  <= e * Math.max(1.0, Math.abs(t9),  Math.abs(m9))  &&
           Math.abs(t10 - m10) <= e * Math.max(1.0, Math.abs(t10), Math.abs(m10)) &&
           Math.abs(t11 - m11) <= e * Math.max(1.0, Math.abs(t11), Math.abs(m11)) &&
           Math.abs(t12 - m12) <= e * Math.max(1.0, Math.abs(t12), Math.abs(m12)) &&
           Math.abs(t13 - m13) <= e * Math.max(1.0, Math.abs(t13), Math.abs(m13)) &&
           Math.abs(t14 - m14) <= e * Math.max(1.0, Math.abs(t14), Math.abs(m14)) &&
           Math.abs(t15 - m15) <= e * Math.max(1.0, Math.abs(t15), Math.abs(m15));
  }

  /**
   * Set this matrix to a transform matrix composed from the given position,
   * rotation, and scale.
   *
   * @param {Vector3} p Position vector
   * @param {Quat} r Rotation quaternion
   * @param {Vector3} s Scale vector
   * @returns {Matrix4} Self
   */
  compose(p, r, s) {
    const sx = s[0], sy = s[1], sz = s[2];

    const rx = r[0], ry = r[1], rz = r[2], rw = r[3];

    const rx2 = rx + rx;
    const ry2 = ry + ry;
    const rz2 = rz + rz;

    const rxrx2 = rx * rx2;
    const rxry2 = rx * ry2;
    const rxrz2 = rx * rz2;

    const ryry2 = ry * ry2;
    const ryrz2 = ry * rz2;

    const rzrz2 = rz * rz2;

    const rwrx2 = rw * rx2;
    const rwry2 = rw * ry2;
    const rwrz2 = rw * rz2;

    this[0]  = (1.0 - (ryry2 + rzrz2)) * sx;
    this[1]  = (rxry2 + rwrz2) * sx;
    this[2]  = (rxrz2 - rwry2) * sx;
    this[3]  = 0.0;

    this[4]  = (rxry2 - rwrz2) * sy;
    this[5]  = (1.0 - (rxrx2 + rzrz2)) * sy;
    this[6]  = (ryrz2 + rwrx2) * sy;
    this[7]  = 0.0;

    this[8]  = (rxrz2 + rwry2) * sz;
    this[9]  = (ryrz2 - rwrx2) * sz;
    this[10] = (1.0 - (rxrx2 + ryry2)) * sz;
    this[11] = 0.0;

    this[12] = p[0];
    this[13] = p[1];
    this[14] = p[2];
    this[15] = 1.0;

    return this;
  }

  /**
   * Invert this matrix.
   *
   * @returns {Matrix4} Self
   */
  invert() {
    const t0  = this[0],  t1  = this[1],  t2  = this[2],  t3  = this[3];
    const t4  = this[4],  t5  = this[5],  t6  = this[6],  t7  = this[7];
    const t8  = this[8],  t9  = this[9],  t10 = this[10], t11 = this[11];
    const t12 = this[12], t13 = this[13], t14 = this[14], t15 = this[15];

    const b0  = t0  * t5  - t1  * t4;
    const b1  = t0  * t6  - t2  * t4;
    const b2  = t0  * t7  - t3  * t4;
    const b3  = t1  * t6  - t2  * t5;
    const b4  = t1  * t7  - t3  * t5;
    const b5  = t2  * t7  - t3  * t6;
    const b6  = t8  * t13 - t9  * t12;
    const b7  = t8  * t14 - t10 * t12;
    const b8  = t8  * t15 - t11 * t12;
    const b9  = t9  * t14 - t10 * t13;
    const b10 = t9  * t15 - t11 * t13;
    const b11 = t10 * t15 - t11 * t14;

    const d = b0 * b11 - b1 * b10 + b2 * b9 + b3 * b8 - b4 * b7 + b5 * b6;

    const id = 1.0 / d;

    this[0]  = (t5  * b11 - t6  * b10 + t7  * b9) * id;
    this[1]  = (t2  * b10 - t1  * b11 - t3  * b9) * id;
    this[2]  = (t13 * b5  - t14 * b4  + t15 * b3) * id;
    this[3]  = (t10 * b4  - t9  * b5  - t11 * b3) * id;

    this[4]  = (t6  * b8  - t4  * b11 - t7  * b7) * id;
    this[5]  = (t0  * b11 - t2  * b8  + t3  * b7) * id;
    this[6]  = (t14 * b2  - t12 * b5  - t15 * b1) * id;
    this[7]  = (t8  * b5  - t10 * b2  + t11 * b1) * id;

    this[8]  = (t4  * b10 - t5  * b8  + t7  * b6) * id;
    this[9]  = (t1  * b8  - t0  * b10 - t3  * b6) * id;
    this[10] = (t12 * b4  - t13 * b2  + t15 * b0) * id;
    this[11] = (t9  * b2  - t8  * b4  - t11 * b0) * id;

    this[12] = (t5  * b7  - t4  * b9  - t6  * b6) * id;
    this[13] = (t0  * b9  - t1  * b7  + t2  * b6) * id;
    this[14] = (t13 * b1  - t12 * b3  - t14 * b0) * id;
    this[15] = (t8  * b3  - t9  * b1  + t10 * b0) * id;

    return this;
  }

  /**
   * Set this matrix to a view matrix matching the given eye, center, and up
   * vectors.
   *
   * This implementation is compatible with GxuXformCreateLookAtSgCompat.
   *
   * @param {Vector3} eye Origin of the view
   * @param {Vector3} center Target of the view
   * @param {Vector3} up Vector pointing up
   * @returns {Matrix4} Self
   */
  lookAt(eye, center, up) {
    const ex = eye[0],    ey = eye[1],    ez = eye[2];
    const cx = center[0], cy = center[1], cz = center[2];
    const ux = up[0],     uy = up[1],     uz = up[2];

    let m = 0.0;

    // z = sub(center, eye)
    let zx = cx - ex;
    let zy = cy - ey;
    let zz = cz - ez;

    // Extremely close target
    if (Math.abs(zx) < EPSILON && Math.abs(zy) < EPSILON && Math.abs(zz) < EPSILON) {
      this.set(DEFAULT);
      return this;
    }

    // z = normalize(z)
    m = 1.0 / Math.sqrt(zx * zx + zy * zy + zz * zz);

    zx *= m;
    zy *= m;
    zz *= m;

    // x = cross(z, up)
    let xx = zy * uz - zz * uy;
    let xy = zz * ux - zx * uz;
    let xz = zx * uy - zy * ux;

    // x = normalize(x)
    m = xx * xx + xy * xy + xz * xz;

    if (m === 0.0) {
      xx = 0.0;
      xy = 0.0;
      xz = 0.0;
    } else {
      m = 1.0 / Math.sqrt(m);

      xx *= m;
      xy *= m;
      xz *= m;
    }

    // y = cross(x, z)
    let yx = xy * zz - xz * zy;
    let yy = xz * zx - xx * zz;
    let yz = xx * zy - xy * zx;

    this[0]  = xx;
    this[1]  = yx;
    this[2]  = zx;
    this[3]  = 0.0;

    this[4]  = xy;
    this[5]  = yy;
    this[6]  = zy;
    this[7]  = 0.0;

    this[8]  = xz;
    this[9]  = yz;
    this[10] = zz;
    this[11] = 0.0;

    this[12] = -(xx * ex + xy * ey + xz * ez);
    this[13] = -(yx * ex + yy * ey + yz * ez);
    this[14] = -(zx * ex + zy * ey + zz * ez);
    this[15] = 1.0;

    return this;
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
   * Set this matrix to a perspective projection matrix matching the given
   * vertical field of view, aspect ratio, near frustum, and far frustum.
   *
   * The resulting projection matrix is left-handed and has a depth range
   * from -1-to-1.
   *
   * This implementation is compatible with GxuXformCreateProjection_Exact.
   *
   * Note that the client performs various adjustments to this matrix
   * depending on the targeted rendering API:
   *
   * - For OpenGL, the matrix is converted from left-handed to right-
   *   handed by flipping the signs of elements 8-11.
   *
   * - For Direct3D, the matrix is kept left-handed, but the depth range
   *   is converted from -1-to-1 to 0-to-1.
   *
   * @param {Number} fovy Vertical field of view (in radians)
   * @param {Number} aspect Aspect ratio
   * @param {Number} near Near frustum
   * @param {Number} far Far frustum
   * @returns {Matrix4} Self
   */
  projectPerspective(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy * 0.5);
    const ir = 1.0 / (far - near);

    this[0]  = f / aspect;
    this[1]  = 0.0;
    this[2]  = 0.0;
    this[3]  = 0.0;

    this[4]  = 0.0;
    this[5]  = f;
    this[6]  = 0.0;
    this[7]  = 0.0;

    this[8]  = 0.0;
    this[9]  = 0.0;
    this[10] = (far + near) * ir;
    this[11] = 1.0;

    this[12] = 0.0;
    this[13] = 0.0;
    this[14] = -(2.0 * far * near) * ir;
    this[15] = 0.0;

    return this;
  }

  /**
   * Set this matrix to a perspective projection matrix using the given
   * diagonal field of view, aspect ratio, near frustum, and far frustum.
   *
   * The given diagonal field of view is converted to a vertical field of
   * view prior to calling projectPerspective. All other parameters are
   * left unchanged.
   *
   * This implementation is compatible with GxuXformCreateProjection_SG.
   *
   * @param {Number} fovd Diagonal field of view (in radians)
   * @param {Number} aspect Aspect ratio
   * @param {Number} near Near frustum
   * @param {Number} far Far frustum
   * @returns {Matrix4} Self
   */
  projectPerspectiveDiagonal(fovd, aspect, near, far) {
    const fovy = fovd / Math.sqrt(aspect * aspect + 1.0);
    return this.projectPerspective(fovy, aspect, near, far);
  }

  /**
   * Transpose this matrix.
   *
   * @returns {Matrix4} Self
   */
  transpose() {
    const t1  = this[1],  t2  = this[2],  t3  = this[3],  t4  = this[4];
    const t6  = this[6],  t7  = this[7],  t8  = this[8],  t9  = this[9];
    const t11 = this[11], t12 = this[12], t13 = this[13], t14 = this[14];

    this[1]  = t4;
    this[2]  = t8;
    this[3]  = t12;

    this[4]  = t1;
    this[6]  = t9;
    this[7]  = t13;

    this[8]  = t2;
    this[9]  = t6;
    this[11] = t14;

    this[12] = t3;
    this[13] = t7;
    this[14] = t11;
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
