import dotenv from 'dotenv';

import { readFile, sum, product } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const regex = /(\s*\d+\s*|[+*])(?: {1}(\s*\d+\s*?|[*+]\s+))*/g;

export const parseInputRegex = (filename: string): (string[] | null)[] => {
  return Array.from(readFile(filename, '\n').map((i) => i.match(regex)));
};

export const calculateColumnWidths = (lastLine: string[]): number[] => {
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
  return columnWidths;
};

export const buildWorksheet = (
  input: string[][],
  columnWidths: number[],
): string[][][] => {
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
  return worksheet;
};

export const extractCephalopodNumbers = (
  row: string[][],
  columnWidth: number,
): number[] => {
  const cephalopodNumbers = [];
  for (let k = columnWidth - 1; k >= 0; k--) {
    const number = [];
    for (const n in row) {
      if (row[n][k]) {
        number.push(row[n][k]);
      }
    }
    cephalopodNumbers.push(parseInt(number.join(''), 10));
  }
  return cephalopodNumbers;
};

export const part1 = (inputRegex: (string[] | null)[]): number => {
  if (inputRegex.length === 0 || !inputRegex[0]) {
    return 0;
  }
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
  }
  return sums.reduce(sum, 0);
};

export const part2 = (
  inputRegex: (string[] | null)[],
  filename: string,
): number => {
  const sums: number[] = [];
  const input = readFile(filename, '\n').map((line) => line.split(''));
  const lastLine = input.pop() as string[];
  const columnWidths = calculateColumnWidths(lastLine);
  const worksheet = buildWorksheet(input, columnWidths);

  worksheet.forEach((row, i) => {
    const cephalopodNumbers = extractCephalopodNumbers(row, columnWidths[i]);
    const operator = (inputRegex[inputRegex.length - 1] as string[])[i];
    if (operator === '+') {
      sums.push(cephalopodNumbers.reduce(sum, 0));
    } else if (operator === '*') {
      sums.push(cephalopodNumbers.reduce(product));
    }
  });
  return sums.reduce(sum, 0);
};

if (filename) {
  const inputRegex = parseInputRegex(filename);
  console.log('Part 1:', part1(inputRegex));
  console.log('Part 2:', part2(inputRegex, filename));
}
