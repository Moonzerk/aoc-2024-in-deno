import { exists } from './file.ts'

export async function readInput(year: number, day: number) {
  const inputName = `./inputs/${year}${day.toString().padStart(2, '0')}.input`
  if (await exists(inputName)) {
    return await Deno.readTextFile(inputName)
  }

  const input = await fetchInput(year, day)
  await Deno.writeTextFile(inputName, input);

  return input
}

async function fetchInput(year: number, day: number) {
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
