import dotenv from 'dotenv';

import { readFile, max, sum } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const lists = readFile(filename);

export const find2BatteryJoltage = (idString: string[]): number => {
  const joltages = [];
  for (let i = 0; i < idString.length - 1; i++) {
    for (let j = i + 1; j < idString.length; j++) {
      joltages.push(parseInt(`${idString[i]}${idString[j]}`), 10);
    }
  }
  // console.log(joltages)
  return joltages.reduce(max);
};

export const findBatteryJoltage = (idString: string[], countBatteries = 12): number => {
  const ids = idString.map((x) => parseInt(x, 10));
  const joltages: string[] = [];
  let start = 0;
  for (let b = 0; b < countBatteries; b++) {
    const substring = ids.slice(start, idString.length - countBatteries + 1 + b);
    const maxIndex = substring.indexOf(Math.max(...substring));
    joltages.push(substring[maxIndex].toString());
    start += maxIndex + 1;
  }

  return parseInt(joltages.join(''), 10);
};

const joltagesPartA: number[] = [];
const joltagesPartB: number[] = [];
lists.forEach((line, i) => {
  joltagesPartA.push(findBatteryJoltage(line.split(''), 2));
  joltagesPartB.push(findBatteryJoltage(line.split('')), 12);
});

console.log(`Part 1: ${joltagesPartA.reduce(sum)}`);
console.log(`Part 2: ${joltagesPartB.reduce(sum)}`);
