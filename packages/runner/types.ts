export type ExecutionContext = {
  day: number
  part: number
  testMode: boolean
  year: number
}

export type SolutionResult = string | number

export type Solution = {
  solution: (rawInput: string) => SolutionResult,
  tests: {
    name?: string
    input: string
    expected: SolutionResult
  }[],
  time?: boolean
}
