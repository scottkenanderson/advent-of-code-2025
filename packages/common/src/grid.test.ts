import { Grid, Point, Coordinate } from './grid';

describe('grid.ts', () => {
  test('Grid basic operations', () => {
    const grid = new Grid([[1, 2], [3, 4]]);
    expect(grid.rows()).toBe(2);
    expect(grid.columns()).toBe(2);
    expect(grid.retrieve(new Point(1, 0))).toBe(2);
    grid.set(new Point(0, 1), 9);
    expect(grid.retrieve(new Point(0, 1))).toBe(9);
    expect(grid.withinBounds(new Point(1, 1))).toBe(true);
    expect(grid.withinBounds(new Point(2, 2))).toBe(false);
    expect(grid.toString()).toContain('9');
  });

  test('Grid getNeighbours', () => {
    const grid = new Grid([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const neighbours = grid.getNeighbours(new Point(1, 1));
    expect(neighbours.length).toBe(8);
    expect(neighbours).toContain(1);
    expect(neighbours).toContain(9);
  });

  test('Point static and instance methods', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(3, 4);
    expect(Point.manhattanDistance(p1, p2)).toBe(4);
    expect(Point.xyDistance(p1, p2)).toEqual(new Point(-2, -2));
    expect(Point.equals(p1, p2)).toBe(false);
    expect(p1.equals(new Point(1, 2))).toBe(true);
    expect(p1.samePlane(new Point(1, 5))).toBe(true);
    expect(p1.offset(2, 3)).toEqual(new Point(3, 5));
    expect(p1.manhattanNeighbours(1)).toEqual([
      new Point(1, 3), new Point(2, 2), new Point(1, 1), new Point(0, 2)
    ]);
  });

  test('Coordinate extends Point', () => {
    const c = new Coordinate(5, 6);
    expect(c.x).toBe(5);
    expect(c.y).toBe(6);
    expect(c instanceof Point).toBe(true);
  });

  test('Grid with custom separator', () => {
    const grid = new Grid([[1, 2], [3, 4]], ',');
    expect(grid.separator).toBe(',');
    expect(grid.toString()).toContain(',');
  });

  test('Grid visit tracking', () => {
    const grid = new Grid([[1, 2], [3, 4]]);
    const p1 = new Point(0, 0);
    const p2 = new Point(1, 1);
    grid.visit(p1);
    grid.visit(p2);
    expect(grid.visited.length).toBe(2);
    grid.visit(p1); // Visit same point again
    expect(grid.visited.length).toBe(2); // Should not duplicate
  });

  test('Grid getNeighbours corner cases', () => {
    const grid = new Grid([[1, 2], [3, 4]]);
    // Top-left corner
    const topLeftNeighbours = grid.getNeighbours(new Point(0, 0));
    expect(topLeftNeighbours).toEqual([2, 3]);
    // Bottom-right corner
    const bottomRightNeighbours = grid.getNeighbours(new Point(1, 1));
    expect(bottomRightNeighbours).toEqual([1, 2]);
  });

  test('Grid empty grid', () => {
    const grid = new Grid([]);
    expect(grid.rows()).toBe(0);
    expect(grid.columns()).toBe(0);
  });

  test('Grid single cell', () => {
    const grid = new Grid([[42]]);
    expect(grid.rows()).toBe(1);
    expect(grid.columns()).toBe(1);
    expect(grid.retrieve(new Point(0, 0))).toBe(42);
    expect(grid.getNeighbours(new Point(0, 0))).toEqual([]);
  });

  test('Grid withinBounds edge cases', () => {
    const grid = new Grid([[1, 2, 3], [4, 5, 6]]);
    expect(grid.withinBounds(new Point(-1, 0))).toBe(false);
    expect(grid.withinBounds(new Point(0, -1))).toBe(false);
    expect(grid.withinBounds(new Point(3, 0))).toBe(false);
    expect(grid.withinBounds(new Point(0, 2))).toBe(false);
    expect(grid.withinBounds(new Point(0, 0))).toBe(true);
    expect(grid.withinBounds(new Point(2, 1))).toBe(true);
  });

  test('Point.pointsBetween', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(2, 2);
    const points = Point.pointsBetween(p1, p2);
    expect(points.length).toBe(9);
    expect(points).toContainEqual(new Point(0, 0));
    expect(points).toContainEqual(new Point(1, 1));
    expect(points).toContainEqual(new Point(2, 2));
  });

  test('Point.pointsBetween single axis', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(3, 0);
    const points = Point.pointsBetween(p1, p2);
    expect(points).toEqual([
      new Point(0, 0),
      new Point(1, 0),
      new Point(2, 0),
      new Point(3, 0),
    ]);
  });

  test('Point toString', () => {
    const p = new Point(5, 10);
    expect(p.toString()).toBe('5,10');
  });

  test('Point samePlane', () => {
    const p1 = new Point(5, 3);
    expect(p1.samePlane(new Point(5, 10))).toBe(true); // Same x
    expect(p1.samePlane(new Point(7, 3))).toBe(true); // Same y
    expect(p1.samePlane(new Point(7, 10))).toBe(false); // Different x and y
  });

  test('Point offset', () => {
    const p = new Point(5, 5);
    expect(p.offset(3, -2)).toEqual(new Point(8, 3));
    expect(p.offset(-5, -5)).toEqual(new Point(0, 0));
  });

  test('Point manhattanNeighbours various distances', () => {
    const p = new Point(5, 5);
    const neighbours1 = p.manhattanNeighbours(1);
    expect(neighbours1).toEqual([
      new Point(5, 6), new Point(6, 5), new Point(5, 4), new Point(4, 5)
    ]);
    const neighbours2 = p.manhattanNeighbours(2);
    expect(neighbours2).toEqual([
      new Point(5, 7), new Point(7, 5), new Point(5, 3), new Point(3, 5)
    ]);
  });

  test('Point.xyDistance', () => {
    const p1 = new Point(10, 15);
    const p2 = new Point(7, 12);
    const distance = Point.xyDistance(p1, p2);
    expect(distance).toEqual(new Point(3, 3));
  });

  test('Point.manhattanDistance various cases', () => {
    expect(Point.manhattanDistance(new Point(0, 0), new Point(0, 0))).toBe(0);
    expect(Point.manhattanDistance(new Point(0, 0), new Point(3, 4))).toBe(7);
    expect(Point.manhattanDistance(new Point(-2, -3), new Point(1, 2))).toBe(8);
  });

  test('Grid structuredClone isolation', () => {
    const original = [[1, 2], [3, 4]];
    const grid = new Grid(original);
    original[0][0] = 999; // Modify original
    expect(grid.retrieve(new Point(0, 0))).toBe(1); // Grid should be unaffected
  });

  test('Grid large grid operations', () => {
    const data = Array.from({ length: 100 }, (_, i) =>
      Array.from({ length: 100 }, (_, j) => i * 100 + j)
    );
    const grid = new Grid(data);
    expect(grid.rows()).toBe(100);
    expect(grid.columns()).toBe(100);
    expect(grid.retrieve(new Point(50, 50))).toBe(5050);
  });

  test('Coordinate toString and methods', () => {
    const c = new Coordinate(3, 4);
    expect(c.toString()).toBe('3,4');
    expect(c.offset(1, 1)).toEqual(new Coordinate(4, 5));
  });
});
