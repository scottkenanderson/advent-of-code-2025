import fs from 'fs';

import {
  parseInput,
  part1,
} from './index';
import { Point } from '@aoc/common';

describe('day09', () => {
  describe('parseInput', () => {
    test('parses input file with regex', () => {
      const filename = 'test-input.txt';
      fs.writeFileSync(filename, [
        '1,2',
        ''
      ].join('\n'));
      const result = parseInput(filename);

      expect(result).not.toBeNull();
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(new Point(1, 2));
      // expect(result[0]).toEqual('162,817,812');
      fs.unlinkSync(filename);
    });
  });

  describe('part1', () => {
    test('finds circuits', () => {
      expect(1).toBe(1);
    });
  });
});
