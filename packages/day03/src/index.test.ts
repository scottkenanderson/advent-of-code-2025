import { findBatteryJoltage } from '.';

test('findBatteryJoltage', () => {
  expect(findBatteryJoltage('123'.split(''), 1)).toEqual(3);
  expect(findBatteryJoltage('123'.split(''), 2)).toEqual(23);

  expect(findBatteryJoltage('123'.split(''), 3)).toEqual(123);
  expect(findBatteryJoltage('987654321111111'.split(''), 12)).toEqual(987654321111);
  expect(findBatteryJoltage('818181911112111'.split(''), 12)).toEqual(888911112111);
  expect(findBatteryJoltage('12345678901234'.split(''), 12)).toBeDefined();
  expect(findBatteryJoltage('3223326722342332922443212222722732121123323322242722223233311322313131312323221226232242732333332333'.split(''), 12)).toBeDefined();
});
