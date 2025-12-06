import dotenv from 'dotenv';

import { readFile, max, sum, Range, rangeFromString } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const [rangesStrings, ingredientsStrings] = readFile(filename, '\n\n');
const ranges: Range[] = [];
rangesStrings.split('\n').forEach((rangeString) => {
  ranges.push(rangeFromString(rangeString));
});
const ingredients = ingredientsStrings.split('\n').map((x) => parseInt(x, 10));

const inAnyRange = (ingredientId: number): boolean => {
  for (let i = 0; i < ranges.length; i++) {
    if (ranges[i].inRange(ingredientId)) {
      return true;
    }
  }
  return false;
};
const freshIngredients = ingredients.filter(inAnyRange).length;

const rangesSorted = structuredClone(ranges).sort((a, b) => a.start - b.start)
  .map((r) => new Range(r.start, r.end));
const getOverlaps = (ranges: Range[]) => {
  if (ranges.length <= 1) {
    return ranges;
  }
  const cleaned: Range[] = [];
  let tmp: Range[] = [ranges.shift() as Range];
  while (ranges.length > 0) {
    if (tmp.length === 0 || new Range(tmp[0].start, tmp.map((r) => r.end).reduce(max)).overlaps(ranges[0])) {
      tmp.push(ranges.shift() as Range);
    } else {
      const start = tmp[0].start;
      const end = tmp.map((r) => r.end).reduce(max);
      cleaned.push(new Range(start, end));
      tmp = [];
    }
  }
  if (tmp.length > 0) {
    const start = tmp[0].start;
    const end = tmp.map((r) => r.end).reduce(max);
    cleaned.push(new Range(start, end));
  }
  return cleaned;
};

const overlaps = getOverlaps(rangesSorted);

const allFreshIdsCount = overlaps.map((r) => r.length()).reduce(sum);
// console.log(allFreshIdsCount)
console.log(`Part 1: ${freshIngredients}`);
console.log(`Part 2: ${allFreshIdsCount}`);
