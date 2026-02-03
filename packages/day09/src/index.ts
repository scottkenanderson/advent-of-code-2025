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

const findNearestNeighbour = (redSquares: Point[], square: Point, isHorizontal: boolean): Point => {
  return square;
}

const calculatePerimeter = (redSquares: Point[]): Set<string> => {
  const perimeter: Set<string> = new Set();
  let isHorizontal = true;
  redSquares.forEach((square) => {
    if (isHorizontal) {
      const nearestY = redSquares
        .filter((s) => s.x === square.x)
        .filter((s) => s.y !== square.y)
        .toSorted((a, b) => Math.abs(a.y - square.y) - Math.abs(b.y - square.y));
      Point.pointsBetween(square, nearestY[0]).filter(p=> !perimeter.has(p.toString())).forEach((p) => perimeter.add(p.toString()));
      // console.log(`Nearest Y for ${square}: ${nearestY.join(';')}`);
    } else {
      const nearestX = redSquares
        .filter((s) => s.y === square.y)
        .filter((s) => s.x !== square.x)
        .toSorted((a, b) => Math.abs(a.x - square.x) - Math.abs(b.x - square.x));
      Point.pointsBetween(square, nearestX[0]).filter(p=> !perimeter.has(p.toString())).forEach((p) => perimeter.add(p.toString()));
      // console.log(`Nearest X for ${square}: ${nearestX.join(';')}`);
    }
    isHorizontal = !isHorizontal;
    // const nearestX = redSquares.filter((s) => s.y === nearestY[0].y && s.x > nearestY[0].x).toSorted((b, a) => Math.abs(a.x - nearestY[0].x) - Math.abs(b.x - nearestY[0].x));

    // if (nearestX.length === 0 || nearestY.length === 0) {
    //   return;
    // }
  });
  return perimeter;
}

// const calculateAreas = (redSquares: Point[], perimeter: Point[]): Point[][] => {
//   const areas: Point[][] = [];
//   redSquares.forEach((square) => {
//     const nearestY = perimeter.filter((s) => s.x === square.x && s.y > square.y).toSorted((b, a) => Math.abs(a.y - square.y) - Math.abs(b.y - square.y));
//     console.log(`Nearest Y for ${square}: ${nearestY}`);
//     if (nearestY.length === 0) {
//       return;
//     }
//     const nearestX = areas.filter((s) => s.y === nearestY[0].y && s.x > nearestY[0].x).toSorted((b, a) => Math.abs(a.x - nearestY[0].x) - Math.abs(b.x - nearestY[0].x));
//     console.log(`Nearest X for ${square}: ${nearestX}`);
//     // Point.pointsBetween(square, nearestX).filter(p=> !edges.find(e => e.x === p.x && e.y === p.y)).forEach((p) => edges.push(p));

//     if (nearestX.length === 0 || nearestY.length === 0) {
//       return;
//     }
//     // Point.pointsBetween(square, nearestY).filter(p=> !edges.find(e => e.x === p.x && e.y === p.y)).forEach((p) => edges.push(p));
//     const otherEdge = new Point(nearestX[0].x, nearestY[0].y);
//     console.log(`Adding edge between ${square} and ${otherEdge}`);
//     areas.push([square, otherEdge]);
//   });
//   return areas;
// }

const hasOnlyRedAndGreen = (p1: Point, p2: Point, perimeter: Set<string>): boolean => {
  if (p1.x == p2.x || p1.y == p2.y) {
    return false;
  }
  // console.log(`Checking between ${p1} and ${p2} to make sure it doesn't bisect ${Array.from(perimeter).join(';')}`);
  const horizontalPerimeters = /*new Set(*/[
    ...Point.pointsBetween(new Point(p1.x, p1.y), new Point(p2.x, p1.y)).slice(1, -1),
    ...Point.pointsBetween(new Point(p2.x, p2.y), new Point(p1.x, p2.y)).slice(1, -1),
  ]/*.map(p => p.toString()));*/
  const verticalPerimeters = /*new Set(*/[
    ...Point.pointsBetween(new Point(p2.x, p1.y), new Point(p2.x, p2.y)).slice(1, -1),
    ...Point.pointsBetween(new Point(p1.x, p1.y), new Point(p1.x, p2.y)).slice(1, -1),
  ]/*.map(p => p.toString()));*/
  if (horizontalPerimeters.length === 0 && verticalPerimeters.length === 0) {
    return false;
  }
  for (let i = 0; i <horizontalPerimeters.length; i++) {
    const p = horizontalPerimeters[i];
    const upper = p.x !== p1.x ? 1 : -1;
    const next = new Point(p.x, p.y + upper)
    // const prev = new Point(p.x, p.y - upper)
    if (perimeter.has(p.toString()) && perimeter.has(next.toString())) { //} && perimeter.has(prev.toString())) {
      // console.log('bisects')
      return false;
    }
  }
  for (let i = 0; i <verticalPerimeters.length; i++) {
    const p = verticalPerimeters[i];
    const upper = p.y === p1.y ? 1 : -1;
    const next = new Point(p.x + upper, p.y)
    // const prev = new Point(p.x - upper, p.y)
    // console.log(p, next, prev)
    if (perimeter.has(p.toString()) && perimeter.has(next.toString())) {//} && perimeter.has(prev.toString())) {
      // console.log('bisects')
      return false;
    }
  }
  const squarePerimeter = [...horizontalPerimeters, ...verticalPerimeters]; /*Array.from(squarePerimeterSet).map(p => {
    const [x, y] = p.split(',').map(x => parseInt(x, 10));
    return new Point(x, y);
  })*/
  // console.log(squarePerimeter);

  return true;
};

interface Compression {
  [keyof: string]: number
}

const compress = (points: number[]): Compression => {
  return Object.fromEntries(Array.from(new Set(points)).toSorted((a, b) => a - b).map((v, i) => [v, i]));
}

const decompress = (points: number[]): Compression => {
  return Object.fromEntries(Array.from(new Set(points)).toSorted((a, b) => a - b).map((v, i) => [i, v]));
}

const compressRedSquares = (redSquares: Point[]): { compressedSquares: Point[], compressions: { xCompress: Compression, yCompress: Compression}, decompressions: { xDecompress: Compression, yDecompress: Compression} }  => {
  const xCompress = compress(redSquares.map(p => p.x));
  const yCompress = compress(redSquares.map(p => p.y));
  const xDecompress = decompress(redSquares.map(p => p.x));
  const yDecompress = decompress(redSquares.map(p => p.y));
  console.log(xCompress)
  console.log(yCompress)
  console.log(xDecompress)
  console.log(yDecompress)
  const compressedSquares = redSquares.map(p => new Point(xCompress[p.x.toString()], yCompress[p.y.toString()]))
  const compressions = {xCompress, yCompress}
  const decompressions = {xDecompress, yDecompress}
  return {compressedSquares, compressions, decompressions};
}

const findMaxAreaPart2 = (redSquares: Point[], perimeter: Set<string>, decompressions: {xDecompress: Compression, yDecompress: Compression}): number => {
  let maxArea = 0;
  const { xDecompress, yDecompress } = decompressions;
  redSquares.forEach((square) => {
    redSquares.forEach((otherSquare) => {
      if (square !== otherSquare) { //} && (square.x <= otherSquare.x && square.y <= otherSquare.y)) {
        const area = Point.area(new Point(xDecompress[square.x], yDecompress[square.y]), new Point(xDecompress[otherSquare.x], yDecompress[otherSquare.y]));
        if (area <= maxArea) {
          return;
        }
        if (hasOnlyRedAndGreen(square, otherSquare, perimeter)) {
          // console.log(new Point(xDecompress[square.x], yDecompress[square.y]), new Point(xDecompress[otherSquare.x], yDecompress[otherSquare.y]))
          // console.log("yrs)", area)
          maxArea = area;
        }
      }
    });
  });
  return maxArea;

}

export const part2 = (redSquares: Point[]): number => {
  let maxArea = 0;
  // console.log(redSquares)
  // console.log(compressRedSquares(redSquares))
  const { compressedSquares, decompressions } = compressRedSquares(redSquares);
  const perimeter = calculatePerimeter(compressedSquares);
  // console.log('Edge squares:', Array.from(perimeter).flat());
  const maxX = Math.max(...compressedSquares.map((p) => p.x));
  const maxY = Math.max(...compressedSquares.map((p) => p.y));
  const data = [];
  for (let y = 0; y <= maxY; y += 1) {
    const row = [];
    for (let x = 0; x <= maxX; x += 1) {
      row.push('.');
    }
    data.push(row);
  }
  // const grid = new Grid(data, ' ');
  // perimeter.forEach((square) => {
  //   const [x, y] = square.split(',').map(s => parseInt(s, 10))
  //   grid.set(new Point(x, y), '~');
  // });
  const maxAreaPart2 = findMaxAreaPart2(compressedSquares, perimeter, decompressions);
  // compressedSquares.forEach((square) => {
  //   grid.set(square, '#');
  // });
  // edges.forEach(([start, end]) => {
  //   for (let y = Math.min(start.y, end.y); y <= Math.max(start.y, end.y); y += 1) {
  //     for (let x = Math.min(start.x, end.x); x <= Math.max(start.x, end.x); x += 1) {
  //       const p = new Point(x, y);
  //       if (grid.retrieve(p) !== '#') {
  //         grid.set(p, 'X');
  //       }
  //     }
  //   }
  // });
  // console.log(grid.toString());
  return maxAreaPart2;
};

if (filename) {
  const redSquares = parseInput(filename);
  console.log('Part 1:', part1(redSquares));
  console.log('Part 2:', part2(redSquares));
}
=