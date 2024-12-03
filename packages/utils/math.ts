export function absoluteDifference(a: number, b: number) {
  return Math.abs(a - b)
}

export function between(x: number, inf: number, sup: number) {
  return inf <= x && x <= sup
}

export function max(...values: number[]): number | undefined {
  return Math.max(...values)
}

export function min(...values: number[]): number | undefined {
  return Math.min(...values)
}

export function sum(...values: number[]): number {
  return values.reduce((ttl, value) => ttl + value, 0)
}
