import dotenv from 'dotenv';

import { readFile, product, Point, Grid } from '@aoc/common';

dotenv.config();

const filename = process.env.FILENAME as string;

export const parseInput = (filename: string): (Point[]) => {
  return readFile(filename, '\n').filter((line) => line.length > 0)
    .map((i) => i.split(','))
    .map(([x, y]) => {
      return new Point(parseInt(x, 10), parseInt(y, 10));
    });
};

export const part1 = (redSquares: Point[]): number => {
  let maxArea = 0;
  redSquares.forEach((square) => {
    redSquares.forEach((otherSquare) => {
      if (square !== otherSquare) {
        const area = Point.area(square, otherSquare);
        if (area > maxArea) {
          maxArea = area;
        }
      }
    });
  });
  return maxArea;
};

const findGreenSquares = (redSquares: Point[]): Point[] => {
  const greenSquares: Point[] = [];

  redSquares.forEach((square) => {
    redSquares.forEach((otherSquare) => {
      if (square !== otherSquare) {
        if (square.x === otherSquare.x) {
          for (let y = Math.min(square.y, otherSquare.y) + 1; y < Math.max(square.y, otherSquare.y); y += 1) {
            const p = new Point(square.x, y);
            console.log(p);
            // greenSquares.push(p);
          }
        }
        if (square.y === otherSquare.y) {
          for (let x = Math.min(square.x, otherSquare.x) + 1; x < Math.max(square.x, otherSquare.x); x += 1) {
            const p = new Point(x, square.y);
            console.log(p);
            // greenSquares.push(p);
          }
        }
      }
    });
  });

  for (let y = 0; y <= Math.max(...redSquares.map((p) => p.y)); y += 1) {
    for (let x = 0; x <= Math.max(...redSquares.map((p) => p.x)); x += 1) {
      const p = new Point(x, y);
      if (redSquares.find((rs) => rs.x === p.x && rs.y === p.y)) {
        console.log(p);
        continue;
      }
      // let isGreen = true;
      // redSquares.forEach((rs) => {
      //   const distance = Point.manhattanDistance(p, rs);
      //   if (distance <= 2) {
      //     isGreen = false;
      //   }
      // });
      // if (isGreen) {
      //   greenSquares.push(p);
      // }
    }
  }
  return greenSquares;
};

// export const findNearestNeighbour = (junctionBox: string, junctionBoxes: string[], visited: Set<string>): string => {
//   const distances = junctionBoxes
//     .filter((b) => !visited.has(b))
//     .map((b) => [b, calculateStraightLineDistance(to3dPoint(junctionBox), to3dPoint(b))])
//     .toSorted((a, b) => a[1] as number - (b[1] as number));
//   const closest = distances[0][0] as unknown as string;
//   return closest;
// };

const calculateEdges = (redSquares: Point[]): Point[][] => {
  const perimeter: Point[] = [];
  redSquares.forEach((square) => {
    const nearestY = redSquares.filter((s) => s.x === square.x).toSorted((a, b) => Math.abs(a.y - square.y) - Math.abs(b.y - square.y));
    console.log(`Nearest Y for ${square}: ${nearestY}`);
    if (nearestY.length === 0) {
      return;
    }
    const nearestX = redSquares.filter((s) => s.y === nearestY[0].y && s.x > nearestY[0].x).toSorted((b, a) => Math.abs(a.x - nearestY[0].x) - Math.abs(b.x - nearestY[0].x));
    console.log(`Nearest X for ${square}: ${nearestX}`);
    Point.pointsBetween(square, nearestX[0]).filter(p=> !perimeter.find(e => e.x === p.x && e.y === p.y)).forEach((p) => perimeter.push(p));

    if (nearestX.length === 0 || nearestY.length === 0) {
      return;
    }
    Point.pointsBetween(square, nearestY[0]).filter(p=> !perimeter.find(e => e.x === p.x && e.y === p.y)).forEach((p) => perimeter.push(p));
  });
  const areas: Point[][] = [];
  redSquares.forEach((square) => {
    const nearestY = areas.filter((s) => s.x === square.x && s.y > square.y).toSorted((b, a) => Math.abs(a.y - square.y) - Math.abs(b.y - square.y));
    console.log(`Nearest Y for ${square}: ${nearestY}`);
    if (nearestY.length === 0) {
      return;
    }
    const nearestX = areas.filter((s) => s.y === nearestY[0].y && s.x > nearestY[0].x).toSorted((b, a) => Math.abs(a.x - nearestY[0].x) - Math.abs(b.x - nearestY[0].x));
    console.log(`Nearest X for ${square}: ${nearestX}`);
    // Point.pointsBetween(square, nearestX).filter(p=> !edges.find(e => e.x === p.x && e.y === p.y)).forEach((p) => edges.push(p));

    if (nearestX.length === 0 || nearestY.length === 0) {
      return;
    }
    // Point.pointsBetween(square, nearestY).filter(p=> !edges.find(e => e.x === p.x && e.y === p.y)).forEach((p) => edges.push(p));
    const otherEdge = new Point(nearestX[0].x, nearestY[0].y);
    console.log(`Adding edge between ${square} and ${otherEdge}`);
    areas.push([square, otherEdge]);
  });
  console.log(areas);
  return areas;
};

const hasOnlyRedAndGreen = (p1: Point, p2: Point, edges: Point[]): boolean => {
  console.log(`Checking between ${p1} and ${p2}`);

  return false;
};

export const part2 = (redSquares: Point[]): number => {
  let maxArea = 0;
  const edges = calculateEdges(redSquares);
  redSquares.forEach((square) => {
    redSquares.forEach((otherSquare) => {
      if (square !== otherSquare && hasOnlyRedAndGreen(square, otherSquare, edges)) {
        const area = Point.area(square, otherSquare);
        if (area > maxArea) {
          maxArea = area;
        }
      }
    });
  });
  // return maxArea;
  console.log('Red squares:', redSquares.toSorted((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  }));
  console.log('Edge squares:', edges.flat());
  const maxX = Math.max(...redSquares.map((p) => p.x));
  const maxY = Math.max(...redSquares.map((p) => p.y));
  const data = [];
  for (let y = 0; y <= maxY; y += 1) {
    const row = [];
    for (let x = 0; x <= maxX; x += 1) {
      row.push('.');
    }
    data.push(row);
  }
  const grid = new Grid(data, ' ');
  redSquares.forEach((square) => {
    grid.set(square, '#');
  });
  edges.forEach(([start, end]) => {
    for (let y = Math.min(start.y, end.y); y <= Math.max(start.y, end.y); y += 1) {
      for (let x = Math.min(start.x, end.x); x <= Math.max(start.x, end.x); x += 1) {
        const p = new Point(x, y);
        if (grid.retrieve(p) !== '#') {
          grid.set(p, 'X');
        }
      }
    }
  });
  console.log(grid.toString());
  return -1;
};

if (filename) {
  const redSquares = parseInput(filename);
  console.log('Part 1:', part1(redSquares));
  console.log('Part 2:', part2(redSquares));
}
