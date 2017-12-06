import { Plane } from '../lib';

describe('Plane', () => {
  describe('prototype.constructor()', () => {
    test('returns new plane with expected type', () => {
      const plane = new Plane();

      expect(plane).toBeInstanceOf(Plane);
      expect(plane).toBeInstanceOf(Float32Array);
    });

    test('returns new plane with default values', () => {
      const plane = new Plane();

      expect(plane).toEqual(new Plane(Plane.DEFAULT));
    });
  });

  describe('prototype.approximates()', () => {
    test('returns true when planes are approximately equal', () => {
      const plane1 = Plane.of(0.0, 0.0, 1.0, 1.0);
      const plane2 = Plane.of(0.0, 0.0, 1.0, 1.000001);

      expect(plane1.approximates(plane2)).toBe(true);
    });

    test('returns true when planes are exactly equal', () => {
      const plane1 = Plane.of(0.0, 0.0, 1.0, 1.0);
      const plane2 = Plane.of(0.0, 0.0, 1.0, 1.0);

      expect(plane1.approximates(plane2)).toBe(true);
    });

    test('returns false when planes are not equal', () => {
      const plane1 = Plane.of(0.0, 0.0, 1.0, 1.0);
      const plane2 = Plane.of(0.0, 0.0, 1.0, 2.0);

      expect(plane1.approximates(plane2)).toBe(false);
    });
  });

  describe('prototype.equals()', () => {
    test('returns true when planes are exactly equal', () => {
      const plane1 = Plane.of(1.0, 2.0, 3.0, 4.0);
      const plane2 = Plane.of(1.0, 2.0, 3.0, 4.0);

      expect(plane1.equals(plane2)).toBe(true);
    });

    test('returns false when planes are nearly equal', () => {
      const plane1 = Plane.of(1.000001, 2.0, 3.0, 4.0);
      const plane2 = Plane.of(1.000002, 2.0, 3.0, 4.0);

      expect(plane1.equals(plane2)).toBe(false);
    });

    test('returns false when planes are not equal', () => {
      const plane1 = Plane.of(5.0, 6.0, 7.0, 8.0);
      const plane2 = Plane.of(1.0, 2.0, 3.0, 4.0);

      expect(plane1.equals(plane2)).toBe(false);
    });
  });

  describe('forEach()', () => {
    test('iterates over array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
      const indices = [];

      Plane.forEach(arr, function(p, i) {
        indices.push(i);
      });

      expect(indices).toEqual([0, 1]);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);

      Plane.forEach(arr, function(p) {
        p[0] = 0.0;
      });

      expect(arr).toEqual(new Float32Array([0.0, 2.0, 3.0, 4.0, 0.0, 6.0, 7.0, 8.0]));
    });
  });

  describe('keys()', () => {
    test('returns plane iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0]);
      const iterator = Plane.keys(arr);

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as plane indices', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
      const indices = [];

      for (const k of Plane.keys(arr)) {
        indices.push(k);
      }

      expect(indices).toEqual([0, 1]);
    });
  });

  describe('of()', () => {
    test('returns new plane matching given values', () => {
      const plane = Plane.of(1.0, 2.0, 3.0, 4.0);

      expect(plane).toEqual(new Plane([1.0, 2.0, 3.0, 4.0]));
    });

    test('returns new default plane when not given values', () => {
      const plane = Plane.of();

      expect(plane).toEqual(new Plane(Plane.DEFAULT));
    });
  });

  describe('values()', () => {
    test('returns plane iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0]);
      const iterator = Plane.values(arr);

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as planes', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
      const planes = [];

      for (const p of Plane.values(arr)) {
        planes.push(new Plane(p));
      }

      expect(planes).toEqual([
        new Plane([1.0, 2.0, 3.0, 4.0]),
        new Plane([5.0, 6.0, 7.0, 8.0])
      ]);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);

      for (const p of Plane.values(arr)) {
        p[1] = 0.0;
      }

      expect(arr).toEqual(new Float32Array([1.0, 0.0, 3.0, 4.0, 5.0, 0.0, 7.0, 8.0]));
    });
  });
});
