import { DEG2RAD, Matrix4, Quaternion, Vector3 } from '../lib';

describe('Matrix4', () => {
  describe('prototype.constructor()', () => {
    test('returns new matrix with expected type', () => {
      const matrix = new Matrix4();

      expect(matrix).toBeInstanceOf(Matrix4);
      expect(matrix).toBeInstanceOf(Float32Array);
    });

    test('returns new matrix with default values', () => {
      const matrix = new Matrix4();

      expect(matrix).toEqual(new Matrix4(Matrix4.DEFAULT));
    });
  });

  describe('prototype.approximates()', () => {
    test('returns true when matrices are approximately equal', () => {
      const matrix1 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      const matrix2 = Matrix4.of(
        1.000001, 0.0, 0.0, 0.0, // col 0
        0.0,      1.0, 0.0, 0.0, // col 1
        0.0,      0.0, 1.0, 0.0, // col 2
        1.0,      2.0, 3.0, 1.0  // col 3
      );

      expect(matrix1.approximates(matrix2)).toBe(true);
    });

    test('returns true when matrices are exactly equal', () => {
      const matrix1 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      const matrix2 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      expect(matrix1.approximates(matrix2)).toBe(true);
    });

    test('returns false when matrices are not equal', () => {
      const matrix1 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      const matrix2 = Matrix4.of(
        2.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      expect(matrix1.approximates(matrix2)).toBe(false);
    });
  });

  describe('prototype.compose()', () => {
    test('composes this matrix', () => {
      const position = Vector3.of(1.0, 2.0, 3.0);
      const rotation = Quaternion.of(0.1, -0.1, 0.5, 1.0);
      const scale = Vector3.of(0.9, 0.8, 0.7);

      const matrix = new Matrix4().compose(position, rotation, scale);

      /* eslint-disable */
      expect(matrix.approximates(Matrix4.of(
         0.431999,  0.881999, 0.270000, 0.0, // col 0
        -0.815999,  0.384000, 0.080000, 0.0, // col 1
        -0.070000, -0.209999, 0.671999, 0.0, // col 2
         1.0,       2.0,      3.0,      1.0  // col 3
      ))).toBe(true);
      /* eslint-enable */
    });
  });

  describe('prototype.invert()', () => {
    test('inverts this matrix', () => {
      const matrix = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      matrix.invert();

      /* eslint-disable */
      expect(matrix).toEqual(Matrix4.of(
         1.0,  0.0,  0.0, 0.0, // col 0
         0.0,  1.0,  0.0, 0.0, // col 1
         0.0,  0.0,  1.0, 0.0, // col 2
        -1.0, -2.0, -3.0, 1.0  // col 3
      ));
      /* eslint-enable */
    });

    test('inverts identity matrix', () => {
      const matrix = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        0.0, 0.0, 0.0, 1.0  // col 3
      );

      matrix.invert();

      expect(matrix).toEqual(Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        0.0, 0.0, 0.0, 1.0  // col 3
      ));
    });

    test('inverts zero matrix', () => {
      const matrix = Matrix4.of(
        0.0, 0.0, 0.0, 0.0, // col 0
        0.0, 0.0, 0.0, 0.0, // col 1
        0.0, 0.0, 0.0, 0.0, // col 2
        0.0, 0.0, 0.0, 0.0  // col 3
      );

      matrix.invert();

      expect(matrix).toEqual(Matrix4.of(
        NaN, NaN, NaN, NaN, // col 0
        NaN, NaN, NaN, NaN, // col 1
        NaN, NaN, NaN, NaN, // col 2
        NaN, NaN, NaN, NaN  // col 3
      ));
    });
  });

  describe('prototype.lookAt()', () => {
    test('creates view matrix with positive offset from eye to center, and z up vector', () => {
      const eye = Vector3.of(1.0, 1.0, 1.0);
      const center = Vector3.of(10.0, 10.0, 10.0);
      const up = Vector3.of(0.0, 0.0, 1.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      /* eslint-disable */
      expect(matrix.approximates(Matrix4.of(
         0.7071068287, -0.4082481861,  0.5773502588, 0.0, // col 0
        -0.7071067095, -0.4082484245,  0.5773502588, 0.0, // col 1
         0.0,           0.8164966106,  0.5773502588, 0.0, // col 2
         0.0,           0.0,          -1.732050776,  1.0  // col 3
      ))).toBe(true);
      /* eslint-enable */
    });

    test('creates view matrix with positive offset from eye to center, and y up vector', () => {
      const eye = Vector3.of(1.0, 1.0, 1.0);
      const center = Vector3.of(10.0, 10.0, 10.0);
      const up = Vector3.of(0.0, 1.0, 0.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      /* eslint-disable */
      expect(matrix.approximates(Matrix4.of(
        -0.7071067691, -0.4082483053,  0.5773502588, 0.0, // col 0
         0.0,           0.8164966106,  0.5773502588, 0.0, // col 1
         0.7071067691, -0.4082483053,  0.5773502588, 0.0, // col 2
         0.0,           0.0,          -1.732050776,  1.0  // col 3
      ))).toBe(true);
      /* eslint-enable */
    });

    test('creates view matrix with negative offset from eye to center, and z up vector', () => {
      const eye = Vector3.of(1.0, 2.0, 3.0);
      const center = Vector3.of(-21.0, -11.0, -9.0);
      const up = Vector3.of(0.0, 0.0, 1.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      /* eslint-disable */
      expect(matrix.approximates(Matrix4.of(
        -0.5087293386, -0.3659469187, -0.7792800069, 0.0, // col 0
         0.8609265089, -0.2162415236, -0.4604836404, 0.0, // col 1
         0.0,           0.9051643014, -0.4250618219, 0.0, // col 2
        -1.213124156,  -1.917062998,   2.975432873,  1.0  // col 3
      ))).toBe(true);
      /* eslint-enable */
    });

    test('creates view matrix from identical eye and center', () => {
      const eye = Vector3.of(0.0, 0.0, 0.0);
      const center = Vector3.of(0.0, 0.0, 0.0);
      const up = Vector3.of(0.0, 0.0, 1.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      expect(matrix.approximates(Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        0.0, 0.0, 0.0, 1.0  // col 3
      ))).toBe(true);
    });

    test('creates view matrix with zero up vector', () => {
      const eye = Vector3.of(0.0, 0.0, 0.0);
      const center = Vector3.of(1.0, 1.0, 1.0);
      const up = Vector3.of(0.0, 0.0, 0.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      expect(matrix.approximates(Matrix4.of(
        0.0, 0.0, 0.577350, 0.0, // col 0
        0.0, 0.0, 0.577350, 0.0, // col 1
        0.0, 0.0, 0.577350, 0.0, // col 2
        0.0, 0.0, 0.0,      1.0  // col 3
      ))).toBe(true);
    });

    test('creates view matrix from sampled data a', () => {
      const eye = Vector3.of(0.0, 0.0, 0.0);
      const center = Vector3.of(-18.9, 0.0, 0.0);
      const up = Vector3.of(0.0, 0.0, 1.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      expect(matrix.approximates(Matrix4.of(
        0.0, 0.0, -1.0, 0.0, // col 0
        1.0, 0.0,  0.0, 0.0, // col 1
        0.0, 1.0,  0.0, 0.0, // col 2
        0.0, 0.0,  0.0, 1.0  // col 3
      ))).toBe(true);
    });

    test('creates view matrix from sampled data b', () => {
      const eye = Vector3.of(0.0, 0.0, 0.0);
      const center = Vector3.of(-8.28, -0.09, 0.81);
      const up = Vector3.of(0.0, 0.0, 1.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      /* eslint-disable */
      expect(matrix.approximates(Matrix4.of(
        -0.010868, 0.097349, -0.995190, 0.0, // col 0
         0.999940, 0.001058, -0.010817, 0.0, // col 1
         0.0,      0.995249,  0.097355, 0.0, // col 2
         0.0,      0.0,       0.0,      1.0  // col 3
      ))).toBe(true);
      /* eslint-enable */
    });

    test('creates view matrix from sampled data c', () => {
      const eye = Vector3.of(0.0, 0.0, 0.0);
      const center = Vector3.of(0.8591673374, 0.320672214, -0.3987491131);
      const up = Vector3.of(0.0, 0.0, 1.0);

      const matrix = new Matrix4().lookAt(eye, center, up);

      /* eslint-disable */
      expect(matrix.approximates(Matrix4.of(
         0.3496741652, 0.3735766112,  0.8591673374, 0.0, // col 0
        -0.9368713498, 0.1394322663,  0.3206722140, 0.0, // col 1
         0.0,          0.9170600771, -0.3987491130, 0.0, // col 2
         0.0,          0.0,           0.0,          1.0  // col 3
      ))).toBe(true);
      /* eslint-enable */
    });
  });

  describe('prototype.multiply()', () => {
    test('multiplies this matrix by given matrix', () => {
      const matrix1 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      const matrix2 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        4.0, 5.0, 6.0, 1.0  // col 3
      );

      matrix1.multiply(matrix2);

      expect(matrix1).toEqual(Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        5.0, 7.0, 9.0, 1.0  // col 3
      ));
    });

    test('multiplies this matrix by zero matrix', () => {
      const matrix1 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      const matrix2 = Matrix4.of(
        0.0, 0.0, 0.0, 0.0, // col 0
        0.0, 0.0, 0.0, 0.0, // col 1
        0.0, 0.0, 0.0, 0.0, // col 2
        0.0, 0.0, 0.0, 0.0  // col 3
      );

      matrix1.multiply(matrix2);

      expect(matrix1).toEqual(Matrix4.of(
        0.0, 0.0, 0.0, 0.0, // col 0
        0.0, 0.0, 0.0, 0.0, // col 1
        0.0, 0.0, 0.0, 0.0, // col 2
        0.0, 0.0, 0.0, 0.0  // col 3
      ));
    });

    test('multiplies this matrix by identity matrix', () => {
      const matrix1 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      );

      const matrix2 = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        0.0, 0.0, 0.0, 1.0  // col 3
      );

      matrix1.multiply(matrix2);

      expect(matrix1).toEqual(Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        1.0, 2.0, 3.0, 1.0  // col 3
      ));
    });
  });

  describe('prototype.projectPerspectiveDiagonal()', () => {
    test('creates projection matrix from sampled data a', () => {
      const matrix = new Matrix4();

      matrix.projectPerspectiveDiagonal(2.094395161, 1.777777791, 0.2222222239, 2777.777832);

      expect(matrix.approximates(Matrix4.of(
        0.997638464, 0.0,          0.0,          0.0, // col 0
        0.0,         1.773579478,  0.0,          0.0, // col 1
        0.0,         0.0,          1.000159979,  1.0, // col 2
        0.0,         0.0,         -0.4444800019, 0.0  // col 3
      ))).toBe(true);
    });

    test('creates projection matrix from sampled data b', () => {
      const matrix = new Matrix4();

      matrix.projectPerspectiveDiagonal(1.134464025, 1.777777791, 0.2222222239, 611.111145);

      expect(matrix.approximates(Matrix4.of(
        1.970299959, 0.0,          0.0,          0.0, // col 0
        0.0,         3.502755404,  0.0,          0.0, // col 1
        0.0,         0.0,          1.000727534,  1.0, // col 2
        0.0,         0.0,         -0.4446061254, 0.0  // col 3
      ))).toBe(true);
    });
  });

  describe('prototype.projectPerspective()', () => {
    test('creates projection matrix with 90 degree fov', () => {
      const matrix = new Matrix4();

      matrix.projectPerspective(90.0 * DEG2RAD, 1280.0 / 960.0, 1.0, 1000.0);

      expect(matrix.approximates(Matrix4.of(
        0.7499999404, 0.0,  0.0,         0.0, // col 0
        0.0,          1.0,  0.0,         0.0, // col 1
        0.0,          0.0,  1.002002001, 1.0, // col 2
        0.0,          0.0, -2.002002001, 0.0  // col 3
      ))).toBe(true);
    });

    test('creates projection matrix with 179.99 degree fov', () => {
      const matrix = new Matrix4();

      matrix.projectPerspective(179.99 * DEG2RAD, 1280.0 / 960.0, 1.0, 1000.0);

      expect(matrix.approximates(Matrix4.of(
        0.00006541310722, 0.0,             0.0,         0.0, // col 0
        0.0,              0.000087217486,  0.0,         0.0, // col 1
        0.0,              0.0,             1.002002001, 1.0, // col 2
        0.0,              0.0,            -2.002002001, 0.0  // col 3
      ))).toBe(true);
    });

    test('creates projection matrix with very close near depth', () => {
      const matrix = new Matrix4();

      matrix.projectPerspective(90.0 * DEG2RAD, 1920.0 / 1080.0, 0.001, 1000.0);

      expect(matrix.approximates(Matrix4.of(
        0.5625, 0.0,  0.0,           0.0, // col 0
        0.0,    1.0,  0.0,           0.0, // col 1
        0.0,    0.0,  1.000002027,   1.0, // col 2
        0.0,    0.0, -0.00200000219, 0.0  // col 3
      ))).toBe(true);
    });

    test('creates projection matrix with very close near and far depth', () => {
      const matrix = new Matrix4();

      matrix.projectPerspective(90.0 * DEG2RAD, 1920.0 / 1080.0, 0.001, 0.002);

      expect(matrix.approximates(Matrix4.of(
        0.5625, 0.0,  0.0,           0.0, // col 0
        0.0,    1.0,  0.0,           0.0, // col 1
        0.0,    0.0,  3.0,           1.0, // col 2
        0.0,    0.0, -0.00400000019, 0.0  // col 3
      ))).toBe(true);
    });

    test('creates projection matrix from sampled data a', () => {
      const matrix = new Matrix4();

      matrix.projectPerspective(1.256636977, 1.333333492, 0.2222222239, 2777.777832);

      expect(matrix.approximates(Matrix4.of(
        1.032286406, 0.0,          0.0,          0.0, // col 0
        0.0,         1.376381993,  0.0,          0.0, // col 1
        0.0,         0.0,          1.000159979,  1.0, // col 2
        0.0,         0.0,         -0.4444800019, 0.0  // col 3
      ))).toBe(true);
    });

    test('creates projection matrix from sampled data b', () => {
      const matrix = new Matrix4();

      matrix.projectPerspective(1.026800752, 1.777777791, 0.2222222239, 2777.777832);

      expect(matrix.approximates(Matrix4.of(
        0.997638464, 0.0,          0.0,          0.0, // col 0
        0.0,         1.773579478,  0.0,          0.0, // col 1
        0.0,         0.0,          1.000159979,  1.0, // col 2
        0.0,         0.0,         -0.4444800019, 0.0  // col 3
      ))).toBe(true);
    });
  });

  describe('prototype.scaleByNumber()', () => {
    test('scales this matrix by factor > 1.0', () => {
      /* eslint-disable */
      const matrix = Matrix4.of(
         0.0,  1.0,  2.0,  3.0, // col 0
         4.0,  5.0,  6.0,  7.0, // col 1
         8.0,  9.0, 10.0, 11.0, // col 2
        12.0, 13.0, 14.0, 15.0  // col 3
      );
      /* eslint-enable */

      matrix.scaleByNumber(1.5);

      /* eslint-disable */
      expect(matrix).toEqual(Matrix4.of(
         0.0,  1.5,  3.0,  3.0, // col 0
         6.0,  7.5,  9.0,  7.0, // col 1
        12.0, 13.5, 15.0, 11.0, // col 2
        12.0, 13.0, 14.0, 15.0  // col 3
      ));
      /* eslint-enable */
    });

    test('scales this matrix by factor > 0.0 and < 1.0', () => {
      /* eslint-disable */
      const matrix = Matrix4.of(
         0.0,  1.0,  2.0,  3.0, // col 0
         4.0,  5.0,  6.0,  7.0, // col 1
         8.0,  9.0, 10.0, 11.0, // col 2
        12.0, 13.0, 14.0, 15.0  // col 3
      );
      /* eslint-enable */

      matrix.scaleByNumber(0.5);

      /* eslint-disable */
      expect(matrix).toEqual(Matrix4.of(
         0.0,  0.5,  1.0,  3.0, // col 0
         2.0,  2.5,  3.0,  7.0, // col 1
         4.0,  4.5,  5.0, 11.0, // col 2
        12.0, 13.0, 14.0, 15.0  // col 3
      ));
      /* eslint-enable */
    });

    test('scales this matrix by factor < 0.0', () => {
      /* eslint-disable */
      const matrix = Matrix4.of(
         0.0,  1.0,  2.0,  3.0, // col 0
         4.0,  5.0,  6.0,  7.0, // col 1
         8.0,  9.0, 10.0, 11.0, // col 2
        12.0, 13.0, 14.0, 15.0  // col 3
      );
      /* eslint-enable */

      matrix.scaleByNumber(-0.5);

      /* eslint-disable */
      expect(matrix).toEqual(Matrix4.of(
        -0.0, -0.5, -1.0,  3.0, // col 0
        -2.0, -2.5, -3.0,  7.0, // col 1
        -4.0, -4.5, -5.0, 11.0, // col 2
        12.0, 13.0, 14.0, 15.0  // col 3
      ));
      /* eslint-enable */
    });
  });

  describe('prototype.transpose()', () => {
    test('transposes this matrix', () => {
      /* eslint-disable */
      const matrix = Matrix4.of(
         0.0,  1.0,  2.0,  3.0, // col 0
         4.0,  5.0,  6.0,  7.0, // col 1
         8.0,  9.0, 10.0, 11.0, // col 2
        12.0, 13.0, 14.0, 15.0  // col 3
      );
      /* eslint-enable */

      matrix.transpose();

      expect(matrix).toEqual(Matrix4.of(
        0.0, 4.0,  8.0, 12.0, // col 0
        1.0, 5.0,  9.0, 13.0, // col 1
        2.0, 6.0, 10.0, 14.0, // col 2
        3.0, 7.0, 11.0, 15.0  // col 3
      ));
    });

    test('transposes identity matrix', () => {
      const matrix = Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        0.0, 0.0, 0.0, 1.0  // col 3
      );

      matrix.transpose();

      expect(matrix).toEqual(Matrix4.of(
        1.0, 0.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, 0.0, // col 1
        0.0, 0.0, 1.0, 0.0, // col 2
        0.0, 0.0, 0.0, 1.0  // col 3
      ));
    });

    test('transposes zero matrix', () => {
      const matrix = Matrix4.of(
        0.0, 0.0, 0.0, 0.0, // col 0
        0.0, 0.0, 0.0, 0.0, // col 1
        0.0, 0.0, 0.0, 0.0, // col 2
        0.0, 0.0, 0.0, 0.0  // col 3
      );

      matrix.transpose();

      expect(matrix).toEqual(Matrix4.of(
        0.0, 0.0, 0.0, 0.0, // col 0
        0.0, 0.0, 0.0, 0.0, // col 1
        0.0, 0.0, 0.0, 0.0, // col 2
        0.0, 0.0, 0.0, 0.0  // col 3
      ));
    });
  });

  describe('of()', () => {
    test('returns new matrix matching given values', () => {
      const matrix = Matrix4.of(
        1.0, 2.0, 3.0, 4.0, // col 0
        4.0, 3.0, 2.0, 1.0, // col 1
        1.0, 2.0, 3.0, 4.0, // col 2
        4.0, 3.0, 2.0, 1.0  // col 3
      );

      expect(matrix).toEqual(new Matrix4([
        1.0, 2.0, 3.0, 4.0, // col 0
        4.0, 3.0, 2.0, 1.0, // col 1
        1.0, 2.0, 3.0, 4.0, // col 2
        4.0, 3.0, 2.0, 1.0  // col 3
      ]));
    });

    test('returns new default matrix when not given values', () => {
      const matrix = Matrix4.of();

      expect(matrix).toEqual(new Matrix4(Matrix4.DEFAULT));
    });
  });
});
