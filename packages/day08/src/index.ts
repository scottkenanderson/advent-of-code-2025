import dotenv from 'dotenv';

import { readFile, product } from '@aoc/common';

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
      .map((j) => parseInt(j, 10)))
    .map((n) => {
      return { x: n[0], y: n[1], z: n[2] };
    });
};

export const calculateStraightLineDistance = (first: JunctionBox, second: JunctionBox): number => {
  return Math.sqrt((first.x - second.x) ** 2 + (first.y - second.y) ** 2 + (first.z - second.z) ** 2);
};

export const to3dPoint = (junctionBox: string): JunctionBox => {
  const n = junctionBox.split(',')
    .map((j) => parseInt(j, 10));
  return { x: n[0], y: n[1], z: n[2] };
};

export interface Distance {
  first: JunctionBox;
  second: JunctionBox;
  distance: number;
}

const getClosestJunctionBoxes = (junctionBoxes: string[]): (string | number)[][] => {
  const distances: { [index: string]: number } = {};
  junctionBoxes.forEach((first) => {
    junctionBoxes.forEach((second) => {
      const key = [first, second].sort().join('-');
      if (first === second || Object.prototype.hasOwnProperty.call(distances, key)) {
        return;
      }
      distances[key] = calculateStraightLineDistance(to3dPoint(first), to3dPoint(second));
    });
  });

  return Object.entries(distances).sort((a, b) => a[1] - b[1]);
};

const getCircuits = (closestJunctionBoxes: (string | number)[][]): string[][] => {
  const graph: { [index: string]: string[] } = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  closestJunctionBoxes.forEach(([route, _]) => {
    const [first, second] = (route as string).split('-');
    if (!Object.prototype.hasOwnProperty.call(graph, first)) {
      graph[first] = [];
    }
    if (!Object.prototype.hasOwnProperty.call(graph, second)) {
      graph[second] = [];
    }
    graph[first].push(second);
    graph[second].push(first);
  });

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
      visited.add(latest);
      circuit.push(latest);
      stack.push(...graph[latest]);
    }
    if (circuit.length > 0) {
      circuits.push(circuit);
    }
  });
  return circuits;
};

export const part1 = (circuits: string[][]): number => {
  return circuits.toSorted((a, b) => b.length - a.length).slice(0, 3)
    .map((x) => x.length)
    .reduce(product);
};

export const findStartPoint = (junctionBoxes: string[]): string => {
  const distances = junctionBoxes
    .map((box) => [box, calculateStraightLineDistance({ x: 0, y: 0, z: 0 }, to3dPoint(box))])
    .toSorted((a, b) => a[1] as number - (b[1] as number));
  return distances[0][0] as string;
};

export const findNearestNeighbour = (junctionBox: string, junctionBoxes: string[], visited: Set<string>): string => {
  const distances = junctionBoxes
    .filter((b) => !visited.has(b))
    .map((b) => [b, calculateStraightLineDistance(to3dPoint(junctionBox), to3dPoint(b))])
    .toSorted((a, b) => a[1] as number - (b[1] as number));
  const closest = distances[0][0] as unknown as string;
  return closest;
};

class UnionFind {
  private parent: Map<string, string>;

  private rank: Map<string, number>;

  public componentCount: number;

  constructor(junctionBoxes: string[]) {
    this.parent = new Map();
    this.rank = new Map();
    this.componentCount = junctionBoxes.length;

    // Initialize each junction box as its own parent
    junctionBoxes.forEach((box) => {
      this.parent.set(box, box);
      this.rank.set(box, 0);
    });
  }

  find(x: string): string {
    if (this.parent.get(x) !== x) {
      // Path compression
      this.parent.set(x, this.find(this.parent.get(x)!));
    }
    return this.parent.get(x)!;
  }

  union(x: string, y: string): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false; // Already in same set
    }

    // Union by rank
    const rankX = this.rank.get(rootX)!;
    const rankY = this.rank.get(rootY)!;

    if (rankX < rankY) {
      this.parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      this.parent.set(rootY, rootX);
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, rankX + 1);
    }

    this.componentCount--;
    return true;
  }

  isConnected(): boolean {
    return this.componentCount === 1;
  }
}

export const part2 = (junctionBoxes: string[]): number => {
  const sortedEdges = getClosestJunctionBoxes(junctionBoxes);
  const uf = new UnionFind(junctionBoxes);
  for (const edge of sortedEdges) {
    const route = edge[0];
    const [first, second] = (route as string).split('-');
    /* const wasUnioned = */uf.union(first, second);
    // console.log('Processing edge:', first, second, 'Unioned:', wasUnioned);
    if (uf.isConnected()) {
      const firstBox = to3dPoint(first);
      const secondBox = to3dPoint(second);
      return firstBox.x * secondBox.x;
    }
  }
  return -1;
};

if (filename) {
  const junctionBoxes = parseInputPart1(filename);
  const closestJunctionBoxes = getClosestJunctionBoxes(junctionBoxes);
  const circuits = getCircuits(closestJunctionBoxes.slice(0, 10));
  console.log('Part 1:', part1([...circuits]));
  console.log('Part 2:', part2(junctionBoxes));
}
