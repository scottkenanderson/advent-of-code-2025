import { sum, max, min, product } from './math';

describe('math.ts', () => {
  describe('sum', () => {
    test('sum of positive numbers', () => {
      expect(sum(2, 3)).toBe(5);
      expect(sum(10, 20)).toBe(30);
    });

    test('sum with zero', () => {
      expect(sum(0, 5)).toBe(5);
      expect(sum(5, 0)).toBe(5);
      expect(sum(0, 0)).toBe(0);
    });

    test('sum of negative numbers', () => {
      expect(sum(-2, -3)).toBe(-5);
      expect(sum(-10, 5)).toBe(-5);
    });

    test('sum of large numbers', () => {
      expect(sum(1000000, 2000000)).toBe(3000000);
    });

    test('sum with decimals', () => {
      expect(sum(1.5, 2.5)).toBe(4);
      expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('max', () => {
    test('max of positive numbers', () => {
      expect(max(2, 3)).toBe(3);
      expect(max(100, 50)).toBe(100);
    });

    test('max with equal numbers', () => {
      expect(max(5, 5)).toBe(5);
    });

    test('max with zero', () => {
      expect(max(0, 5)).toBe(5);
      expect(max(-5, 0)).toBe(0);
    });

    test('max of negative numbers', () => {
      expect(max(-2, -10)).toBe(-2);
      expect(max(-100, -1)).toBe(-1);
    });

    test('max with decimals', () => {
      expect(max(1.5, 2.7)).toBe(2.7);
      expect(max(3.14, 3.14)).toBe(3.14);
    });

    test('max with large numbers', () => {
      expect(max(1000000, 999999)).toBe(1000000);
    });
  });

  describe('min', () => {
    test('min of positive numbers', () => {
      expect(min(2, 3)).toBe(2);
      expect(min(100, 50)).toBe(50);
    });

    test('min with equal numbers', () => {
      expect(min(5, 5)).toBe(5);
    });

    test('min with zero', () => {
      expect(min(0, 5)).toBe(0);
      expect(min(-5, 0)).toBe(-5);
    });

    test('min of negative numbers', () => {
      expect(min(-2, -10)).toBe(-10);
      expect(min(-100, -1)).toBe(-100);
    });

    test('min with decimals', () => {
      expect(min(1.5, 2.7)).toBe(1.5);
      expect(min(3.14, 3.14)).toBe(3.14);
    });

    test('min with large numbers', () => {
      expect(min(1000000, 999999)).toBe(999999);
    });
  });

  describe('product', () => {
    test('product of positive numbers', () => {
      expect(product(2, 3)).toBe(6);
      expect(product(10, 5)).toBe(50);
    });

    test('product with zero', () => {
      expect(product(0, 5)).toBe(0);
      expect(product(5, 0)).toBe(0);
      expect(product(0, 0)).toBe(0);
    });

    test('product with one', () => {
      expect(product(1, 5)).toBe(5);
      expect(product(5, 1)).toBe(5);
    });

    test('product of negative numbers', () => {
      expect(product(-2, -3)).toBe(6);
      expect(product(-2, 3)).toBe(-6);
      expect(product(2, -3)).toBe(-6);
    });

    test('product with decimals', () => {
      expect(product(2.5, 4)).toBe(10);
      expect(product(1.5, 2)).toBe(3);
    });

    test('product with large numbers', () => {
      expect(product(1000, 2000)).toBe(2000000);
    });

    test('product results in large numbers', () => {
      expect(product(999999, 2)).toBe(1999998);
    });
  });
});
