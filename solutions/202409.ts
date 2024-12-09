import run from '@moonzerk/aoc-runner'
import { fill, swap } from '@moonzerk/aoc-utils'

type Block = number | null

function firstSolution(rawInput: string) {
  const disk = decompressDiskMap(rawInput.split('').map(Number))
  const defragmentedDisk = defragmentDisk(disk)

  // console.log(disk.map(b => b === null ? '.' : b).join(''))
  // console.log(defragmentedDisk.map(b => b === null ? '.' : b).join(''))

  return computeChecksum(defragmentedDisk)
}

// function secondSolution(rawInput: string) {
//   return 1
// }

function decompressDiskMap(diskMap: number[]): Block[] {
  const tmp = []

  for (let i = 0; i < diskMap.length; i++) {
    tmp.push(...fill(i % 2 === 0 ? i / 2 : null, diskMap[i]))
  }

  return tmp
}

function defragmentDisk(disk: Block[]): Block[] {
  const defragmentedDisk = [...disk]

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] === null) {
      continue
    }

    const j = defragmentedDisk.slice(0, i).indexOf(null)
    if (j === -1) {
      break
    }

    swap(defragmentedDisk, i, j)
  }

  return defragmentedDisk
}

function computeChecksum(disk: Block[]): number {
  return disk.reduce((ttl: number, value: Block, index: number) => ttl + Number(value) * index, 0)
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
