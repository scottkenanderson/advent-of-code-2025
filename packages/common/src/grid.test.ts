import { Grid, Point, Coordinate } from './grid';

describe('grid.ts', () => {
  describe('Grid', () => {
    test('basic operations', () => {
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

    test('getNeighbours', () => {
      const grid = new Grid([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      const neighbours = grid.getNeighbours(new Point(1, 1));
      expect(neighbours.length).toBe(8);
      expect(neighbours).toContain(1);
      expect(neighbours).toContain(9);
    });

    test('with custom separator', () => {
      const grid = new Grid([[1, 2], [3, 4]], ',');
      expect(grid.separator).toBe(',');
      expect(grid.toString()).toContain(',');
    });

    test('visit tracking', () => {
      const grid = new Grid([[1, 2], [3, 4]]);
      const p1 = new Point(0, 0);
      const p2 = new Point(1, 1);
      grid.visit(p1);
      grid.visit(p2);
      expect(grid.visited.length).toBe(2);
      grid.visit(p1); // Visit same point again
      expect(grid.visited.length).toBe(2); // Should not duplicate
    });

    test('getNeighbours corner cases', () => {
      const grid = new Grid([[1, 2], [3, 4]]);
      // Top-left corner (0,0) - has neighbors at (1,0), (0,1), (1,1)
      const topLeftNeighbours = grid.getNeighbours(new Point(0, 0));
      expect(topLeftNeighbours).toEqual([2, 3, 4]);
      // Bottom-right corner (1,1) - has neighbors at (0,1), (1,0), (0,0)
      const bottomRightNeighbours = grid.getNeighbours(new Point(1, 1));
      expect(bottomRightNeighbours).toEqual([3, 2, 1]);
    });

    test('empty grid', () => {
      const grid = new Grid([[]]);
      expect(grid.rows()).toBe(1);
      expect(grid.columns()).toBe(0);
    });

    test('single cell', () => {
      const grid = new Grid([[42]]);
      expect(grid.rows()).toBe(1);
      expect(grid.columns()).toBe(1);
      expect(grid.retrieve(new Point(0, 0))).toBe(42);
      expect(grid.getNeighbours(new Point(0, 0))).toEqual([]);
    });

    test('withinBounds edge cases', () => {
      const grid = new Grid([[1, 2, 3], [4, 5, 6]]);
      expect(grid.withinBounds(new Point(-1, 0))).toBe(false);
      expect(grid.withinBounds(new Point(0, -1))).toBe(false);
      expect(grid.withinBounds(new Point(3, 0))).toBe(false);
      expect(grid.withinBounds(new Point(0, 2))).toBe(false);
      expect(grid.withinBounds(new Point(0, 0))).toBe(true);
      expect(grid.withinBounds(new Point(2, 1))).toBe(true);
    });

    test('structuredClone isolation', () => {
      const original = [[1, 2], [3, 4]];
      const grid = new Grid(original);
      original[0][0] = 999; // Modify original
      expect(grid.retrieve(new Point(0, 0))).toBe(1); // Grid should be unaffected
    });

    test('large grid operations', () => {
      const data = Array.from({ length: 100 }, (_, i) => Array.from({ length: 100 }, (_, j) => i * 100 + j));
      const grid = new Grid(data);
      expect(grid.rows()).toBe(100);
      expect(grid.columns()).toBe(100);
      expect(grid.retrieve(new Point(50, 50))).toBe(5050);
    });
  });

  describe('Point', () => {
    describe('static methods', () => {
      test('pointsBetween rectangle', () => {
        const p1 = new Point(0, 0);
        const p2 = new Point(2, 2);
        const points = Point.pointsBetween(p1, p2);
        expect(points.length).toBe(9);
        expect(points).toContainEqual(new Point(0, 0));
        expect(points).toContainEqual(new Point(1, 1));
        expect(points).toContainEqual(new Point(2, 2));
      });

      test('pointsBetween single axis', () => {
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

      test('manhattanDistance various cases', () => {
        expect(Point.manhattanDistance(new Point(0, 0), new Point(0, 0))).toBe(0);
        expect(Point.manhattanDistance(new Point(0, 0), new Point(3, 4))).toBe(7);
        expect(Point.manhattanDistance(new Point(-2, -3), new Point(1, 2))).toBe(8);
      });

      test('xyDistance', () => {
        const p1 = new Point(10, 15);
        const p2 = new Point(7, 12);
        const distance = Point.xyDistance(p1, p2);
        expect(distance).toEqual(new Point(3, 3));
      });

      test('equals', () => {
        const p1 = new Point(1, 2);
        const p2 = new Point(3, 4);
        expect(Point.equals(p1, p2)).toBe(false);
        expect(Point.equals(p1, new Point(1, 2))).toBe(true);
      });
    });

    describe('instance methods', () => {
      test('toString', () => {
        const p = new Point(5, 10);
        expect(p.toString()).toBe('5,10');
      });

      test('samePlane', () => {
        const p1 = new Point(5, 3);
        expect(p1.samePlane(new Point(5, 10))).toBe(true); // Same x
        expect(p1.samePlane(new Point(7, 3))).toBe(true); // Same y
        expect(p1.samePlane(new Point(7, 10))).toBe(false); // Different x and y
      });

      test('offset', () => {
        const p = new Point(5, 5);
        expect(p.offset(3, -2)).toEqual(new Point(8, 3));
        expect(p.offset(-5, -5)).toEqual(new Point(0, 0));
      });

      test('manhattanNeighbours various distances', () => {
        const p = new Point(5, 5);
        const neighbours1 = p.manhattanNeighbours(1);
        expect(neighbours1).toEqual([
          new Point(5, 6),
          new Point(6, 5),
          new Point(5, 4),
          new Point(4, 5),
        ]);
        const neighbours2 = p.manhattanNeighbours(2);
        expect(neighbours2).toEqual([
          new Point(5, 7),
          new Point(7, 5),
          new Point(5, 3),
          new Point(3, 5),
        ]);
      });

      test('equals', () => {
        const p1 = new Point(1, 2);
        expect(p1.equals(new Point(1, 2))).toBe(true);
        expect(p1.equals(new Point(3, 4))).toBe(false);
      });
    });
  });

  describe('Coordinate', () => {
    test('extends Point', () => {
      const c = new Coordinate(5, 6);
      expect(c.x).toBe(5);
      expect(c.y).toBe(6);
      expect(c instanceof Point).toBe(true);
    });

    test('toString and methods', () => {
      const c = new Coordinate(3, 4);
      expect(c.toString()).toBe('3,4');
      expect(c.offset(1, 1)).toEqual(new Coordinate(4, 5));
    });
  });
});
