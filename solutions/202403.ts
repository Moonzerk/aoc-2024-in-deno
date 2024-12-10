import run from '@moonzerk/aoc-runner'
import { multiply, sum } from '@moonzerk/aoc-utils'

function firstSolution(rawInput: string) {
  const matchs = [...rawInput.matchAll(/mul\((?<firstNumber>\d+),(?<secondNumber>\d+)\)/gm)]
  const multiplications = matchs.map((match) => multiply(...Object.values(match.groups!).map(Number)))

  return sum(...multiplications)
}

function secondSolution(rawInput: string) {
  const input = `do()${rawInput}don't()`

  const matchs = [...input.matchAll(/do\(\)(.*?)don't\(\)/gms)]
  const enabledParts = matchs.map(([, enabledPart]) => enabledPart)

  return firstSolution(enabledParts.join(''))
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
  },
  {
    solution: secondSolution,
    tests: [
      {
        input: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        expected: 48,
      },
    ],
  },
)
