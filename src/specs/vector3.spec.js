import { Vector3 } from '../lib';

describe('Vector3', () => {

  describe('#constructor', () => {

    test('returns new vector with expected type', () => {

      const vector = new Vector3();

      expect(vector).toBeInstanceOf(Vector3);
      expect(vector).toBeInstanceOf(Float32Array);

    });

    test('returns new vector with default values', () => {

      const vector = new Vector3();

      expect(vector.equals(Vector3.DEFAULT)).toBe(true);

    });

  });

  describe('#of', () => {

    test('returns new vector matching given values', () => {

      const vector = Vector3.of(1.0, 2.0, 3.0);

      expect(vector.equals([1.0, 2.0, 3.0])).toBe(true);

    });

    test('returns new default vector when not given values', () => {

      const vector = Vector3.of();

      expect(vector.equals(Vector3.DEFAULT)).toBe(true);

    });

  });

  describe('#majorAxis', () => {

    test('returns x axis when x is major', () => {

      const vector = Vector3.of(3.0, 2.0, 1.0);

      const axis = vector.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS.X);

    });

    test('returns y axis when y is major', () => {

      const vector = Vector3.of(1.0, 3.0, 2.0);

      const axis = vector.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS.Y);

    });

    test('returns z axis when z is major', () => {

      const vector = Vector3.of(1.0, 2.0, 3.0);

      const axis = vector.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS.Z);

    });

    test('returns z axis when x and z are major and equal', () => {

      const vector = Vector3.of(2.0, 1.0, 2.0);

      const axis = vector.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS.Z);

    });

    test('returns y axis when x and y are major and equal', () => {

      const vector = Vector3.of(2.0, 2.0, 1.0);

      const axis = vector.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS.Y);

    });

    test('returns z axis when y and z are major and equal', () => {

      const vector = Vector3.of(1.0, 2.0, 2.0);

      const axis = vector.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS.Z);

    });

    test('returns z axis when all axes are equal', () => {

      const vector = Vector3.of(1.0, 1.0, 1.0);

      const axis = vector.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS.Z);

    });

  });

});
