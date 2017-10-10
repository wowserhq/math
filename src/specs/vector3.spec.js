import { Vector3 } from '../lib';

describe('Vector3', () => {

  describe('#create', () => {

    test('returns new vector with expected type', () => {

      const vector = Vector3.create();

      expect(vector).toBeInstanceOf(Float32Array);

    });

    test('returns new vector with default values', () => {

      const vector = Vector3.create();

      expect(vector).toEqual(Vector3.DEFAULT);

    });

  });

  describe('#fromValues', () => {

    test('returns new vector matching given values', () => {

      const vector = Vector3.fromValues(1.0, 2.0, 3.0);

      expect(vector).toEqual(new Float32Array([1.0, 2.0, 3.0]));

    });

    test('returns new vector matching undefined values', () => {

      const vector = Vector3.fromValues();

      expect(vector).toEqual(new Float32Array([NaN, NaN, NaN]));

    });

  });

  describe('#majorAxis', () => {

    test('returns x axis when x is major', () => {

      const vector = Vector3.fromValues(3.0, 2.0, 1.0);

      const axis = Vector3.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS_X);

    });

    test('returns y axis when y is major', () => {

      const vector = Vector3.fromValues(1.0, 3.0, 2.0);

      const axis = Vector3.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS_Y);

    });

    test('returns z axis when z is major', () => {

      const vector = Vector3.fromValues(1.0, 2.0, 3.0);

      const axis = Vector3.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS_Z);

    });

    test('returns z axis when x and z are major and equal', () => {

      const vector = Vector3.fromValues(2.0, 1.0, 2.0);

      const axis = Vector3.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS_Z);

    });

    test('returns y axis when x and y are major and equal', () => {

      const vector = Vector3.fromValues(2.0, 2.0, 1.0);

      const axis = Vector3.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS_Y);

    });

    test('returns z axis when y and z are major and equal', () => {

      const vector = Vector3.fromValues(1.0, 2.0, 2.0);

      const axis = Vector3.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS_Z);

    });

    test('returns z axis when all axes are equal', () => {

      const vector = Vector3.fromValues(1.0, 1.0, 1.0);

      const axis = Vector3.majorAxis(vector);

      expect(axis).toEqual(Vector3.AXIS_Z);

    });

  });

});
