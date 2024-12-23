import { exists } from '@moonzerk/aoc-utils'
import type { Progress } from './types.ts'

const PROGRESS_FILE_PATH = './progress.json'

async function readProgress(): Promise<Progress> {
  if (!(await exists(PROGRESS_FILE_PATH))) {
    return {}
  }

  return JSON.parse(await Deno.readTextFile(PROGRESS_FILE_PATH))
}

async function saveProgress(progress: Progress) {
  return await Deno.writeTextFile(PROGRESS_FILE_PATH, JSON.stringify(progress, null, 2))
}

export async function updateProgress(
  year: number,
  day: number,
  part: number,
  result: number,
  executionTime: number
) {
  const progress = await readProgress()
  const ID = year + day.toString().padStart(2, '0')

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

  const isFirstResolution = progress[ID]?.[part]?.createdAt === undefined
  if (isFirstResolution) {
    progress[ID] ??= []
    progress[ID][part] = {
      executionTime,
      result,
      createdAt: now,
      updatedAt: now,
    }
  } else {
    const isResultValid = progress[ID][part].result === result
    if (!isResultValid) {
      console.log(`The result obtained (${result}) is not the right one (${progress[ID][part].result})`)
      return
    }

    const oldExecutionTime = progress[ID][part].executionTime
    const hasImproved = oldExecutionTime > executionTime

    if (!hasImproved) {
      console.log(`Correct result!`)
    } else {
      const improvement = ((oldExecutionTime - executionTime) / oldExecutionTime) * 100
      console.log(`Correct result! You've reduced your solution's execution time by ${improvement.toFixed(2)}%`)

      progress[ID][part].executionTime = executionTime
      progress[ID][part].updatedAt = now
    }
  }

  return await saveProgress(progress)
}
