import fs from 'fs';

import { readFile, sum, product, Grid, Point } from '@aoc/common';
import {
  countBeamSplits,
  findStart,
  parseInput,
  part1,
  part2,
} from './index';

describe('day06', () => {
  describe('parseInput', () => {
    test('parses input file with regex', () => {
      const filename = 'test-input.txt';
      fs.writeFileSync(filename, [
        '..S..',
        '.....',
        '..^..',
        '.....',
        '.^.^.',
      ].join('\n'));
      const result = parseInput(filename);
      console.log(result)
      expect(result).not.toBeNull();
      expect(result.data.length).toBe(5)
      expect(result.columns()).toBe(5)
      fs.unlinkSync(filename);
    });
  });

  describe('findStart', () => {
    test('finds start in grid', () => {
      const gridData = [
        '..S..',
        '.....',
        '..^..',
        '.....',
        '.^.^.',
      ].map((line) => line.split(''));
      const grid = new Grid<string>( gridData, '');
      const result = findStart(grid);
      expect(result).toEqual(new Point(2, 0));
    });
  });

  describe('countBeamSplits', () => {
    test('counts the number of times the beam splits', () => {
      const gridData = [
        '..S..',
        '.....',
        '..^..',
        '.....',
        '.^.^.',
        '.....',
      ].map((line) => line.split(''));
      const grid = new Grid<string>( gridData, '');
      ;
      expect(countBeamSplits(grid, new Point(2, 0))).toEqual(3);
    });

    test('counts the number of times the beam splits', () => {
      const gridData = [
        '..S..',
        '.....',
        '..^..',
        '.....',
      ].map((line) => line.split(''));
      const grid = new Grid<string>( gridData, '');
      ;
      expect(countBeamSplits(grid, new Point(2, 0))).toEqual(1);
    });

    test('counts the number of times the beam splits', () => {
      const gridData = [
        '.......S.......',
        '...............',
        '.......^.......',
        '...............',
        '......^.^......',
        '...............',
        '.....^.^.^.....',
        '...............',
        '....^.^...^....',
        '...............',
        '...^.^...^.^...',
        '...............',
        '..^...^.....^..',
        '...............',
        '.^.^.^.^.^...^.',
        '...............',
      ].map((line) => line.split(''));
      const grid = new Grid<string>( gridData, '');
      ;
      expect(countBeamSplits(grid, new Point(7, 0))).toEqual(21);
    });

    test('counts the number of times the beam splits', () => {
      const gridData = [
        '.......S.......',
        '...............',
        '.......^.......',
        '...............',
        '......^.^......',
        '...............',
        '.....^.^.^.....',
        '...............',
        '....^.^...^....',
        '...............',
      ].map((line) => line.split(''));
      const grid = new Grid<string>( gridData, '');
      ;
      expect(countBeamSplits(grid, new Point(7, 0))).toEqual(9);
    });
  });
});