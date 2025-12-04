import { operations } from '.'

describe('operations', () => {
  test('L', () => {
    expect(operations['L'](50, 1)).toEqual(49);
    expect(operations['L'](50, 68)).toEqual(82);
    expect(operations['L'](50, 300)).toEqual(50);
    expect(operations['L'](50, 299)).toEqual(51);
    expect(operations['L'](0, 1)).toEqual(99);
    expect(operations['L'](76, 176)).toEqual(0);
    expect(operations['L'](45, 945)).toEqual(0);
    expect(operations['L'](43, 743)).toEqual(0);
  });
  test('R', () => {
    expect(operations['R'](50, 1)).toEqual(51);
    expect(operations['R'](52, 48)).toEqual(0);
    expect(operations['R'](99, 1)).toEqual(0);
  });
});