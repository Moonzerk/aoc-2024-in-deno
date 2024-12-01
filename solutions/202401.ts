import run from '@moonzerk/aoc-runner'
import { countOccurrences, distance, parseInput, sort, sum, zip } from '@moonzerk/aoc-utils'

function firstSolution(rawInput: string) {
  const listOfLocations = zip(...parseInput(rawInput, '   '))
  const sortedListOfLocations = listOfLocations.map((locations) => sort(locations.map(Number)))
  const distances = zip(...sortedListOfLocations).map(([a, b]) => distance(a, b))

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
        input: '3   4\n4   3\n2   5\n1   3\n3   9\n\n3   3',
        expected: 11,
      }
    ],
  },
  {
    solution: secondSolution,
    tests: [
      {
        input: '3   4\n4   3\n2   5\n1   3\n3   9\n\n3   3',
        expected: 31,
      }
    ],
    time: true
  }
)
