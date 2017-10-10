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

});
