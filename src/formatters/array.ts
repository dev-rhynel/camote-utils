/**
 * Removes duplicate values from an array.
 *
 * @param arr - The input array.
 * @returns A new array with duplicate values removed.
 */
export const removeDuplicates = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

/**
 * Flattens a nested array into a single-level array.
 *
 * @param arr - The input nested array.
 * @returns A new flattened array.
 */
export const flattenArray = <T>(arr: T[][]): T[] => {
  return arr.flat();
};

/**
 * Filters values in an array based on a provided condition.
 *
 * @param arr - The input array.
 * @param conditionFn - A function that returns true for values to keep.
 * @returns A new array with values that meet the condition.
 */
export const filterArray = <T>(arr: T[], conditionFn: (value: T) => boolean): T[] => {
  return arr.filter(conditionFn);
};

/**
 * Transforms each value in an array using a provided function.
 *
 * @param arr - The input array.
 * @param transformFn - A function to transform each value.
 * @returns A new array with transformed values.
 */
export const transformArray = <T, U>(arr: T[], transformFn: (value: T) => U): U[] => {
  return arr.map(transformFn);
};

/**
 * Capitalizes the first letter of each word in each string of the array.
 * This function is case-sensitive and will capitalize the first letter of each word
 * regardless of its position in the string. It uses a regular expression to match
 * word boundaries and the 'replace' method to replace the matched characters with
 * their uppercase equivalent.
 * 
 * @param array - The input array of strings
 * @returns A new array with each string capitalized
 * @throws Error if the input is not an array
 */
export const capitalizeEach = (array: string[]): string[] => {
  if (!Array.isArray(array)) {
    throw new Error('Capitalize each can only be called on arrays');
  }
  return array.map(item => item.replace(/\b\w/g, char => char.toUpperCase()));
};

/**
 * Joins array elements into a string using a specified delimiter.
 * Similar to PHP's implode function.
 * @param arr - The input array
 * @param delimiter - The delimiter to join the elements
 * @returns A string with the array elements joined
 * @example
 * implode(["Hello", "World"], " ") // "Hello World"
 * implode([1, 2, 3]) // "1,2,3"
 * implode([1, 2, 3], '-') // "1-2-3"
 */
export const implode = <T>(arr: T[], delimiter: string = ','): string => {
  return arr.join(delimiter);
};