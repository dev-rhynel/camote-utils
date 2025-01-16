export const removeEmptyKeysEntries = (
  obj: Record<string, any>,
  transformFn?: (value: any) => any,
  filterCondition?: string | number
): Record<string, any> => {
  const shouldInclude = ([_, value]: [string, any]): boolean => {
    const hasValues = Array.isArray(value) ? value.length > 0 : Boolean(value)
    const meetsCondition = filterCondition ? value.includes(filterCondition) : true
    return hasValues && meetsCondition
  }

  const transformValues = (value: any): any => {
    if (Array.isArray(value)) {
      return transformFn ? value.map(v => typeof v === 'number' ? transformFn(v) : v) : value
    } else if (typeof value === 'object' && value !== null) {
      const nestedObj = removeEmptyKeysEntries(value, transformFn, filterCondition)
      return Object.keys(nestedObj).length > 0 ? nestedObj : null
    }
    return typeof value === 'number' && transformFn ? transformFn(value) : value
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(shouldInclude)
      .map(([key, value]) => [key, transformValues(value)])
      .filter(([_, value]) => value !== null && value !== undefined)
  )
}
