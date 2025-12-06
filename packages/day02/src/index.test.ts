import { validateIdPartA } from '.';

test('validateId', () => {
  expect(validateIdPartA(123)).toBeTruthy();
  expect(validateIdPartA(11)).toBeFalsy();
  expect(validateIdPartA(1212)).toBeFalsy();
  expect(validateIdPartA(123123)).toBeFalsy();
  expect(validateIdPartA(1234123)).toBeTruthy();
  expect(validateIdPartA(1134123)).toBeTruthy();
});
