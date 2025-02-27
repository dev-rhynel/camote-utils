export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }

  if (Array.isArray(obj)) {
    const arrCopy = [] as unknown as T
    (obj as unknown[]).forEach((item, index) => {
      (arrCopy as unknown[])[index] = deepClone(item)
    })
    return arrCopy
  }

  const objCopy = {} as T
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      (objCopy as any)[key] = deepClone((obj as any)[key])
    }
  }

  return objCopy
}

export const deepSortAlphabetical = (input: any, inReverse: boolean = false): any => {
  if (Array.isArray(input)) {
    return input
      .map((item) => deepSortAlphabetical(item))
      .sort((a, b) => {
        const aType = typeof a
        const bType = typeof b

        // Prioritize objects over numbers
        if (aType === 'object' && bType !== 'object') return inReverse ? 1 : -1
        if (bType === 'object' && aType !== 'object') return inReverse ? -1 : 1

        // If both are of the same type, proceed with comparison
        if (aType === bType) {
          if (aType === 'string') {
            return inReverse ? b.localeCompare(a) : a.localeCompare(b)
          } else if (aType === 'object') {
            // Sort objects by their keys
            const aKeys = Object.keys(a).sort()
            const bKeys = Object.keys(b).sort()
            return inReverse ? bKeys[0].localeCompare(aKeys[0]) : aKeys[0].localeCompare(bKeys[0])
          } else {
            // For numbers and other types, convert to string for comparison
            return inReverse ? String(b).localeCompare(String(a)) : String(a).localeCompare(String(b))
          }
        }

        // Handle cases where types differ
        return inReverse ? bType.localeCompare(aType) : aType.localeCompare(bType)
      })
  } else if (input && typeof input === 'object') {
    return Object.keys(input)
      .sort((a, b) => (inReverse ? b.localeCompare(a) : a.localeCompare(b)))
      .reduce((acc, key) => {
        acc[key] = deepSortAlphabetical(input[key], inReverse)
        return acc;
      }, {} as any)
  } else {
    return input;
  }
}

export const deepCompare = (objectA: any, objectB: any, returnChanges: boolean = false): boolean | any => {
  const originalObj = deepSortAlphabetical(objectA)
  const toCompareObj = deepSortAlphabetical(objectB)

  // Handle null/undefined cases
  if (originalObj === toCompareObj) return returnChanges ? {} : true;
  if (!originalObj || !toCompareObj) {
    if (typeof originalObj === 'string' && toCompareObj === null) return returnChanges ? originalObj : false;
    if (typeof toCompareObj === 'string' && originalObj === null) return returnChanges ? toCompareObj : false;
    return returnChanges ? toCompareObj : false;
  }

  // For primitive types, do direct comparison
  if (typeof originalObj === 'number' && typeof toCompareObj === 'number') {
    return returnChanges ? (originalObj === toCompareObj ? {} : toCompareObj) : originalObj === toCompareObj;
  }

  // Get object types
  const originalType = typeof originalObj
  const compareType = typeof toCompareObj

  // If types don't match, objects are different
  if (originalType !== compareType) return returnChanges ? toCompareObj : false

  // Handle array comparison
  if (Array.isArray(originalObj) && Array.isArray(toCompareObj)) {
    if (!returnChanges && originalObj.length !== toCompareObj.length) return false

    const differences: any[] = []
    for (let i = 0; i < toCompareObj.length; i++) {
      if (i >= originalObj.length) {
        differences.push(toCompareObj[i])
        continue;
      }

      const compResult = deepCompare(originalObj[i], toCompareObj[i], returnChanges)
      if (returnChanges) {
        if (compResult && (typeof compResult === 'object' ? Object.keys(compResult).length > 0 : true)) {
          differences.push(toCompareObj[i])
        }
      } else if (!compResult) {
        return false;
      }
    }
    return returnChanges ? differences : true
  }

  // Handle object comparison
  if (originalType === 'object') {
    const changes: Record<string, any> = {}
    const originalKeys = Object.keys(originalObj)
    const compareKeys = Object.keys(toCompareObj)

    for (const key of compareKeys) {
      if (!originalKeys.includes(key)) {
        if (returnChanges) {
          changes[key] = toCompareObj[key]
        } else {
          return false
        }
      } else {
        const compResult = deepCompare(
          originalObj[key],
          toCompareObj[key],
          returnChanges
        )
        if (returnChanges) {
          if (
            compResult !== true &&
            (typeof compResult !== 'object' ||
              Object.keys(compResult).length > 0)
          ) {
            changes[key] = compResult
          }
        } else if (!compResult) {
          return false
        }
      }
    }

    return returnChanges ? changes : Object.keys(changes).length === 0
  }

  // For primitive types, do direct comparison
  const areEqual = originalObj === toCompareObj
  return returnChanges ? (areEqual ? {} : toCompareObj) : areEqual
}

export const deepCompareObjects = deepCompare

export const deepMerge = (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }, excluded: string[] = []) => {
  const merged = { ...obj1 }

  // Iterate over the keys of obj2
  Object.keys(obj2).forEach(key => {
    if (!excluded.includes(key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        // If the property is an array, merge and remove duplicates
        if (Array.isArray(obj2[key])) {
          merged[key] = [...new Set([...(obj1[key] || []), ...(obj2[key] || [])])]
        } else {
          merged[key] = deepMerge(obj1[key] || {}, obj2[key], excluded)
        }
      } else {
        merged[key] = obj2[key]
      }
    }
  })
  return merged
}

export const deepExclude = <T>(
  sourceArray: T[],
  valuesToExclude: T[],
  keySelector: (value: T) => unknown = (value) => JSON.stringify(value),
): T[] => {
  const valuesToExcludeKeys = new Set(valuesToExclude.map((value) => keySelector(value)))
  
  return sourceArray.filter((value) => {
    const key = keySelector(value)
    return !valuesToExcludeKeys.has(key)
  })
}

