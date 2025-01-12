import { isString } from "../checkers";

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

/**
* Compares two objects deeply and returns an object containing the differences.
*
* This function performs a deep comparison between two objects, checking for differences
* in their properties and values. It can handle nested objects and arrays, returning
* an object that highlights the differences. If no differences are found, it can return
* a boolean indicating whether the objects are equal.
*
* @param originalObj - The original object to compare against.
* @param toCompareObj - The object to compare with the original object.
* @param returnChanges - A boolean flag indicating whether to return the differences
*                        as an object (true) or just a boolean indicating equality (false).
* @returns An object containing the differences between the two objects if returnChanges
*          is true; otherwise, returns a boolean indicating whether the objects are equal.
*
* @example
*  deepCompareObjects('hello', 'hello'); // true
*  deepCompareObjects('hello', 'world'); // false
* 
* @example
* const obj1 = { a: 1, b: { c: 2 } };
* const obj2 = { a: 1, b: { c: 3 } };
* const differences = deepCompareObjects(obj1, obj2, true); // { b: { c: 3 } }
* const areEqual = deepCompareObjects(obj1, obj2); // false
*
* @example
* const arrayWithObject1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
* const arrayWithObject2 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Charlie' }];
* const arrayWithObjectDifferences = deepCompareObjects(arrayWithObject1, arrayWithObject2, true); // [{ id: 2, name: 'Charlie' }]
* const arrayWithObjectAreEqual = deepCompareObjects(arrayWithObject1, arrayWithObject2); // false
*
* @example
* const nestedObj1 = { users: [{ id: 1, name: 'Alice' }], settings: { theme: 'dark' } };
* const nestedObj2 = { users: [{ id: 1, name: 'Alice' }], settings: { theme: 'light' } };
* const nestedDifferences = deepCompareObjects(nestedObj1, nestedObj2, true); // { settings: { theme: 'light' } }
* const nestedAreEqual = deepCompareObjects(nestedObj1, nestedObj2); // false
*/
export const deepCompareObjects = (originalObj: any, toCompareObj: any, returnChanges: boolean = false): boolean | object => {
  if(isString(originalObj) && isString(toCompareObj)) return originalObj === toCompareObj;

  if (Array.isArray(originalObj) && Array.isArray(toCompareObj)) {
    const differences = [];
    for (let i = 0; i < Math.max(originalObj.length, toCompareObj.length); i++) {
      const originalItem = originalObj[i];
      const compareItem = toCompareObj[i];
      if (JSON.stringify(originalItem) !== JSON.stringify(compareItem)) {
        differences.push(compareItem);
      }
    }
    if (originalObj.length !== toCompareObj.length) return returnChanges ? differences : false;

    return returnChanges ? differences : differences.length === 0;
  }
  
  const compare = (originalObj: any, toCompareObj: any) => {
    const result: Record<string, any> = {};  
    for (const key in toCompareObj) {
      if (toCompareObj.hasOwnProperty(key)) {
        if (Array.isArray(toCompareObj?.[key])) {
          if (!Array.isArray(originalObj?.[key]) || originalObj?.[key] === null || originalObj?.[key].length !== toCompareObj?.[key].length) {
            result[key] = toCompareObj?.[key];
          } else {
            const arrayMismatched = toCompareObj?.[key].map((item, index) => {
              if (originalObj?.[key] !== null && originalObj?.[key] !== undefined && index < originalObj?.[key].length) {
                if (typeof item === 'object' && item !== null) {
                  return Object.keys(compare(originalObj?.[key][index], item)).length > 0 ? item : undefined;
                }
                return originalObj?.[key][index] !== item ? item : undefined;
              }
              return item;
            }).filter(item => item !== undefined);
            if (arrayMismatched.length > 0) {
              result[key] = arrayMismatched;
            }
          }
        } else if (typeof toCompareObj?.[key] === 'object' && toCompareObj?.[key] !== null) {
          if (typeof originalObj?.[key] !== 'object' || originalObj?.[key] === null) {
            result[key] = toCompareObj?.[key];
          } else {
            const nestedMismatched = compare(originalObj?.[key], toCompareObj?.[key]);
            if (Object.keys(nestedMismatched).length > 0) {
              result[key] = nestedMismatched;
            }
          }
        } else if (originalObj?.[key] !== null && toCompareObj?.[key] !== null && originalObj?.[key] !== toCompareObj?.[key]) {
          result[key] = toCompareObj?.[key];
        }
      }
    }
    return result;
  };

  const result = compare(originalObj, toCompareObj);

  return returnChanges ? result : Object.keys(result).length === 0;
};

export const deepCompare = deepCompareObjects;

/**
 * Merges two objects deeply, combining their properties.
 * If both objects have properties that are arrays, it merges the arrays and removes duplicates.
 * If properties are objects, it merges them recursively.
 * Excluded keys can be specified to prevent them from being merged.
 *
 * @param obj1 - The first object to merge.
 * @param obj2 - The second object to merge.
 * @param excluded - An array of keys to exclude from merging.
 * @returns A new object that is the result of merging obj1 and obj2.
/**
 * @param excluded - An array of keys to exclude from merging. 
 *                   For example, if you want to merge two objects but skip the key 'password':
 *                   const merged = deepMerge(obj1, obj2, ['password']);
 */
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


/**
 * Filters values in an array against another array.
 * If the value is an object or an array, it will filter deeply.
 *
 * @param sourceArray - The input array.
 * @param valuesToExclude - The array of values to filter against.
 * @param keySelector - An optional function to extract the key to filter by.
 * @returns A new array with values that do not match a value in valuesToExclude.
 *
 * @example
 * const sourceArray = [1, 2, 3, { id: 4 }, { id: 5 }];
 * const valuesToExclude = [2, { id: 5 }];
 * const result = deepExclude(sourceArray, valuesToExclude, item => (typeof item === 'object' ? item.id : item));
 * Result will be [1, 3, { id: 4 }]
 * 
 * @example
 * const sourceArray = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }];
 * const valuesToExclude = [{ id: 2, name: 'Jane' }];
 * const result = deepExclude(sourceArray, valuesToExclude, item => item.id);
 * Result will be [{ id: 1, name: 'John' }, { id: 3, name: 'Bob' }]
 */
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
