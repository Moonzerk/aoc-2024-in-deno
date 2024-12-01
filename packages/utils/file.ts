export async function exists(path: string) {
  try {
    await Deno.lstat(path)
    return true
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false
    }

    throw err
  }
}

export async function mkdir(path: string, options?: Deno.MkdirOptions) {
  try {
    await Deno.mkdir(path, options)
  } catch (err) {
    if (err instanceof Deno.errors.AlreadyExists) {
      return
    }

    throw err
  }
}
