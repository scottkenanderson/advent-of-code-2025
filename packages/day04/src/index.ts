import dotenv from 'dotenv';

import { readFile, max, sum, Grid, Point } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const lists = readFile(filename);

const gridData: string[][] = [];
lists.forEach((line) => {
  gridData.push(line.split(''))
});

const isRoll = (s: string) : boolean => s === '@';

const part1 = (grid: Grid<string>) : number => {
  let accessibleRolls = 0;
  for (let y = 0; y < grid.rows(); y++) {
    for (let x = 0; x < grid.columns(); x++) {
      const point = new Point(x, y);
      if (grid.retrieve(point) === '.') {
        continue;
      }
      const rolls = grid.getNeighbours(new Point(x, y)).filter(isRoll).length;
      if (rolls < 4) {
        accessibleRolls++;
      }
    }
  }
  return accessibleRolls;
}


const part2 = (grid: Grid<string>) : number => {
  let accessibleRolls = 0;
  for (let y = 0; y < grid.rows(); y++) {
    for (let x = 0; x < grid.columns(); x++) {
      const point = new Point(x, y);
      if (grid.retrieve(point) === '.') {
        continue;
      }
      const rolls = grid.getNeighbours(new Point(x, y)).filter(isRoll).length;
      if (rolls < 4) {
        grid.set(point, '.')
        accessibleRolls++;
      }
    }
  }
  return accessibleRolls;
}

const part2Grid = new Grid(gridData, '');
let part2Rolls = 0;
let temp = -1;
while (temp !== part2Rolls) {
  temp = part2Rolls;
  part2Rolls += part2(part2Grid);
  // console.log(part2Rolls)
}


console.log(`Part 1: ${part1(new Grid(gridData))}`)

// console.log(part2Grid.toString());

console.log(`Part 2: ${part2Rolls}`)
// console.log(part2Grid.toString());