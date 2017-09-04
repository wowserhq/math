import { Plane } from '../lib';

describe('Vector3', () => {

  test('new plane should contain default values', () => {

    const plane = Plane.create();

    expect(plane).toEqual(Plane.DEFAULT);

  });

});
