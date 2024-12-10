import { readInput } from '@moonzerk/aoc-utils';
import { parseArgs } from 'jsr:@std/cli/parse-args';
import type { ExecutionContext, Solution } from './types.ts';
import { performance } from 'node:perf_hooks'

async function runSolution({ solution, tests }: Solution, executionContext: ExecutionContext) {
  if (executionContext.testMode) {
    for (const test of tests) {
      const start = performance.now()
      const output = await solution(test.input)
      const executionTime = performance.now() - start

      console.log(`[${executionTime.toFixed(3)}ms] Test '${test.name ?? executionContext.part}' - Expected: ${test.expected}, got: ${output}`)
    }
  } else {
    const rawInput = await readInput(executionContext.year, executionContext.day)
    const start = performance.now()
    const output = await solution(rawInput)
    const executionTime = performance.now() - start

    console.log(`[${executionTime.toFixed(3)}ms] Part ${executionContext.part} - Output: ${output}`)
  }
}

async function run(...solutions: Solution[]) {
  const { submit } = parseArgs(Deno.args, { boolean: ['submit'], alias: { submit: 'S' } });

  const entryPoint = Deno.mainModule.split('/').at(-1)?.replace('.ts', '')
  const executionContext = {
    day: Number(entryPoint?.slice(4)),
    part: 1,
    testMode: !submit,
    year: Number(entryPoint?.slice(0, 4)),
  }

  for (const solution of solutions) {
    await runSolution(solution, executionContext)
    executionContext.part++
  }
}

export default run
