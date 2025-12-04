export function zip<T>(a: T[], b: T[]): T[][] {
  return Array.from(Array(Math.max(a.length, b.length)), (_, i) => [a[i], b[i]]);
}
