import { Quaternion } from '../lib';

describe('Quaternion', () => {
  describe('prototype.constructor()', () => {
    test('returns new quaternion with expected type', () => {
      const quaternion = new Quaternion();

      expect(quaternion).toBeInstanceOf(Quaternion);
      expect(quaternion).toBeInstanceOf(Float32Array);
    });

    test('returns new quaternion with default values', () => {
      const quaternion = new Quaternion();

      expect(quaternion).toEqual(new Quaternion(Quaternion.DEFAULT));
    });
  });

  describe('prototype.approximates()', () => {
    test('returns true when quaternions are approximately equal', () => {
      const quaternion1 = Quaternion.of(0.0, 0.0, 0.0, 1.0);
      const quaternion2 = Quaternion.of(0.0, 0.0, 0.0, 1.000001);

      expect(quaternion1.approximates(quaternion2)).toBe(true);
    });

    test('returns true when quaternions are exactly equal', () => {
      const quaternion1 = Quaternion.of(0.0, 0.0, 0.0, 1.0);
      const quaternion2 = Quaternion.of(0.0, 0.0, 0.0, 1.0);

      expect(quaternion1.approximates(quaternion2)).toBe(true);
    });

    test('returns false when quaternions are not equal', () => {
      const quaternion1 = Quaternion.of(0.0, 0.0, 0.0, 1.0);
      const quaternion2 = Quaternion.of(0.0, 0.0, 0.0, 2.0);

      expect(quaternion1.approximates(quaternion2)).toBe(false);
    });
  });

  describe('prototype.equals()', () => {
    test('returns true when quaternions are exactly equal', () => {
      const quaternion1 = Quaternion.of(1.0, 2.0, 3.0, 4.0);
      const quaternion2 = Quaternion.of(1.0, 2.0, 3.0, 4.0);

      expect(quaternion1.equals(quaternion2)).toBe(true);
    });

    test('returns false when quaternions are nearly equal', () => {
      const quaternion1 = Quaternion.of(1.000001, 2.0, 3.0, 4.0);
      const quaternion2 = Quaternion.of(1.000002, 2.0, 3.0, 4.0);

      expect(quaternion1.equals(quaternion2)).toBe(false);
    });

    test('returns false when quaternions are not equal', () => {
      const quaternion1 = Quaternion.of(5.0, 6.0, 7.0, 8.0);
      const quaternion2 = Quaternion.of(1.0, 2.0, 3.0, 4.0);

      expect(quaternion1.equals(quaternion2)).toBe(false);
    });
  });

  describe('prototype.magnitude()', () => {
    test('returns magnitude of positive quaternion', () => {
      const quaternion = Quaternion.of(5.0, 0.0, 0.0, 0.0);
      const magnitude = quaternion.magnitude();

      expect(magnitude).toBeCloseTo(5.0);
    });

    test('returns magnitude of negative quaternion', () => {
      const quaternion = Quaternion.of(-0.5, 0.0, 0.0, 0.0);
      const magnitude = quaternion.magnitude();

      expect(magnitude).toBeCloseTo(0.5);
    });

    test('returns magnitude of zero quaternion', () => {
      const quaternion = Quaternion.of(0.0, 0.0, 0.0, 0.0);
      const magnitude = quaternion.magnitude();

      expect(magnitude).toEqual(0.0);
    });
  });

  describe('prototype.normalize()', () => {
    test('normalizes quaternions', () => {
      const quaternion1 = Quaternion.of(5.0, 0.0, 0.0, 0.0);
      quaternion1.normalize();

      const quaternion2 = Quaternion.of(0.5, 0.5, 0.5, 0.5);
      quaternion2.normalize();

      const quaternion3 = Quaternion.of(-0.5, -0.5, -0.5, -0.5);
      quaternion3.normalize();

      expect(quaternion1.magnitude()).toBeCloseTo(1);
      expect(quaternion2.magnitude()).toBeCloseTo(1);
      expect(quaternion3.magnitude()).toBeCloseTo(1);
    });

    test('normalizes already normal quaternions', () => {
      const quaternion1 = Quaternion.of(1.0, 0.0, 0.0, 0.0);
      quaternion1.normalize();

      const quaternion2 = Quaternion.of(0.0, 0.0, 0.0, 1.0);
      quaternion2.normalize();

      expect(quaternion1.magnitude()).toBeCloseTo(1);
      expect(quaternion2.magnitude()).toBeCloseTo(1);
    });

    test('does not normalize zero quaternion', () => {
      const quaternion = Quaternion.of(0.0, 0.0, 0.0, 0.0);
      quaternion.normalize();

      expect(quaternion.magnitude()).toEqual(0.0);
    });
  });

  describe('forEach()', () => {
    test('iterates over array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
      const indices = [];

      Quaternion.forEach(arr, function(q, i) {
        indices.push(i);
      });

      expect(indices).toEqual([0, 1]);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);

      Quaternion.forEach(arr, function(q) {
        q[0] = 0.0;
      });

      expect(arr).toEqual(new Float32Array([0.0, 2.0, 3.0, 4.0, 0.0, 6.0, 7.0, 8.0]));
    });
  });

  describe('keys()', () => {
    test('returns quaternion iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0]);
      const iterator = Quaternion.keys(arr);

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as quaternion indices', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
      const indices = [];

      for (const k of Quaternion.keys(arr)) {
        indices.push(k);
      }

      expect(indices).toEqual([0, 1]);
    });
  });

  describe('of()', () => {
    test('returns new quaternion matching given values', () => {
      const quaternion = Quaternion.of(1.0, 2.0, 3.0, 4.0);

      expect(quaternion).toEqual(new Quaternion([1.0, 2.0, 3.0, 4.0]));
    });

    test('returns new default quaternion when not given values', () => {
      const quaternion = Quaternion.of();

      expect(quaternion).toEqual(new Quaternion(Quaternion.DEFAULT));
    });
  });

  describe('values()', () => {
    test('returns quaternion iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0]);
      const iterator = Quaternion.values(arr);

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as quaternions', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
      const quaternions = [];

      for (const q of Quaternion.values(arr)) {
        quaternions.push(new Quaternion(q));
      }

      expect(quaternions).toEqual([
        new Quaternion([1.0, 2.0, 3.0, 4.0]),
        new Quaternion([5.0, 6.0, 7.0, 8.0])
      ]);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);

      for (const q of Quaternion.values(arr)) {
        q[1] = 0.0;
      }

      expect(arr).toEqual(new Float32Array([1.0, 0.0, 3.0, 4.0, 5.0, 0.0, 7.0, 8.0]));
    });
  });
});
