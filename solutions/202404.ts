import run from '@moonzerk/aoc-runner';
import { parseInput } from '@moonzerk/aoc-utils';

const SEARCH = 'XMAS'

function firstSolution(rawInput: string) {
  const matrix = parseInput(rawInput)

  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y]
    console.log(row)

    for (let x = 0; x < row.length; x++) {
      const char = row[x]

      if (char === SEARCH.at(0)) {
        const tmp = row.slice(x, SEARCH.length)
        console.log(tmp, tmp.length)
      }
    }
  }

  return 1
}

function secondSolution(rawInput: string) {
  return 1
}

run(
  {
    solution: firstSolution,
    tests: [
      {
        input: 'MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX',
        expected: 18,
      }
    ],
    time: true,
  },
)
