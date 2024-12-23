export type Solution = (rawInput: string) => number;

export type Test = {
  input: string;
  expected: number[];
};

export type RunOptions = {
  solutions: Solution[];
  tests: Test[];
};

export type Progress = Record<string, {
  executionTime: number;
  result: number;
  createdAt: string;
  updatedAt: string;
}[]>;
