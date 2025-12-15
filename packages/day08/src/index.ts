import dotenv from 'dotenv';

import { readFile, sum, Grid, Point, product } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

export interface JunctionBox {
  x: number;
  y: number;
  z: number;
}

export const parseInputPart1 = (filename: string): string[] => {
  return readFile(filename, '\n');
};

export const parseInput = (filename: string): (JunctionBox[]) => {
  return readFile(filename, '\n')
    .map((i) => i.split(',')
      .map(j => parseInt(j, 10))
    )
    .map((n) => {return {'x': n[0], 'y': n[1], 'z': n[2]}});
};

export const calculateStraightLineDistance = (first: JunctionBox, second: JunctionBox): number => {
  return Math.sqrt((first.x - second.x)**2 + (first.y - second.y)**2 + (first.z - second.z)**2);
}

export const to3dPoint = (junctionBox: string): JunctionBox => {
  const n = junctionBox.split(',')
    .map(j => parseInt(j, 10));
  return {'x': n[0], 'y': n[1], 'z': n[2]};
}

export interface Distance {
  first: JunctionBox;
  second: JunctionBox;
  distance: number;
}

export const part1 = (junctionBoxes: string[], limit: number = 10): number => {
  const distances: {[index: string]: number} = {};
  junctionBoxes.forEach((first) => {
    junctionBoxes.forEach((second) => {
      const key = [first, second].sort().join('-')
      if (first === second || distances.hasOwnProperty(key)) {
        return;
      }
      distances[key] = calculateStraightLineDistance(to3dPoint(first), to3dPoint(second));
    })
  })

  const graph: {[index: string]: string[]} = {};
  const closestJunctionBoxes = Object.entries(distances).sort((a, b) => a[1] - b[1]).slice(0, limit);

  closestJunctionBoxes.forEach(([route, _]) => {
    const [first, second] = route.split('-');
    if (!graph.hasOwnProperty(first)) {
      graph[first] = []
    }
    if (!graph.hasOwnProperty(second)) {
      graph[second] = []
    }
    graph[first].push(second);
    graph[second].push(first);
  })

  const visited = new Set();
  const circuits: string[][] = [];
  Object.keys(graph).forEach((key) => {
    if (visited.has(key)) {
      return;
    }
    const stack = [key];
    const circuit = [];
    while (stack.length > 0) {
      const latest = stack.pop() as string;
      if (visited.has(latest)) {
        continue;
      }
      visited.add(latest)
      circuit.push(latest)
      stack.push(...graph[latest])
    }
    if (circuit.length > 0) {
      circuits.push(circuit)
    }
  })

  return circuits.sort((a, b) => b.length - a.length).slice(0, 3).map((x) => x.length).reduce(product)
};

export const findStartPoint = (junctionBoxes: string[]): string => {
  const distances = junctionBoxes
    .map((box) => [box, calculateStraightLineDistance({x: 0, y: 0, z:0}, to3dPoint(box))])
    .toSorted((a, b) => (a[1] as number - (b[1] as number)))
  return distances[0][0] as string
}

export const findNearestNeighbour = (junctionBox: string, junctionBoxes: string[], visited: Set<string>): string => {
  const distances = junctionBoxes
    .filter((b) => !visited.has(b))
    .map((b) => [b, calculateStraightLineDistance(to3dPoint(junctionBox), to3dPoint(b))])
    .toSorted((a, b) => (a[1] as number - (b[1] as number)))
  const closest = distances[0][0] as unknown as string;
  return closest;
}

export const part2 = (junctionBoxes: string[]): number => {
  const start = findStartPoint(junctionBoxes)
  let node = start;
  const visited = new Set<string>();
  visited.add(node)
  const path: string[] = [start]
  while (visited.size < junctionBoxes.length ) {
    node = findNearestNeighbour(node, junctionBoxes, visited)
    visited.add(node);
    path.push(node);
  }
  return to3dPoint(path.pop() as string).x * to3dPoint(path.pop() as string).x
};

if (filename) {
  console.log('Part 1:', part1(parseInputPart1(filename)));
  console.log('Part 2:', part2(parseInputPart1(filename)));
}
