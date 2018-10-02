import { Matrix3 } from '../lib';

describe('Matrix3', () => {
  describe('prototype.constructor()', () => {
    test('returns new matrix with expected type', () => {
      const matrix = new Matrix3();

      expect(matrix).toBeInstanceOf(Matrix3);
      expect(matrix).toBeInstanceOf(Float32Array);
    });

    test('returns new matrix with default values', () => {
      const matrix = new Matrix3();

      expect(matrix).toEqual(new Matrix3(Matrix3.DEFAULT));
    });
  });

  describe('prototype.approximates()', () => {
    test('returns true when matrices are approximately equal', () => {
      const matrix1 = Matrix3.of(
        1.0, 2.0, 3.0, // col 0
        4.0, 5.0, 6.0, // col 1
        7.0, 8.0, 9.0  // col 2
      );

      const matrix2 = Matrix3.of(
        1.000001, 2.0, 3.0, // col 0
        4.0,      5.0, 6.0, // col 1
        7.0,      8.0, 9.0  // col 2
      );

      expect(matrix1.approximates(matrix2)).toBe(true);
    });

    test('returns true when matrices are exactly equal', () => {
      const matrix1 = Matrix3.of(
        1.0, 2.0, 3.0, // col 0
        4.0, 5.0, 6.0, // col 1
        7.0, 8.0, 9.0  // col 2
      );

      const matrix2 = Matrix3.of(
        1.0, 2.0, 3.0, // col 0
        4.0, 5.0, 6.0, // col 1
        7.0, 8.0, 9.0  // col 2
      );

      expect(matrix1.approximates(matrix2)).toBe(true);
    });

    test('returns false when matrices are not equal', () => {
      const matrix1 = Matrix3.of(
        1.0, 2.0, 3.0, // col 0
        4.0, 5.0, 6.0, // col 1
        7.0, 8.0, 9.0  // col 2
      );

      const matrix2 = Matrix3.of(
        0.0, 2.0, 3.0, // col 0
        4.0, 5.0, 6.0, // col 1
        7.0, 8.0, 9.0  // col 2
      );

      expect(matrix1.approximates(matrix2)).toBe(false);
    });
  });

  describe('prototype.fromEulerAnglesZYX()', () => {
    test('calculates orientation matrix matching given angles', () => {
      const matrix = new Matrix3().fromEulerAnglesZYX(1.04719, 1.04719, 1.04719);

      /* eslint-disable indent */
      expect(matrix.approximates(Matrix3.of(
         0.25000656,  0.43301651, -0.86602163, // col 0
        -0.05801485,  0.89951712,  0.43301651, // col 1
         0.96650457, -0.05801482,  0.25000656  // col 2
      ))).toBe(true);
      /* eslint-enable indent */
    });
  });

  describe('prototype.multiply()', () => {
    test('multiplies this matrix by given matrix', () => {
      const matrix1 = Matrix3.of(
        1.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, // col 1
        1.0, 2.0, 1.0  // col 2
      );

      const matrix2 = Matrix3.of(
        1.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, // col 1
        4.0, 5.0, 1.0  // col 2
      );

      matrix1.multiply(matrix2);

      expect(matrix1).toEqual(Matrix3.of(
        1.0, 0.0, 0.0, // col 0
        0.0, 1.0, 0.0, // col 1
        5.0, 7.0, 1.0  // col 2
      ));
    });
  });
});
