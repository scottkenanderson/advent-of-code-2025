import dotenv from 'dotenv';

import { readFile, sum } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const lists = readFile(filename);

const regex = /([LR])(\d+)/;

const overflow = (result: number, modulo: number): number => {
  if (result >= 0) {
    return result;
  }
  const calc = modulo - Math.abs(result % modulo);
  return calc === 100
    ? 0
    : calc;
};

interface Operations {
  [index: string]: (curr: number, x: number) => number;
}

export const operations: Operations = {
  L: (curr: number, distance: number): number => overflow(curr - distance, 100),
  R: (curr: number, distance: number): number => (curr + distance) % 100,
};

export const findZero = (operator: string, distance: number, currentPosition: number): number => {
  let password = 0;
  let remainder = distance;
  let curr = currentPosition;
  let f = sum;
  if (operator === 'L') {
    f = (x: number, y: number): number => x - y;
  }

  while (remainder > 0) {
    // console.log(curr)
    curr = f(curr, 1);
    if (curr < 0) {
      curr = 99;
    }
    if (curr > 99) {
      curr = 0;
    }
    if (curr === 0) {
      password++;
    }
    remainder--;
  }
  return password;
};

let currentPosition = 50;
let passwordPartA = 0;
let passwordPartB = 0;

lists.forEach((line) => {
  const match = regex.exec(line);
  if (match === null) {
    console.log('match is null');
    process.exit(1);
  }
  const operator = match[1] as string;
  const distance = match && parseInt(match[2], 10);

  // console.log(operator, currentPosition, distance, operations[operator](currentPosition, distance));
  passwordPartB += findZero(operator, distance, currentPosition);
  currentPosition = operations[operator](currentPosition, distance);
  if (currentPosition === 0) {
    passwordPartA++;
  }
});

console.log(`Part 1: ${passwordPartA}`);

console.log(`Part 2: ${passwordPartB}`);
