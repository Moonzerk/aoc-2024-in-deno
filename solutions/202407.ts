import run from '@moonzerk/aoc-runner';
import { parseInput, sum } from '@moonzerk/aoc-utils';

type Equation = { result: number; terms: number[] }

type Operator = '+' | '*' | '|'
const operators: Operator[] = []

const combinaisons = new Map<number, string[]>()

function generateCombinaisons(x: number) {
  if (combinaisons.has(x)) {
    return
  }

  if (!combinaisons.has(x - 1)) {
    generateCombinaisons(x - 1)
  }

  const _combinaisons = []
  for (const combinaison of combinaisons.get(x - 1)!) {
    _combinaisons.push(...operators.map((operator) => operator + combinaison))
  }

  combinaisons.set(x, _combinaisons)
}

function hasAtLeastOneSolution({ result, terms }: Equation): boolean {
  generateCombinaisons(terms.length - 1)

  for (const availableCombinaison of combinaisons.get(terms.length - 1)!) {
    let r = terms[0]
    for (let i = 1; i < terms.length; i++) {
      const operator = availableCombinaison[i-1]
      const term = terms[i]

      switch (operator) {
        case '+':
          r += term
          break
        case '*':
          r *= term
          break
        case '|':
          r = Number(`${r}${term}`)
          break
      }
    }

    if (r === result) {
      return true
    }
  }

  return false
}

function solution(availableOperators: Operator[]) {
  return (rawInput: string) => {
    combinaisons.clear()
    combinaisons.set(1, availableOperators)

    operators.length = 0
    operators.push(...availableOperators)

    const equations = parseInput(rawInput).map((line) => {
      const result = Number(line.slice(0, line.indexOf(':')))
      const terms = line.slice(line.indexOf(':') + 2).split(' ').map(Number)

      return {
        result,
        terms,
      }
    })

    return sum(
      ...equations
        .filter((equation) => hasAtLeastOneSolution(equation))
        .map((equation) => equation.result)
    )
  }
}

run({
  solutions: [solution(['+', '*']), solution(['+', '*', '|'])],
  tests: [
    {
      input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
      expected: [3749, 11387],
    },
  ],
})
