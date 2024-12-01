export function compact<T>(array: T[]): T[] {
  return array.filter(elmt => Boolean(elmt))
}

export function countOccurrences(array: string[]): Map<string, number> {
  return array.reduce((map, element) => {
    return map.set(element, (map.get(element) ?? 0) + 1)
  }, new Map());
}

export function first<T>(array: T[]): T | undefined {
  return array.at(0)
}

export function last<T>(array: T[]): T | undefined {
  return array.at(-1)
}

export function sort<T>(array: T[], compareFn?: (a: T, b: T) => number) {
  return array.toSorted(compareFn)
}

export function zip<T>(...arrays: T[][]) {
  const maxLength = Math.max(...arrays.map(arr => arr.length));

  return Array.from({ length: maxLength }, (_, index) =>
    arrays.map(array => array[index])
  );
}
