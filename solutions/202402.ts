import run from '@moonzerk/aoc-runner'
import { between, parseInput, sum } from '@moonzerk/aoc-utils'

function firstSolution(rawInput: string) {
  const reports = parseInput(rawInput, ' ').map(levels => levels.map(Number))

  return sum(...reports.map(report => Number(strictSafeCheck(report))))
}

function secondSolution(rawInput: string) {
  const reports = parseInput(rawInput, ' ').map(levels => levels.map(Number))

  return sum(...reports.map(report => {
    const combinaisons = report.map((_, index) => report.toSpliced(index, 1))
    return Number(combinaisons.some(report => strictSafeCheck(report)))
  }))
}

function strictSafeCheck(report: number[]): boolean {
  const sign = (report[0] - report[1]) > 0 ? 1 : -1

  for (let i = 1; i < report.length; i++) {
    const diff = report[i - 1] - report[i]
    if (!between(diff * sign, 1, 3)) {
      return false
    }
  }

  return true
}

run({
  solutions: [firstSolution, secondSolution],
  tests: [
    {
      input: '7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9',
      expected: [2, 4],
    }
  ],
})
