import run from '@moonzerk/aoc-runner'
import { fill, swap } from '@moonzerk/aoc-utils'
import { performance } from 'node:perf_hooks'

function firstSolution(rawInput: string) {
  let start = performance.now()
  const disk = decompressDiskMap(rawInput.split('').map(Number))
  console.log(`Step 1 : Uncompress => ${performance.now() - start}ms`)

  start = performance.now()
  defragmentDisk(disk)
  console.log(`Step 2 : Defragment => ${performance.now() - start}ms`)

  start = performance.now()
  const checksum = computeChecksum(disk)
  console.log(`Step 3 : Checksum calculation => ${performance.now() - start}ms`)

  return checksum
}

function decompressDiskMap(diskMap: number[]): (number | null)[] {
  const tmp = []

  for (let i = 0; i < diskMap.length; i++) {
    tmp.push(...fill(i % 2 === 0 ? i / 2 : null, diskMap[i]))
  }

  return tmp
}

function defragmentDisk(disk: (number | null)[]): void {
  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] === null) {
      continue
    }

    const j = disk.findIndex((value) => value === null)
    if (j === -1) {
      return
    }

    swap(disk, i, j)
  }
}

function computeChecksum(disk: (number | null)[]): number {
  let ttl = 0
  for (let i = 1; i < disk.length; i++) {
    if (disk[i] === null) return ttl
    ttl += i * disk[i]!
  }

  return 0
}

run(
  {
    solution: firstSolution,
    tests: [
      {
        input: `12345`,
        expected: 60,
      },
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    time: true,
  },
)
