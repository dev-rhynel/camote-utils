/**
 * Removes keys from an object where the associated value is falsy.
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
  obj: Record<string, any>,
  transformFn?: (value: any) => any,
  filterCondition?: string | number
): Record<string, any> => {
  const shouldInclude = ([_, value]: [string, any]): boolean => {
    const hasValues = Array.isArray(value) ? value.length > 0 : Boolean(value);
    const meetsCondition = filterCondition ? value.includes(filterCondition) : true;
    return hasValues && meetsCondition;
  };

  const transformValues = (value: any): any => {
    if (Array.isArray(value)) {
      return transformFn ? value.map(v => typeof v === 'number' ? transformFn(v) : v) : value;
    } else if (typeof value === 'object' && value !== null) {
      const nestedObj = removeEmptyKeysEntries(value, transformFn, filterCondition);
      return Object.keys(nestedObj).length > 0 ? nestedObj : null;
    }
    return typeof value === 'number' && transformFn ? transformFn(value) : value;
  };

  return Object.fromEntries(
    Object.entries(obj)
      .filter(shouldInclude)
      .map(([key, value]) => [key, transformValues(value)])
      .filter(([_, value]) => value !== null && value !== undefined) // Exclude null/undefined values
  );
};
