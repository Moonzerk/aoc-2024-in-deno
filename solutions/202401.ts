import run from '@moonzerk/aoc-runner'
import { absoluteDifference, countOccurrences, parseInput, sort, sum, zip } from '@moonzerk/aoc-utils'

function firstSolution(rawInput: string) {
  const listOfLocations = zip(...parseInput(rawInput, '   '))
  const sortedListOfLocations = listOfLocations.map((locations) => sort(locations.map(Number)))
  const distances = zip(...sortedListOfLocations).map(([a, b]) => absoluteDifference(a, b))

  return sum(...distances)
}

function secondSolution(rawInput: string) {
  const listOfLocations = zip(...parseInput(rawInput, '   '))
  const [lA, lB] = listOfLocations.map(countOccurrences)

  let result = 0
  lA.forEach((occurrence, number) => {
    result += Number(number) * occurrence * Number(lB.get(number) ?? 0)
  })

  return result
}

run(
  {
    solution: firstSolution,
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      }
    ],
  },
  {
    solution: secondSolution,
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      }
    ],
  }
)
