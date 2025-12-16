
export class Grid<T> {
  data: T[][];

  visited: Point[] = [];

  separator: string;

  constructor(initialData: T[][], separator = '\t') {
    this.data = structuredClone(initialData);
    this.separator = separator;
  }

  rows(): number {
    return this.data.length;
  }

  columns(): number {
    return this.data[0].length || 0;
  }

  visit(p: Point) {
    if (this.visited.indexOf(p) === -1) {
      this.visited.push(p);
    }
  }

  retrieve(p: Point): T {
    // this.visited.push(p);
    return this.data[p.y][p.x];
  }

  set(p: Point, value: T) {
    this.data[p.y][p.x] = value;
  }

  getNeighbours(p: Point): T[] {
    const neighbours: T[] = [];
    for (let y = p.y - 1; y <= p.y + 1; y++) {
      for (let x = p.x - 1; x <= p.x + 1; x++) {
        if (p.x === x && p.y === y || (x < 0 || y < 0) || (x >= this.columns() || y >= this.rows())) {
          continue;
        }
        neighbours.push(this.retrieve(new Point(x, y)));
      }
    }

    return neighbours;
  }

  withinBounds(p: Point): boolean {
    return p.x >= 0 &&
      p.x < this.columns() &&
      p.y >= 0 && p.y < this.rows();
  }

  toString(): string {
    return this.data.map((g) => g.join(this.separator)).join('\n');
  }
}

export class Point {
  public static pointsBetween(p1: Point, p2: Point): Point[] {
    const xRange = { min: Math.min(p1.x, p2.x), max: Math.max(p1.x, p2.x) };
    const yRange = { min: Math.min(p1.y, p2.y), max: Math.max(p1.y, p2.y) };
    const points = [];
    for (let y = yRange.min; y <= yRange.max; y += 1) {
      for (let x = xRange.min; x <= xRange.max; x += 1) {
        points.push(new Point(x, y));
      }
    }

    return points;
  }

  public static manhattanDistance(p1: Point, p2: Point): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }

  public static area(p1: Point, p2: Point): number {
    return (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);
  }

  public static xyDistance(p1: Point, p2: Point): Point {
    return new Point(p1.x - p2.x, p1.y - p2.y);
  }

  public static equals(p1: Point, p2: Point): boolean {
    return p1.x === p2.x && p1.y === p2.y;
  }

  x: number;

  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }

  samePlane(other: Point): boolean {
    return this.x === other.x || this.y === other.y;
  }

  offset(xOffset: number, yOffset: number): Point {
    return new Point(this.x + xOffset, this.y + yOffset);
  }

  manhattanNeighbours(manhattanDistance: number): Point[] {
    const top = new Point(this.x, this.y + manhattanDistance);
    const right = new Point(this.x + manhattanDistance, this.y);
    const bottom = new Point(this.x, this.y - manhattanDistance);
    const left = new Point(this.x - manhattanDistance, this.y);

    return [top, right, bottom, left];
  }

  public equals(obj: Point): boolean {
    return this.x === obj.x && this.y === obj.y;
  }
}

export class Coordinate extends Point {
}
