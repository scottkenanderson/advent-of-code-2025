import dotenv from 'dotenv';

import { readFile, sum, product, Grid, Point } from '@aoc/common';
import { checkServerIdentity } from 'tls';

dotenv.config();

const filename = process.env.FILENAME as string;

const regex = /(\s*\d+\s*|[+*])(?: {1}(\s*\d+\s*?|[*+]\s+))*/g;

export const parseInput = (filename: string): (Grid<string>) => {
  const grid = Array.from(readFile(filename, '\n').map((i) => i.split('')));
  return new Grid(grid, '');
};

export const findStart = (grid: Grid<string>): Point => {
  for (let x = 0; x < grid.columns(); x++) {
    if (grid.retrieve(new Point(x, 0)) === 'S') {
      return new Point(x, 0);
    }
  }
  throw new Error('Start not found');
}

export const countBeamSplits = (grid: Grid<string>, start: Point): number => {
  let splits = 0;
  const beamPoints: Point[][] = [[start]];
  for (let i = 0; i < grid.rows()-1; i++) {
    const nextLevel: Point[] = [];
    beamPoints[i].forEach((p: Point) => {
      const belowPoint = new Point(p.x, p.y + 1);
      const below = grid.retrieve(belowPoint);
      grid.visit(belowPoint);
      if (below === '.') {
        nextLevel.push(belowPoint);
      } else if (below === '^') {
        let shouldIncrement = false;
        [-1, 1].forEach(x => {
          const nextPoint = new Point(belowPoint.x + x, belowPoint.y);
          if (!nextLevel.find(x => x.equals(nextPoint))) {
            nextLevel.push(nextPoint);
            shouldIncrement = true;
          }
        });
        if (shouldIncrement) {
          splits++;
        }
      }
    });
    beamPoints.push(nextLevel);
  }
  beamPoints.forEach(y => y.forEach(x => grid.set(x, '|')))
  console.log(grid.toString())
  // console.log(grid)
  return splits;
}

export const part1 = (grid: Grid<string>): number => {
  const start = findStart(grid);
  return countBeamSplits(grid, start);
};

export const part2 = (
  inputRegex: (string[] | null)[],
  filename: string,
): number => {
  return 0;
};

if (filename) {
  const input = parseInput(filename);
  console.log('Part 1:', part1(input));
  // console.log('Part 2:', part2(inputRegex, filename));
}
