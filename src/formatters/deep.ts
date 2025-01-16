export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (Array.isArray(obj)) {
    const arrCopy = [] as unknown as T;
    (obj as unknown[]).forEach((item, index) => {
      (arrCopy as unknown[])[index] = deepClone(item);
    });
    return arrCopy;
  }

  const objCopy = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      (objCopy as any)[key] = deepClone((obj as any)[key]);
    }
  }

  return objCopy;
};

export const deepCompare = (originalObj: any, toCompareObj: any, returnChanges: boolean = false): boolean | any => {
  // Handle null/undefined cases
  if (originalObj === toCompareObj) return returnChanges ? {} : true;
  if (!originalObj || !toCompareObj) return returnChanges ? toCompareObj : false;

  // Get object types
  const originalType = typeof originalObj;
  const compareType = typeof toCompareObj;

  // If types don't match, objects are different
  if (originalType !== compareType) return returnChanges ? toCompareObj : false;

  // Handle array comparison
  if (Array.isArray(originalObj) && Array.isArray(toCompareObj)) {
    if (!returnChanges && originalObj.length !== toCompareObj.length) return false;
    
    const differences: any[] = [];
    for (let i = 0; i < toCompareObj.length; i++) {
      if (i >= originalObj.length) {
        differences.push(toCompareObj[i]);
        continue;
      }
      
      const compResult = deepCompare(originalObj[i], toCompareObj[i], returnChanges);
      if (returnChanges) {
        if (compResult && (typeof compResult === 'object' ? Object.keys(compResult).length > 0 : true)) {
          differences.push(toCompareObj[i]);
        }
      } else if (!compResult) {
        return false;
      }
    }
    return returnChanges ? differences : true;
  }

  // Handle object comparison
  if (originalType === 'object') {
    const changes: Record<string, any> = {};
    const originalKeys = Object.keys(originalObj);
    const compareKeys = Object.keys(toCompareObj);

    // Check for extra keys in toCompareObj
    for (const key of compareKeys) {
      if (!originalKeys.includes(key)) {
        if (returnChanges) {
          changes[key] = toCompareObj[key];
        } else {
          return false;
        }
      }
    }

    // Compare common keys
    for (const key of originalKeys) {
      if (key in toCompareObj) {
        const compResult = deepCompare(originalObj[key], toCompareObj[key], returnChanges);
        if (returnChanges) {
          if (compResult && (typeof compResult === 'object' ? Object.keys(compResult).length > 0 : true)) {
            changes[key] = toCompareObj[key];
          }
        } else if (!compResult) {
          return false;
        }
      }
    }

    return returnChanges ? changes : Object.keys(changes).length === 0;
  }

  // For primitive types, do direct comparison
  const areEqual = originalObj === toCompareObj;
  return returnChanges ? (areEqual ? {} : toCompareObj) : areEqual;
};

export const deepCompareObjects = deepCompare

export const deepMerge = (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }, excluded: string[] = []) => {
  const merged = { ...obj1 };

  // Iterate over the keys of obj2
  Object.keys(obj2).forEach(key => {
    if (!excluded.includes(key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        // If the property is an array, merge and remove duplicates
        if (Array.isArray(obj2[key])) {
          merged[key] = [...new Set([...(obj1[key] || []), ...(obj2[key] || [])])];
        } else {
          merged[key] = deepMerge(obj1[key] || {}, obj2[key], excluded);
        }
      } else {
        merged[key] = obj2[key];
      }
    }
  });
  return merged;
}

export const deepExclude = <T>(
  sourceArray: T[],
  valuesToExclude: T[],
  keySelector: (value: T) => unknown = (value) => JSON.stringify(value),
): T[] => {
  // Create a set of keys from the values to exclude
  const valuesToExcludeKeys = new Set(valuesToExclude.map((value) => keySelector(value)));
  
  // Filter the source array based on the keys
  return sourceArray.filter((value) => {
    const key = keySelector(value);
    return !valuesToExcludeKeys.has(key);
  });
};
