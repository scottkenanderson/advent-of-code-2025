import { zip } from './array';

describe('array.ts', () => {
  test('zip returns zipped arrays', () => {
    expect(zip([1, 2], [3, 4])).toEqual([[1, 3], [2, 4]]);
    expect(zip([1], [2, 3])).toEqual([[1, 2], [undefined, 3]]);
  });
});
