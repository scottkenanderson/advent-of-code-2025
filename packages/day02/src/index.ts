import dotenv from 'dotenv';

import { readFile, sum } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

const lists = readFile(filename);

const partA = 0;
const partB = 0;

export const validateIdPartA = (id: number) : boolean => {
  const idString = id.toString().split('');
  return idString.slice(0, idString.length/2).join('') !== idString.slice(idString.length/2, idString.length).join('')
}


export const validateIdPartB = (id: number) : boolean => {
  const idString = id.toString().split('');
  const permutations = []
  for (let i = 1; i <= idString.length-1; i++) {
    if (idString.length % i > 0) {
      continue;
    }
    const a = [];
    for (let j = 0; j < idString.length; j+=i ) {
      a.push(idString.slice(j, j+i).join(''));
    }
    permutations.push(a);
  }
  // console.log(permutations)
  return !permutations.some(x => {
    // console.log(x, x[0] === x[1])
    return new Set(x).size === 1;
  });
}

const invalidIdsPartA : number[] = [];
const invalidIdsPartB : number[] = [];
lists[0].split(',').forEach((line) => {
  // console.log(line.split('-'));
  const [start, end] = line.split('-');
  for (let i = parseInt(start, 10); i <= parseInt(end, 10); i++) {
    if (!validateIdPartA(i)) {
      invalidIdsPartA.push(i);
    }
    if (!validateIdPartB(i)) {
      invalidIdsPartB.push(i);
    }
  }
});

// console.log(invalidIdsPartA)
console.log(`Part 1: ${invalidIdsPartA.reduce(sum)}`);
// console.log(invalidIdsPartB)

console.log(`Part 2: ${invalidIdsPartB.reduce(sum)}`);
