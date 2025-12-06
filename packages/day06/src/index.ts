import dotenv from 'dotenv';

import { readFile, sum, product } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const regex = /(\s*\d+\s*|[+*])(?: {1}(\s*\d+\s*?|[*+]\s+))*/g;

const inputRegex = Array.from(readFile(filename, '\n').map((i) => i.match(regex)));
// console.log('Input:', input);

const part1 = () => {
  const sums: number[] = [];
  for (let i = 0; i < (inputRegex[0] as string[]).length; i++) {
    const numbers = [];
    for (let j = 0; j < inputRegex.length - 1; j++) {
      numbers.push(parseInt((inputRegex[j] as string[])[i]));
    }
    if ((inputRegex[inputRegex.length - 1] as string[])[i] === '+') {
      sums.push(numbers.reduce(sum, 0));
    } else if ((inputRegex[inputRegex.length - 1] as string[])[i] === '*') {
      sums.push(numbers.reduce(product));
    }
    // console.log(numbers)
  }
  return sums.reduce(sum, 0);
};

const part2 = () => {
  const sums: number[] = [];
  const input = readFile(filename, '\n').map((line) => line.split(''));
  const lastLine = input.pop() as string[];
  const columnWidths: number[] = [];
  let tmp = 1;
  lastLine.shift();
  while (lastLine.length > 0) {
    const value = lastLine.shift();
    if (value === ' ') {
      tmp++;
    } else {
      columnWidths.push(tmp - 1);
      tmp = 1;
    }
  }
  columnWidths.push(tmp);
  const worksheet: string[][][] = [];
  columnWidths.forEach((count) => {
    const numbers = [];
    for (let j = 0; j < input.length; j++) {
      const line = input[j];
      numbers.push(line.splice(0, count));
      line.shift();
    }
    worksheet.push(numbers);
  });
  // console.log('Worksheet:', worksheet);

  worksheet.forEach((row, i) => {
    const cephalopodNumbers = [];
    for (let k = columnWidths[i] - 1; k >= 0; k--) {
      const number = [];
      for (const n in row) {
        if (row[n][k]) {
          number.push(row[n][k]);
        }
      }
      cephalopodNumbers.push(parseInt(number.join(''), 10));
    }
    const operator = (inputRegex[inputRegex.length - 1] as string[])[i];
    if (operator === '+') {
      sums.push(cephalopodNumbers.reduce(sum, 0));
    } else if (operator === '*') {
      sums.push(cephalopodNumbers.reduce(product));
    }
    // console.log(sums);
  });
  return sums.reduce(sum, 0);
};
console.log('Part 1:', part1());
console.log('Part 2:', part2());
