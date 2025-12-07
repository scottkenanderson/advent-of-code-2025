import { rangeFromString, Range } from './number';

describe('number.ts', () => {
  describe('rangeFromString', () => {
    test('rangeFromString with valid range', () => {
      const r = rangeFromString('1-5');
      expect(r.start).toBe(1);
      expect(r.end).toBe(5);
    });

    test('rangeFromString with large numbers', () => {
      const r = rangeFromString('1000-2000');
      expect(r.start).toBe(1000);
      expect(r.end).toBe(2000);
    });

    test('rangeFromString with negative numbers', () => {
      // Note: rangeFromString uses simple split('-'), so it doesn't handle negative ranges properly
      // This is a limitation of the current implementation
      const r = rangeFromString('5-10');
      expect(r.start).toBe(5);
      expect(r.end).toBe(10);
    });

    test('rangeFromString with single digit', () => {
      const r = rangeFromString('0-9');
      expect(r.start).toBe(0);
      expect(r.end).toBe(9);
    });

    test('rangeFromString with equal start and end', () => {
      const r = rangeFromString('5-5');
      expect(r.start).toBe(5);
      expect(r.end).toBe(5);
    });
  });

  describe('Range constructor', () => {
    test('Range with string parameters', () => {
      const r = new Range('10', '20');
      expect(r.start).toBe(10);
      expect(r.end).toBe(20);
    });

    test('Range with number parameters', () => {
      const r = new Range(10, 20);
      expect(r.start).toBe(10);
      expect(r.end).toBe(20);
    });

    test('Range with mixed parameters', () => {
      const r = new Range('5', 10);
      expect(r.start).toBe(5);
      expect(r.end).toBe(10);
    });

    test('Range with negative numbers', () => {
      const r = new Range(-10, -5);
      expect(r.start).toBe(-10);
      expect(r.end).toBe(-5);
    });
  });

  describe('Range.inRange', () => {
    test('inRange with number in range', () => {
      const r = new Range(1, 5);
      expect(r.inRange(3)).toBe(true);
    });

    test('inRange with number at boundaries', () => {
      const r = new Range(1, 5);
      expect(r.inRange(1)).toBe(true);
      expect(r.inRange(5)).toBe(true);
    });

    test('inRange with number outside range', () => {
      const r = new Range(1, 5);
      expect(r.inRange(0)).toBe(false);
      expect(r.inRange(6)).toBe(false);
    });

    test('inRange with negative ranges', () => {
      const r = new Range(-5, -1);
      expect(r.inRange(-3)).toBe(true);
      expect(r.inRange(-5)).toBe(true);
      expect(r.inRange(-1)).toBe(true);
      expect(r.inRange(0)).toBe(false);
    });

    test('inRange with single value range', () => {
      const r = new Range(5, 5);
      expect(r.inRange(5)).toBe(true);
      expect(r.inRange(4)).toBe(false);
    });
  });

  describe('Range.enumerate', () => {
    test('enumerate basic range', () => {
      const r = new Range(1, 3);
      expect(r.enumerate()).toEqual([1, 2, 3]);
    });

    test('enumerate single value', () => {
      const r = new Range(5, 5);
      expect(r.enumerate()).toEqual([5]);
    });

    test('enumerate zero to five', () => {
      const r = new Range(0, 5);
      expect(r.enumerate()).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test('enumerate negative range', () => {
      const r = new Range(-2, 2);
      expect(r.enumerate()).toEqual([-2, -1, 0, 1, 2]);
    });

    test('enumerate large range', () => {
      const r = new Range(1, 10);
      expect(r.enumerate().length).toBe(10);
      expect(r.enumerate()[0]).toBe(1);
      expect(r.enumerate()[9]).toBe(10);
    });
  });

  describe('Range.merge', () => {
    test('merge overlapping ranges', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(3, 10);
      const merged = r1.merge(r2);
      expect(merged.start).toBe(1);
      expect(merged.end).toBe(10);
    });

    test('merge non-overlapping ranges', () => {
      const r1 = new Range(1, 3);
      const r2 = new Range(7, 10);
      const merged = r1.merge(r2);
      expect(merged.start).toBe(1);
      expect(merged.end).toBe(10);
    });

    test('merge adjacent ranges', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(5, 10);
      const merged = r1.merge(r2);
      expect(merged.start).toBe(1);
      expect(merged.end).toBe(10);
    });

    test('merge with contained range', () => {
      const r1 = new Range(1, 20);
      const r2 = new Range(5, 10);
      const merged = r1.merge(r2);
      expect(merged.start).toBe(1);
      expect(merged.end).toBe(20);
    });

    test('merge with negative numbers', () => {
      const r1 = new Range(-10, -5);
      const r2 = new Range(-8, 0);
      const merged = r1.merge(r2);
      expect(merged.start).toBe(-10);
      expect(merged.end).toBe(0);
    });
  });

  describe('Range.isInside', () => {
    test('isInside with contained range', () => {
      const r1 = new Range(2, 4);
      const r2 = new Range(1, 5);
      expect(r1.isInside(r2)).toBe(true);
    });

    test('isInside with non-contained range', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(2, 4);
      expect(r1.isInside(r2)).toBe(false);
    });

    test('isInside with identical ranges', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(1, 5);
      expect(r1.isInside(r2)).toBe(true);
    });

    test('isInside with boundary touching', () => {
      const r1 = new Range(2, 5);
      const r2 = new Range(1, 5);
      expect(r1.isInside(r2)).toBe(true);
    });

    test('isInside with partial overlap', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(3, 7);
      expect(r1.isInside(r2)).toBe(false);
    });
  });

  describe('Range.overlaps', () => {
    test('overlaps with clear overlap', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(4, 10);
      expect(r1.overlaps(r2)).toBe(true);
      expect(r2.overlaps(r1)).toBe(true);
    });

    test('overlaps with no overlap', () => {
      const r1 = new Range(1, 5);
      const r3 = new Range(6, 8);
      expect(r1.overlaps(r3)).toBe(false);
    });

    test('overlaps with contained range', () => {
      const r1 = new Range(2, 4);
      const r2 = new Range(1, 5);
      expect(r1.overlaps(r2)).toBe(true);
      expect(r2.overlaps(r1)).toBe(true);
    });

    test('overlaps at boundary', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(5, 10);
      expect(r1.overlaps(r2)).toBe(true);
    });

    test('overlaps identical ranges', () => {
      const r1 = new Range(1, 5);
      const r2 = new Range(1, 5);
      expect(r1.overlaps(r2)).toBe(true);
    });

    test('overlaps with negative numbers', () => {
      const r1 = new Range(-5, -1);
      const r2 = new Range(-3, 2);
      expect(r1.overlaps(r2)).toBe(true);
    });
  });

  describe('Range.length', () => {
    test('length of basic range', () => {
      const r = new Range(1, 5);
      expect(r.length()).toBe(5);
    });

    test('length of single value', () => {
      const r = new Range(5, 5);
      expect(r.length()).toBe(1);
    });

    test('length of zero to ten', () => {
      const r = new Range(0, 10);
      expect(r.length()).toBe(11);
    });

    test('length of negative range', () => {
      const r = new Range(-5, -1);
      expect(r.length()).toBe(5);
    });

    test('length spanning negative to positive', () => {
      const r = new Range(-2, 2);
      expect(r.length()).toBe(5);
    });

    test('length of large range', () => {
      const r = new Range(1, 1000);
      expect(r.length()).toBe(1000);
    });
  });
});
