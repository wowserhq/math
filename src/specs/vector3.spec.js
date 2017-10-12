import { Vector3 } from '../lib';

describe('Vector3', () => {
  describe('prototype.constructor()', () => {
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

  describe('prototype.majorAxis()', () => {
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

  describe('forEach()', () => {
    test('iterates over array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
      let last;

      Vector3.forEach(arr, function(v, i) {
        last = i;
      });

      expect(last).toBe(1);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);

      Vector3.forEach(arr, function(v, i) {
        v[0] = 0.0;

        arr.set(v, i * 3);
      });

      expect(arr[0]).toBe(0.0);
      expect(arr[3]).toBe(0.0);
    });
  });

  describe('keys()', () => {
    test('returns vector iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0]);
      const iterator = Vector3.keys();

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as vector indices', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
      let last;

      for (const k of Vector3.keys(arr)) {
        last = k;
      }

      expect(last).toBe(1);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
      const v = new Vector3();

      for (const k of Vector3.keys(arr)) {
        v[0] = arr[k * 3];
        v[1] = arr[k * 3 + 1];
        v[2] = arr[k * 3 + 2];

        v[1] *= 2.0;

        arr.set(v, k * 3);
      }

      expect(arr[1]).toBe(4.0);
      expect(arr[4]).toBe(10.0);
    });
  });

  describe('of()', () => {
    test('returns new vector matching given values', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      expect(vector.equals([1.0, 2.0, 3.0])).toBe(true);
    });

    test('returns new default vector when not given values', () => {
      const vector = Vector3.of();

      expect(vector.equals(Vector3.DEFAULT)).toBe(true);
    });
  });

  describe('values()', () => {
    test('returns vector iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0]);
      const iterator = Vector3.values();

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as vectors', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
      let last;

      for (const v of Vector3.values(arr)) {
        last = v;
      }

      expect(last.equals([4.0, 5.0, 6.0])).toBe(true);
    });
  });
});
