import { Matrix4 } from '../lib';

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
