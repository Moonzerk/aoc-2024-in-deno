export async function readInput(year: number, day: number) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`
  const headers = new Headers({ 'Cookie': `session=${Deno.env.get('AOC_SESSION')}` })

  const response = await fetch(url, { headers })
  const file = await response.text()

  return file
}

export function parseInput(rawInput: string): string[]
export function parseInput(rawInput: string, separator: string): string[][]
export function parseInput(rawInput: string, separator?: string): string[] | string[][] {
  const lines = rawInput.replaceAll('\r', '').split('\n').filter(Boolean)
  return separator ? lines.map((line) => line.split(separator)) : lines
}
