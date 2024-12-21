/** @info https://en.wikipedia.org/wiki/Flood_fill */
import run from '@moonzerk/aoc-runner'
import { parseInput } from '@moonzerk/aoc-utils'

type Coordinate = [number, number]
const coordToString = ([a, b]: Coordinate) => `${a}:${b}`

function firstSolution(rawInput: string) {
  const matrix = parseInput(rawInput, '')
  let total = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '.') {
        continue
      }

      let area = 0, perimeter = 0
      const queue: Coordinate[] = [[i , j]]

      while (queue.length > 0) {
        const [a, b] = queue.shift()!
        const plotValue = matrix[a][b]

        let adjacents: Coordinate[] = [[a - 1, b], [a + 1, b], [a, b - 1], [a, b + 1]]
        adjacents = adjacents.filter(([a, b]) => matrix[a]?.[b] === plotValue) as Coordinate[]

        area += 1
        perimeter += 4 - (adjacents.length * 2)

        matrix[a][b] = '.'
        queue.push(
          ...adjacents.filter((coord) => queue.map(coordToString).indexOf(coordToString(coord)) === -1)
        )
      }

      total += area * perimeter
    }
  }

  return total
}

run({
  solutions: [firstSolution],
  tests: [
    {
      input: `AAAA\nBBCD\nBBCC\nEEEC`,
      expected: [140],
    },
    {
      input: `OOOOO\nOXOXO\nOOOOO\nOXOXO\nOOOOO`,
      expected: [772],
    },
    {
      input: `RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE`,
      expected: [1930],
    },
  ],
})
