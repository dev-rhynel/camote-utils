/**
 * Removes keys from an object where the associated value is falsy.
 *
 * This function takes an object with string keys and any values,
 * and returns a new object containing only the keys with non-falsy values.
 * It can also transform the values and filter by a specific condition.
 *
 * @param obj - The input object to be filtered.
 * @param transformFn - An optional function to transform the values.
 * @param filterCondition - An optional string to filter values that must contain this string.
 * @returns A new object containing only the keys with non-falsy values.
 */
export const removeEmptyKeysEntries = (
  obj: Record<string, any>, // Allow any type for more flexibility
  transformFn?: (value: any) => any,
  filterCondition?: string
): Record<string, any> => {
  // Helper function to determine if a key-value pair should be included
  const shouldInclude = ([_, value]: [string, any]): boolean => {
    const hasValues = Array.isArray(value) ? value.length > 0 : Boolean(value);
    const meetsCondition = filterCondition ? value.includes(filterCondition) : true;
    return hasValues && meetsCondition;
  };

  // Helper function to transform values if a transformation function is provided
  const transformValues = (value: any): any => {
    return transformFn ? value.map(transformFn) : value;
  };

  // Main logic to filter and transform the object entries
  return Object.fromEntries(
    Object.entries(obj)
      .filter(shouldInclude) // Filter based on inclusion criteria
      .map(([key, value]) => [key, transformValues(value)]) // Transform values
  );
};

/**
 * Creates a deep copy of an object.
 *
 * This function takes an object and returns a new object that is a deep copy of the original.
 * It handles nested objects and arrays.
 *
 * @param obj - The object to be cloned.
 * @returns A new object that is a deep copy of the original.
 */
export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
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
  if (Array.isArray(originalObj) && Array.isArray(toCompareObj)) {
    const differences = originalObj.map((item, index) => {
        if (JSON.stringify(item) !== JSON.stringify(toCompareObj[index])) {
            return toCompareObj[index];
        }
    }).filter(Boolean); // Filter out undefined values
    return returnChanges ? differences : differences.length === 0;
  }
  
  const compare = (originalObj: any, toCompareObj: any) => {
    const result: Record<string, any> = {}; 
    for (const key in toCompareObj) {
      if (toCompareObj.hasOwnProperty(key)) {
        if (Array.isArray(toCompareObj[key])) {
          if (!Array.isArray(originalObj[key]) || originalObj[key].length !== toCompareObj[key].length) {
            result[key] = toCompareObj[key];
          } else {
            const arrayMismatched = toCompareObj[key].map((item, index) => {
              if (typeof item === 'object' && item !== null) {
                return Object.keys(compare(originalObj[key][index], item)).length > 0 ? item : undefined;
              }
              return originalObj[key][index] !== item ? item : undefined;
            }).filter(item => item !== undefined);
            if (arrayMismatched.length > 0) {
              result[key] = arrayMismatched;
            }
          }
        } else if (typeof toCompareObj[key] === 'object' && toCompareObj[key] !== null) {
          if (typeof originalObj[key] !== 'object' || originalObj[key] === null) {
            result[key] = toCompareObj[key];
          } else {
            const nestedMismatched = compare(originalObj[key], toCompareObj[key]);
            if (Object.keys(nestedMismatched).length > 0) {
              result[key] = nestedMismatched;
            }
          }
        } else if (originalObj[key] !== toCompareObj[key]) {
          result[key] = toCompareObj[key];
        }
      }
    }
    return result;
  };

  const result = compare(originalObj, toCompareObj);

  return returnChanges ? result : Object.keys(result).length === 0;
};
