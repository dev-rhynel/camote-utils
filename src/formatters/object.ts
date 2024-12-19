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
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}