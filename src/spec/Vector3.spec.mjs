import { Matrix4, Vector3 } from '../lib';

describe('Vector3', () => {
  describe('prototype.constructor()', () => {
    test('returns new vector with expected type', () => {
      const vector = new Vector3();

      expect(vector).toBeInstanceOf(Vector3);
      expect(vector).toBeInstanceOf(Float32Array);
    });

    test('returns new vector with default values', () => {
      const vector = new Vector3();

      expect(vector).toEqual(new Vector3(Vector3.DEFAULT));
    });
  });

  describe('prototype.x', () => {
    test('gets x component', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      expect(vector.x).toEqual(1.0);
    });

    test('sets x component', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      vector.x = 4.0;

      expect(vector.x).toEqual(4.0);
    });
  });

  describe('prototype.y', () => {
    test('gets y component', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      expect(vector.y).toEqual(2.0);
    });

    test('sets y component', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      vector.y = 4.0;

      expect(vector.y).toEqual(4.0);
    });
  });

  describe('prototype.z', () => {
    test('gets z component', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      expect(vector.z).toEqual(3.0);
    });

    test('sets z component', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      vector.z = 4.0;

      expect(vector.z).toEqual(4.0);
    });
  });

  describe('prototype.add()', () => {
    test('returns expected result when adding positive vector', () => {
      const vector1 = Vector3.of(1.0, 2.0, 3.0);
      const vector2 = Vector3.of(4.0, 5.0, 6.0);

      expect(vector1.add(vector2)).toEqual(Vector3.of(5.0, 7.0, 9.0));
    });

    test('returns expected result when adding negative vector', () => {
      const vector1 = Vector3.of(1.0, 2.0, 3.0);
      const vector2 = Vector3.of(-2.0, -3.0, -4.0);

      expect(vector1.add(vector2)).toEqual(Vector3.of(-1.0, -1.0, -1.0));
    });
  });

  describe('prototype.addScalar()', () => {
    test('returns expected result when adding positive scalar', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);
      const scalar = 4.0;

      expect(vector.addScalar(scalar)).toEqual(Vector3.of(5.0, 6.0, 7.0));
    });

    test('returns expected result when adding negative scalar', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);
      const scalar = -3.0;

      expect(vector.addScalar(scalar)).toEqual(Vector3.of(-2.0, -1.0, 0.0));
    });
  });

  describe('prototype.approximates()', () => {
    test('returns true when vectors are approximately equal', () => {
      const vector1 = Vector3.of(0.0, 0.0, 1.0);
      const vector2 = Vector3.of(0.0, 0.0, 1.000001);

      expect(vector1.approximates(vector2)).toBe(true);
    });

    test('returns true when vectors are exactly equal', () => {
      const vector1 = Vector3.of(0.0, 0.0, 1.0);
      const vector2 = Vector3.of(0.0, 0.0, 1.0);

      expect(vector1.approximates(vector2)).toBe(true);
    });

    test('returns false when vectors are not equal', () => {
      const vector1 = Vector3.of(0.0, 0.0, 1.0);
      const vector2 = Vector3.of(0.0, 0.0, 2.0);

      expect(vector1.approximates(vector2)).toBe(false);
    });
  });

  describe('prototype.distance()', () => {
    test('returns correct distance between two vectors', () => {
      const vector1 = Vector3.of(1.0, 2.0, 3.0);
      const vector2 = Vector3.of(4.0, 5.0, 6.0);

      expect(vector1.distance(vector2)).toBeCloseTo(5.196152);
      expect(vector2.distance(vector1)).toBeCloseTo(5.196152);
    });

    test('returns correct distance between two zero vectors', () => {
      const vector1 = Vector3.of(0.0, 0.0, 0.0);
      const vector2 = Vector3.of(0.0, 0.0, 0.0);

      expect(vector1.distance(vector2)).toBe(0.0);
      expect(vector2.distance(vector1)).toBe(0.0);
    });
  });

  describe('prototype.equals()', () => {
    test('returns true when vectors are exactly equal', () => {
      const vector1 = Vector3.of(1.0, 2.0, 3.0);
      const vector2 = Vector3.of(1.0, 2.0, 3.0);

      expect(vector1.equals(vector2)).toBe(true);
    });

    test('returns false when vectors are nearly equal', () => {
      const vector1 = Vector3.of(1.000001, 2.0, 3.0);
      const vector2 = Vector3.of(1.000002, 2.0, 3.0);

      expect(vector1.equals(vector2)).toBe(false);
    });

    test('returns false when vectors are not equal', () => {
      const vector1 = Vector3.of(3.0, 4.0, 5.0);
      const vector2 = Vector3.of(1.0, 2.0, 3.0);

      expect(vector1.equals(vector2)).toBe(false);
    });
  });

  describe('prototype.magnitude()', () => {
    test('returns magnitude of positive vector', () => {
      const vector = Vector3.of(5.0, 0.0, 0.0);
      const magnitude = vector.magnitude();

      expect(magnitude).toBeCloseTo(5.0);
    });

    test('returns magnitude of negative vector', () => {
      const vector = Vector3.of(-0.5, 0.0, 0.0);
      const magnitude = vector.magnitude();

      expect(magnitude).toBeCloseTo(0.5);
    });

    test('returns magnitude of zero vector', () => {
      const vector = Vector3.of(0.0, 0.0, 0.0);
      const magnitude = vector.magnitude();

      expect(magnitude).toEqual(0.0);
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

  describe('prototype.multiply()', () => {
    test('returns expected result when multiplying by positive vector', () => {
      const vector1 = Vector3.of(1.0, 2.0, 3.0);
      const vector2 = Vector3.of(4.0, 5.0, 6.0);

      expect(vector1.multiply(vector2)).toEqual(Vector3.of(4.0, 10.0, 18.0));
    });

    test('returns expected result when multiplying by negative vector', () => {
      const vector1 = Vector3.of(1.0, 2.0, 3.0);
      const vector2 = Vector3.of(-2.0, -3.0, -4.0);

      expect(vector1.multiply(vector2)).toEqual(Vector3.of(-2.0, -6.0, -12.0));
    });
  });

  describe('prototype.multiplyMatrix4()', () => {
    test('returns expected result when multiplying by identity matrix', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);
      const matrix = new Matrix4();

      expect(vector.multiplyMatrix4(matrix)).toEqual(Vector3.of(1.0, 2.0, 3.0));
    });

    test('returns expected result when multiplying by given matrix', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      const matrix = Matrix4.of(
        3.0, 2.0, 1.0, 0.0, // col 0
        3.1, 2.1, 1.1, 0.1, // col 1
        3.2, 2.2, 1.2, 0.2, // col 2
        3.3, 2.3, 1.3, 0.3  // col 3
      );

      vector.multiplyMatrix4(matrix);

      expect(vector.approximates(Vector3.of(20.09091, 13.72727, 7.36364))).toBe(true);
    });
  });

  describe('prototype.multiplyScalar()', () => {
    test('returns expected result when multiplying by positive scalar', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);
      const scalar = 4.0;

      expect(vector.multiplyScalar(scalar)).toEqual(Vector3.of(4.0, 8.0, 12.0));
    });

    test('returns expected result when multiplying by negative scalar', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);
      const scalar = -3.0;

      expect(vector.multiplyScalar(scalar)).toEqual(Vector3.of(-3.0, -6.0, -9.0));
    });
  });

  describe('prototype.normalize()', () => {
    test('normalizes vectors', () => {
      const vector1 = Vector3.of(5.0, 0.0, 0.0);
      vector1.normalize();

      const vector2 = Vector3.of(0.5, 0.5, 0.5);
      vector2.normalize();

      const vector3 = Vector3.of(-0.5, -0.5, -0.5);
      vector3.normalize();

      expect(vector1.magnitude()).toBeCloseTo(1);
      expect(vector2.magnitude()).toBeCloseTo(1);
      expect(vector3.magnitude()).toBeCloseTo(1);
    });

    test('normalizes already normal vectors', () => {
      const vector1 = Vector3.of(1.0, 0.0, 0.0);
      vector1.normalize();

      const vector2 = Vector3.of(0.0, 0.0, 1.0);
      vector2.normalize();

      expect(vector1.magnitude()).toBeCloseTo(1);
      expect(vector2.magnitude()).toBeCloseTo(1);
    });

    test('does not normalize zero vector', () => {
      const vector = Vector3.of(0.0, 0.0, 0.0);
      vector.normalize();

      expect(vector.magnitude()).toEqual(0.0);
    });
  });

  describe('prototype.setElements()', () => {
    test('sets elements in this vector', () => {
      const vector = Vector3.of(7.0, 8.0, 9.0);

      vector.setElements(1.0, 2.0, 3.0);

      expect(vector).toEqual(Vector3.of(1.0, 2.0, 3.0));
    });
  });

  describe('prototype.sub()', () => {
    test('returns expected result when subtracting positive vector', () => {
      const vector1 = Vector3.of(7.0, 8.0, 9.0);
      const vector2 = Vector3.of(1.0, 2.0, 3.0);

      expect(vector1.sub(vector2)).toEqual(Vector3.of(6.0, 6.0, 6.0));
    });

    test('returns expected result when subtracting negative vector', () => {
      const vector1 = Vector3.of(1.0, 2.0, 3.0);
      const vector2 = Vector3.of(-2.0, -3.0, -4.0);

      expect(vector1.sub(vector2)).toEqual(Vector3.of(3.0, 5.0, 7.0));
    });
  });

  describe('prototype.subScalar()', () => {
    test('returns expected result when subtracting positive scalar', () => {
      const vector = Vector3.of(7.0, 8.0, 9.0);
      const scalar = 4.0;

      expect(vector.subScalar(scalar)).toEqual(Vector3.of(3.0, 4.0, 5.0));
    });

    test('returns expected result when subtracting negative scalar', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);
      const scalar = -3.0;

      expect(vector.subScalar(scalar)).toEqual(Vector3.of(4.0, 5.0, 6.0));
    });
  });

  describe('forEach()', () => {
    test('iterates over array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
      const indices = [];

      Vector3.forEach(arr, function (v, i) {
        indices.push(i);
      });

      expect(indices).toEqual([0, 1]);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);

      Vector3.forEach(arr, function (v) {
        v[0] = 0.0;
      });

      expect(arr).toEqual(new Float32Array([0.0, 2.0, 3.0, 0.0, 5.0, 6.0]));
    });
  });

  describe('keys()', () => {
    test('returns vector iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0]);
      const iterator = Vector3.keys(arr);

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as vector indices', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
      const indices = [];

      for (const k of Vector3.keys(arr)) {
        indices.push(k);
      }

      expect(indices).toEqual([0, 1]);
    });
  });

  describe('of()', () => {
    test('returns new vector matching given values', () => {
      const vector = Vector3.of(1.0, 2.0, 3.0);

      expect(vector).toEqual(new Vector3([1.0, 2.0, 3.0]));
    });

    test('returns new default vector when not given values', () => {
      const vector = Vector3.of();

      expect(vector).toEqual(new Vector3(Vector3.DEFAULT));
    });
  });

  describe('values()', () => {
    test('returns vector iterator', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0]);
      const iterator = Vector3.values(arr);

      expect(iterator.next).toBeInstanceOf(Function);
    });

    test('iterates over array as vectors', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
      const vectors = [];

      for (const v of Vector3.values(arr)) {
        vectors.push(new Vector3(v));
      }

      expect(vectors).toEqual([new Vector3([1.0, 2.0, 3.0]), new Vector3([4.0, 5.0, 6.0])]);
    });

    test('permits manipulation of array', () => {
      const arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);

      for (const v of Vector3.values(arr)) {
        v.addScalar(2.0);
      }

      expect(arr).toEqual(new Float32Array([3.0, 4.0, 5.0, 6.0, 7.0, 8.0]));
    });
  });
});
