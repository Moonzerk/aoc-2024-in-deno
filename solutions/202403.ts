import run from '@moonzerk/aoc-runner'
import { multiply, sum } from '@moonzerk/aoc-utils'
// import { parseInput } from '@moonzerk/aoc-utils'

const MULTIPLICATION_REGEX = /mul\((?<firstNumber>\d+),(?<secondNumber>\d+)\)/
const CONDITIONAL_MULTIPLICATION_REGEX = /do\(\)(?:(?!don't\(\)).)*?mul\((?<firstNumber>\d+),(?<secondNumber>\d+)\)/

function firstSolution(rawInput: string) {
  const matchs = [...rawInput.matchAll(new RegExp(MULTIPLICATION_REGEX, 'gm'))]
  const multiplications = matchs.map((match) => multiply(...Object.values(match.groups!).map(Number)))

  return sum(...multiplications)
}

function secondSolution(rawInput: string) {
  const matchs = [...`do()${rawInput}`.matchAll(new RegExp(CONDITIONAL_MULTIPLICATION_REGEX, 'gm'))]
  const multiplications = matchs.map((match) => multiply(...Object.values(match.groups!).map(Number)))

  return sum(...multiplications)
  // const lines = parseInput(rawInput)

  // return lines.reduce((ttl, line) => {
  //   const matchs = [...`do()${line}`.matchAll(new RegExp(CONDITIONAL_MULTIPLICATION_REGEX, 'g'))]
  //   const multiplications = matchs.map((match) => multiply(...Object.values(match.groups!).map(Number)))

  //   return ttl + sum(...multiplications)
  // }, 0)
}

run(
  {
    solution: firstSolution,
    tests: [
      {
        input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
        expected: 161,
      },
    ],
    time: true,
  },
  {
    solution: secondSolution,
    tests: [
      {
        input: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        expected: 48,
      },
    ],
    time: true,
  },
)
