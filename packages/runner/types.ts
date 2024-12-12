export type ExecutionContext = {
  day: number
  part: number
  testMode: boolean
  year: number
}

export type Solution = {
  solution: (rawInput: string) => number,
  tests: {
    name?: string
    input: string
    expected: number
  }[],
}


export type RunOptions = {
  solutions: ((rawInput: string) => number)[];
  tests: ({
    input: string;
    expected: number[];
  })[];
};
