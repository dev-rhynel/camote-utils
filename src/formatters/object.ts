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

/**
 * Converts an object, array of key-value pairs (matrix), or a flat array of alternating keys and values into a URL query string.
 * The function can handle different input formats:
 * - A plain object (Record<string, any>),
 * - A matrix (an array of arrays, where each sub-array has two elements representing a key-value pair),
 * - A flat array with an even number of elements, where each even-indexed element is a key, and the following odd-indexed element is its corresponding value.
 * 
 * The function throws an error if the input is invalid, such as a malformed array or empty object.
 * 
 * @param {Record<string, any> | Array<Array<any>> | Array<any>} obj - The input to be converted into a query string. This can be:
 *    - A plain object (e.g., `{ key1: 'value1', key2: 'value2' }`),
 *    - An array of key-value pairs (e.g., `[ ['key1', 'value1'], ['key2', 'value2'] ]`),
 *    - A flat array (e.g., `['key1', 'value1', 'key2', 'value2']`).
 * 
 * @returns {string} The resulting query string in the form of `key1=value1&key2=value2`.
 * 
 * @throws {Error} Throws an error if the input format is invalid:
 *    - If the array format is incorrect (e.g., an array that is not a matrix or a flat array with an even number of elements),
 *    - If the object is empty or null.
 * 
 * @example
 * // Using a plain object
 * objectToQueryString({ key1: 'value1', key2: 'value2' });
 * // Returns: "key1=value1&key2=value2"
 * 
 * // Using a matrix (array of key-value pairs)
 * objectToQueryString([['key1', 'value1'], ['key2', 'value2']]);
 * // Returns: "key1=value1&key2=value2"
 * 
 * // Using a flat array
 * objectToQueryString(['key1', 'value1', 'key2', 'value2']);
 * // Returns: "key1=value1&key2=value2"
 *
 * // Throws an error for an invalid array format
 * objectToQueryString([['key1', 'value1'], 'invalid']);
 * // Throws: Error: Invalid array format: Expected either an array of key-value pairs (matrix) or a flat array with an even number of elements.
 * 
 * // Throws an error for an empty object / array
 * objectToQueryString([]);
 * objectToQueryString({});
 * // Throws: Error: Invalid input format: Expected a non-empty object or a valid array format.
 */

export const objectToQueryString = (obj: Record<string, any> | Array<Array<any>> | Array<any>): string => {
  if (Array.isArray(obj) && obj.length > 0) {
   const isMatrix = obj.every(item => Array.isArray(item) && item.length == 2);
   if (isMatrix) {
     return new URLSearchParams(obj).toString();
   }

   const isFlatArray = obj.every(item => typeof item !== "object") && obj.length % 2 == 0;
   if (isFlatArray) {
     //const newObj = Array.from({length: Math.ceil(obj.length / 2)}, (v, i) => obj.slice(i * 2, i * 2 + 2 )).filter(x => x.length == 2);
     const newObj = obj.reduce((acc, curr, idx, array) => {
       if (idx % 2 == 0) {
          acc[curr] = array[idx + 1];
       }
       return acc;
     }, {} as Record<string, any>);

     return new URLSearchParams(newObj).toString();
   }

   throw new Error("Invalid array format: Expected either an array of key-value pairs (matrix) or a flat array with an even number of elements.");
  }


  if (typeof obj === "object" && obj !== null && Object.entries(obj).length > 0) {
   return new URLSearchParams(obj).toString();
  }


  throw new Error("Invalid input format: Expected a non-empty object or a valid array format.");
};
