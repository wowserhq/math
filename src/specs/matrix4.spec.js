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

  describe('prototype.perspective()', () => {
    test('creates perspective projection', () => {
      const matrix = new Matrix4();

      matrix.perspective(45.0 * DEG2RAD, 1920.0 / 1080.0, 0.1, 1000.0);

      expect(matrix.approximates(Matrix4.of(
        1.35799, 0.0,      0.0,      0.0, // col 0
        0.0,     2.41421,  0.0,      0.0, // col 1
        0.0,     0.0,     -1.00020, -1.0, // col 2
        0.0,     0.0,     -0.20002,  0.0  // col 3
      ))).toBe(true);
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
