import dotenv from 'dotenv';

import { readFile, sum, Grid, Point } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

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
};

export const countBeamSplits = (grid: Grid<string>, start: Point): number => {
  let splits = 0;
  const beamPoints: Point[][] = [[start]];
  for (let i = 0; i < grid.rows() - 1; i++) {
    const nextLevel: Point[] = [];
    beamPoints[i].forEach((p: Point) => {
      const belowPoint = p.offset(0, 1);
      const below = grid.retrieve(belowPoint);
      if (below === '.') {
        nextLevel.push(belowPoint);
      } else if (below === '^') {
        let shouldIncrement = false;
        [-1, 1].forEach((x) => {
          const nextPoint = belowPoint.offset(x, 0);
          if (!nextLevel.find((x) => x.equals(nextPoint))) {
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
  beamPoints.forEach((y) => y.forEach((x) => grid.set(x, '|')));
  return splits;
};

export const helper = (grid: Grid<string>, start: Point): number => {
  if (start.y === grid.rows() - 1) {
    return 1;
  }
  const belowPoint = new Point(start.x, start.y + 1);
  const below = grid.retrieve(belowPoint);
  if (below === '.') {
    return helper(grid, belowPoint);
  } else if (below === '^') {
    return [-1, 1].map((x) => {
      const nextPoint = new Point(belowPoint.x + x, belowPoint.y);
      return helper(grid, nextPoint);
    }).reduce(sum);
  } else {
    throw new Error('unknown type');
  }
};

export const countTimelinesDepthFirst = (grid: Grid<string>, start: Point): number => {
  let count = 0;
  const stack = [start.offset(0, 1)];
  while (stack.length !== 0) {
    const p = stack.pop() as Point;
    if (p.y === grid.rows() - 1) {
      count++;
      continue;
    }
    const value = grid.retrieve(p);
    if (value === '.') {
      stack.push(p.offset(0, 1));
    } else if (value === '^') {
      stack.push(p.offset(-1, 0));
      stack.push(p.offset(1, 0));
    }
    if (count % 1000000 === 0) {
      console.log(`stack length ${count}`);
    }
  }
  return count;
};

interface Block {
  point: Point;
  count: number;
}

interface Row {
  [key: string]: number;
}

export const countTimelines = (grid: Grid<string>, start: Point): number => {
  const startBlock: Block = { point: start, count: 1 };
  let blocks = [startBlock];
  for (let y = 1; y < grid.rows(); y++) {
    const rowValues: Row = {};
    blocks.forEach(({ point, count }) => {
      const value = grid.retrieve(point.offset(0, 1));
      if (value === '.') {
        const next = point.offset(0, 1);
        rowValues[next.toString()] = (rowValues[next.toString()] || 0) + count;
      } else if (value === '^') {
        return [-1, 1]
          .map((xOffset) => point.offset(xOffset, 1))
          .forEach((next) => {
            rowValues[next.toString()] = (rowValues[next.toString()] || 0) + count;
          });
      }
    });
    blocks = Object
      .entries(rowValues)
      .map(([xyString, count]) => {
        const [x, y] = xyString.split(',').map((n) => parseInt(n, 10));
        return { point: new Point(x, y), count };
      });
  }
  return blocks
    .reduce((acc, { point, count }) => ({ point, count: acc.count + count }))
    .count;
};

export const part1 = (grid: Grid<string>): number => {
  const start = findStart(grid);
  return countBeamSplits(grid, start);
};

export const part2 = (grid: Grid<string>): number => {
  const start = findStart(grid);
  return countTimelines(grid, start);
};

if (filename) {
  console.log('Part 1:', part1(parseInput(filename)));
  console.log('Part 2:', part2(parseInput(filename)));
}
