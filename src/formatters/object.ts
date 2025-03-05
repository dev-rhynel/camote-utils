export const removeEmptyKeysEntries = (
  obj: Record<string, any>
): Record<string, any> => {
  const shouldInclude = ([_, value]: [string, any]): boolean => {
    const hasValues = Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined && value !== ''
    return (hasValues || value === 0)
  }

  const transformValues = (value: any): any => {
    if (Array.isArray(value)) {
      return value
    } else if (typeof value === 'object' && value !== null) {
      const nestedObj = removeEmptyKeysEntries(value)
      return Object.keys(nestedObj).length > 0 ? nestedObj : null
    }
    return value
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(shouldInclude)
      .map(([key, value]) => [key, transformValues(value)])
      .filter(([_, value]) => value !== null && value !== undefined)
  )
}

export const objectToQueryString = (obj: Record<string, any> | Array<Array<any>> | Array<any>): string => {
  if (Array.isArray(obj) && obj.length > 0) {
   const isMatrix = obj.every(item => Array.isArray(item) && item.length == 2)
   if (isMatrix) {
     return new URLSearchParams(obj).toString()
   }

   const isFlatArray = obj.every(item => typeof item !== "object") && obj.length % 2 == 0
   if (isFlatArray) {
     const newObj = obj.reduce((acc, curr, idx, array) => {
       if (idx % 2 == 0) {
          acc[curr] = array[idx + 1]
       }
       return acc
     }, {} as Record<string, any>)

     return new URLSearchParams(newObj).toString()
   }

   throw new Error("Invalid array format: Expected either an array of key-value pairs (matrix) or a flat array with an even number of elements.")
  }


  if (typeof obj === "object" && obj !== null && Object.entries(obj).length > 0) {
   return new URLSearchParams(obj).toString()
  }


  throw new Error("Invalid input format: Expected a non-empty object or a valid array format.")
}

// Function to filter a user object by dynamic keys
export function objectFilterByKeys<T extends Record<string, any>>(
  data: T,
  keys: (keyof T)[]
): Partial<T> {
  const filteredData: Partial<T> = {}

  keys.forEach(key => {
    if (key in data) {
      filteredData[key] = data[key]
    }
  })

  return filteredData
}
