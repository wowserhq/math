import { Plane } from '../lib';

describe('Plane', () => {

  describe('#copy', () => {

    test('returns new plane matching original', () => {

      const src = Plane.fromValues(-4, 16, 4, -8);
      const dst = Plane.create();

      Plane.copy(dst, src);

      expect(dst).toEqual(src);

    });

  });

  describe('#create', () => {

    test('returns new plane with expected type', () => {

      const plane = Plane.create();

      expect(plane).toBeInstanceOf(Float32Array);

    });

    test('returns new plane with default values', () => {

      const plane = Plane.create();

      expect(plane).toEqual(Plane.DEFAULT);

    });

  });

  describe('#fromValues', () => {

    test('returns new plane matching given values', () => {

      const plane = Plane.fromValues(-4, 16, 4, -8);

      expect(plane).toEqual(new Float32Array([-4, 16, 4, -8]));

    });

  });

});
