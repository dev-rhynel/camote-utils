export const removeDuplicates = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr))
}

export const flattenArray = <T>(arr: T[][]): T[] => {
  return arr.flat()
}

export const filterArray = <T>(arr: T[], conditionFn: (value: T) => boolean): T[] => {
  return arr.filter(conditionFn)
}

export const transformArray = <T, U>(arr: T[], transformFn: (value: T) => U): U[] => {
  return arr.map(transformFn)
}

export const capitalizeEach = (array: string[]): string[] => {
  if (!Array.isArray(array)) {
    throw new Error('Capitalize each can only be called on arrays')
  }
  return array.map(item => item.replace(/\b\w/g, char => char.toUpperCase()))
}

export const implode = <T>(arr: T[], delimiter: string = ','): string => {
  return arr.join(delimiter)
};