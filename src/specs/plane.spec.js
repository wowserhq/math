import { Plane } from '../lib';

describe('Plane', () => {

  test('new plane should contain default values', () => {

    const plane = Plane.create();

    expect(plane).toEqual(Plane.DEFAULT);

  });

  test('fromValues should create new plane matching given values', () => {

    const plane = Plane.fromValues(-4, 16, 4, -8);

    expect(plane).toEqual(new Float32Array([-4, 16, 4, -8]));

  });

  test('copied plane should match original', () => {

    const src = Plane.fromValues(-4, 16, 4, -8);
    const dst = Plane.create();

    Plane.copy(dst, src);

    expect(dst).toEqual(src);

  });

});
