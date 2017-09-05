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

});
