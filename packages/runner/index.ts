import { readInput } from '@moonzerk/aoc-utils'
import { parseArgs } from 'jsr:@std/cli/parse-args'
import { performance } from 'node:perf_hooks'
import type { RunOptions } from './types.ts'
import { updateProgress } from "./progress.ts";

async function run(options: RunOptions) {
  const { submit } = parseArgs(Deno.args, { boolean: ['submit'], alias: { submit: 'S' } });

  const entryPoint = Deno.mainModule.split('/').at(-1)?.replace('.ts', '')
  const [year, day] = [entryPoint?.slice(0, 4), entryPoint?.slice(4)].map(Number)

  if (!submit) {
    return runTests(options)
  }

  const rawInput = await readInput(year, day)

  for (let i = 0; i < options.solutions.length; i++) {
    const solution = options.solutions[i];

    const start = performance.now()
    const output = await solution(rawInput)
    const executionTime = (performance.now() - start).toFixed(3)

    console.log(`\nPart ${i+ 1} [${executionTime}ms] : ${output}`)

    await updateProgress(year, day, i, output, Number(executionTime))
  }

  /**
   * @todo
   * Read or create progress.json
   *
   * if the current day already has a result for the submited part :
   * compare the output and the execution time
   * else:
   * submit with a POST the result
   *  if the result is validated, edit progress.json (save result and exec time)
   */
}

async function runTests(options: RunOptions) {
  for (let i = 0; i < options.solutions.length; i++) {
    const solution = options.solutions[i];

    for (let j = 0; j < options.tests.length; j++) {
      console.log('\n' + '-'.repeat(20) + '\n')

      const test = options.tests[j]
      const expected = test.expected[i]
      const output = await solution(test.input)

      console.log(`Part ${i + 1 } | Test ${j + 1 }`)
      console.log(`\n${test.input}\n`)
      console.log('Expected :' + expected.toString().padStart(10, ' '))
      console.log('Output :' + output.toString().padStart(12, ' '))
    }
  }
}

export default run
