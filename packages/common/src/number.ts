export const rangeFromString = (s: string): Range => {
  const [start, end] = s.split('-');
  return new Range(start, end);
};

export class Range {
  start: number = 0;

  end: number = 0;

  constructor(start: string | number, end: string | number) {
    this.start = parseInt(start.toString(), 10);
    this.end = parseInt(end.toString(), 10);
  }

  inRange(n: number) {
    return n >= this.start && n <= this.end;
  }

  enumerate(): number[] {
    const range: number[] = [];
    for (let i = this.start; i <= this.end; i++) {
      range.push(i);
    }
    return range;
  }

  merge(r: Range): Range {
    return new Range(Math.min(r.start, this.start), Math.max(r.end, this.end));
  }

  isInside(r: Range): boolean {
    return r.start <= this.start && r.end >= this.end;
  }

  overlaps(r: Range): boolean {
    return this.start >= r.start && this.start <= r.end || r.start >= this.start && r.start <= this.end;
  }

  length(): number {
    return this.end - this.start + 1;
  }
}
