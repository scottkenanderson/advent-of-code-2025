import dotenv from 'dotenv';

import { readFile, sum } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const lists = readFile(filename);

const regex = /(\d+)\s+(\d+)/;

const leftList: Array<number> = [];
const rightList: Array<number> = [];

lists.forEach((line) => {
  const match = regex.exec(line) as RegExpExecArray;
  leftList.push(parseInt(match[1], 10));
  rightList.push(parseInt(match[2], 10));
});

if (leftList.length !== rightList.length) {
  throw new Error('array length mismatch');
}

leftList.sort();
rightList.sort();

const distances: Array< number> = [];

const rightListCount: { [num: number]: number } = {};

rightList.forEach((num) => {
  if (!Object.prototype.hasOwnProperty.call(rightListCount, num)) {
    rightListCount[num] = 1;
  } else {
    rightListCount[num] = rightListCount[num] + 1;
  }
});
const similarityScores: Array<number> = [];

leftList.forEach((num, i) => {
  distances.push(Math.max(num, rightList[i]) - Math.min(num, rightList[i]));
  const found = Object.prototype.hasOwnProperty.call(rightListCount, num);
  const count = rightListCount[num];
  similarityScores.push(found
    ? num * count
    : 0);
});

console.log(`Part 1: ${distances.reduce(sum)}`);

console.log(`Part 2: ${similarityScores.filter((a) => a !== 0).reduce(sum)}`);
