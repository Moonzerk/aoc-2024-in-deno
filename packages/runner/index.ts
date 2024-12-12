import { readInput } from '@moonzerk/aoc-utils';
import { parseArgs } from 'jsr:@std/cli/parse-args';
import { performance } from 'node:perf_hooks';
import type { RunOptions } from './types.ts';

async function run({ solutions, tests }: RunOptions) {
  const { submit } = parseArgs(Deno.args, { boolean: ['submit'], alias: { submit: 'S' } });

  const entryPoint = Deno.mainModule.split('/').at(-1)?.replace('.ts', '')
  const [year, day] = [entryPoint?.slice(0, 4), entryPoint?.slice(4)].map(Number)

  /** @todo reorganize */
  if (submit) {
    const rawInput = await readInput(year, day)

    for (let i = 0; i < solutions.length; i++) {
      const solution = solutions[i];

      const start = performance.now()
      const output = await solution(rawInput)
      const executionTime = (performance.now() - start).toFixed(3)

      console.log(`P${i+ 1} [${executionTime}ms] : ${output}`)
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
  } else {
    for (let i = 0; i < solutions.length; i++) {
      const solution = solutions[i];

      for (let j = 0; j < tests.length; j++) {
        const test = tests[j]
        const output = await solution(test.input)

        const expected = test.expected[i]

        console.log(`P${i+ 1} / T${j + 1} : output=${output} | expected=${expected}`)
      }
    }
  }
}

export default run
