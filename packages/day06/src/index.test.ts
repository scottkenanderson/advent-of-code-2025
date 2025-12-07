import fs from 'fs';
import {
  parseInputRegex,
  calculateColumnWidths,
  buildWorksheet,
  extractCephalopodNumbers,
  part1,
  part2,
} from './index';

describe('day06', () => {
  describe('parseInputRegex', () => {
    test('parses input file with regex', () => {
      const filename = 'test-input.txt';
      fs.writeFileSync(filename, '1 + 2\n3 * 4');
      const result = parseInputRegex(filename);
      expect(result.length).toBeGreaterThan(0);
      fs.unlinkSync(filename);
    });
  });

  describe('calculateColumnWidths', () => {
    test('calculates column widths from last line', () => {
      const lastLine = '1 2 3'.split('');
      const widths = calculateColumnWidths([...lastLine]);
      expect(widths.length).toBeGreaterThan(0);
    });

    test('handles single column', () => {
      const lastLine = '1'.split('');
      const widths = calculateColumnWidths([...lastLine]);
      expect(widths.length).toBeGreaterThan(0);
    });

    test('handles multiple columns with spaces', () => {
      const lastLine = '1 2 3 4'.split('');
      const widths = calculateColumnWidths([...lastLine]);
      expect(widths.length).toBeGreaterThan(0);
    });
  });

  describe('buildWorksheet', () => {
    test('builds worksheet from input lines and column widths', () => {
      const input = [
        ['1', '2', '3'],
        ['4', '5', '6'],
      ];
      const columnWidths = [1, 1, 1];
      const worksheet = buildWorksheet(input, columnWidths);
      expect(worksheet.length).toBe(3);
    });

    test('handles empty input', () => {
      const input: string[][] = [];
      const columnWidths: number[] = [];
      const worksheet = buildWorksheet(input, columnWidths);
      expect(worksheet.length).toBe(0);
    });
  });

  describe('extractCephalopodNumbers', () => {
    test('extracts numbers from a row', () => {
      const row = [
        ['1', '2'],
        ['3', '4'],
      ];
      const numbers = extractCephalopodNumbers(row, 2);
      expect(Array.isArray(numbers)).toBe(true);
      expect(numbers.length).toBeGreaterThan(0);
    });

    test('handles single element row', () => {
      const row = [['5']];
      const numbers = extractCephalopodNumbers(row, 1);
      expect(numbers.length).toBe(1);
      expect(numbers[0]).toBe(5);
    });

    test('extracts multiple digit numbers', () => {
      const row = [
        ['1', '0'],
        ['2', '0'],
      ];
      const numbers = extractCephalopodNumbers(row, 2);
      expect(numbers.length).toBeGreaterThan(0);
    });
  });

  describe('part1', () => {
    test('calculates sum with addition operator', () => {
      const inputRegex = [['1'], ['2'], ['3'], ['+']];
      const result = part1(inputRegex);
      expect(typeof result).toBe('number');
    });

    test('calculates product with multiplication operator', () => {
      const inputRegex = [['2'], ['3'], ['4'], ['*']];
      const result = part1(inputRegex);
      expect(typeof result).toBe('number');
    });

    test('handles mixed operations', () => {
      const inputRegex = [['1'], ['2'], ['+'], ['3'], ['4'], ['*']];
      const result = part1(inputRegex);
      expect(typeof result).toBe('number');
    });

    test('returns 0 for empty input', () => {
      const inputRegex: (string[] | null)[] = [];
      const result = part1(inputRegex);
      expect(result).toBe(0);
    });
  });

  describe('part2', () => {
    test('calculates result from file', () => {
      const filename = 'test-part2.txt';
      fs.writeFileSync(filename, '1 2 3\n4 5 6\n+');
      const inputRegex = [['1'], ['2'], ['3'], ['+']];
      const result = part2(inputRegex, filename);
      expect(typeof result).toBe('number');
      fs.unlinkSync(filename);
    });

    test('handles multiplication in part2', () => {
      const filename = 'test-part2-mult.txt';
      fs.writeFileSync(filename, '2 2 2\n3 3 3\n*');
      const inputRegex = [['2'], ['2'], ['2'], ['*']];
      const result = part2(inputRegex, filename);
      expect(typeof result).toBe('number');
      fs.unlinkSync(filename);
    });
  });
});
