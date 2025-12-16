import fs from 'fs';

import {
  calculateStraightLineDistance,
  parseInput,
  JunctionBox,
  part1,
} from './index';

describe('day08', () => {
  describe('parseInput', () => {
    test('parses input file with regex', () => {
      const filename = 'test-input.txt';
      fs.writeFileSync(filename, [
        '162,817,812',
      ].join('\n'));
      const result = parseInput(filename);

      expect(result).not.toBeNull();
      expect(result.length).toBe(1);
      // expect(result[0]).toEqual({x: 162, y: 817, z: 812});
      expect(result[0]).toEqual('162,817,812');
      fs.unlinkSync(filename);
    });
  });

  describe('calculateStraightLineDistance', () => {
    test('finds straight line distance', () => {
      [
        [{ x: 1, y: 1, z: 1 }, { x: 2, y: 2, z: 2 }, Math.sqrt(3)],
        [{ x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: 2 }, Math.sqrt(1)],
        [{ x: 1, y: 1, z: 1 }, { x: 3, y: 1, z: 1 }, Math.sqrt(4)],
      ].forEach(([first, second, result]) => {
        expect(calculateStraightLineDistance(first as JunctionBox, second as JunctionBox)).toBe(result);
      });
    });
  });

  describe('part1', () => {
    test('finds circuits', () => {
      const input = [
        { x: 1, y: 1, z: 1 },
        { x: 2, y: 2, z: 2 },
        { x: 1, y: 1, z: 1 },
        { x: 1, y: 1, z: 2 },
        { x: 1, y: 1, z: 1 },
        { x: 3, y: 1, z: 1 },
      ].map(({ x, y, z }) => `${x},${y},${z}`);

      expect(part1([input])).toBe(1);
    });
  });
});
