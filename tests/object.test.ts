import { removeEmptyKeysEntries, objectToQueryString } from './../src/formatters/object';

describe('removeEmptyKeysEntries', () => {
  it('should remove keys with falsy values', () => {
    const input = { a: 1, b: 0, c: false, d: '', e: null, f: undefined, g: 'hello' };
    const expectedOutput = { a: 1, g: 'hello' };
    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });

  it('should transform values if a transform function is provided', () => {
    const input = { a: [1, 2], b: [3, 4], c: [] };
    const transformFn = (value: number) => value * 2;
    const expectedOutput = { a: [2, 4], b: [6, 8] };
    expect(removeEmptyKeysEntries(input, transformFn)).toEqual(expectedOutput);
  });

  it('should filter values by a specific condition if provided', () => {
    const input = { a: 'apple', b: 'banana', c: 'cherry', d: '' };
    const filterCondition = 'a';
    const expectedOutput = { a: 'apple', b: 'banana' };
    expect(removeEmptyKeysEntries(input, undefined, filterCondition)).toEqual(expectedOutput);
  });

  it('should handle nested objects', () => {
    const input = { a: { x: 1 }, b: { y: 0 }, c: { z: 'hello' } };
    const expectedOutput = { a: { x: 1 }, c: { z: 'hello' } };
    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });

  it('should handle mixed types in the object', () => {
    const input = { a: 1, b: 'hello', c: false, d: null, e: { nested: 'value' }, f: undefined };
    const expectedOutput = { a: 1, b: 'hello', e: { nested: 'value' } };
    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });

  it('should return an empty object when input is empty', () => {
    const input = {};
    const expectedOutput = {};
    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });

  it('should return an empty object when all values are falsy', () => {
    const input = { a: 0, b: '', c: null, d: undefined };
    const expectedOutput = {};
    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });

  it('should handle nested arrays correctly', () => {
    const input = { a: [1, 2, 3], b: ['hello', 'world'], c: [] };
    const transformFn = (value: number) => value * 2;
    const expectedOutput = { a: [2, 4, 6], b: ['hello', 'world'] };
    expect(removeEmptyKeysEntries(input, transformFn)).toEqual(expectedOutput);
  });
});


describe('objectToQueryString', () => {
  
  // Test valid cases

  it('should convert a plain object to a query string', () => {
    const input = { key1: 'value1', key2: 'value2' };
    const result = objectToQueryString(input);
    expect(result).toBe('key1=value1&key2=value2');
  });

  it('should convert a matrix array to a query string', () => {
    const input = [['key1', 'value1'], ['key2', 'value2']];
    const result = objectToQueryString(input);
    expect(result).toBe('key1=value1&key2=value2');
  });

  it('should convert a flat array with key-value pairs to a query string', () => {
    const input = ['key1', 'value1', 'key2', 'value2'];
    const result = objectToQueryString(input);
    expect(result).toBe('key1=value1&key2=value2');
  });

  // Test invalid cases

  it('should throw an error for an invalid matrix format', () => {
    const input = [['key1', 'value1'], 'invalid'];
    expect(() => objectToQueryString(input)).toThrow(new Error("Invalid array format: Expected either an array of key-value pairs (matrix) or a flat array with an even number of elements."));
  });

  it('should throw an error for a flat array with an odd number of elements', () => {
    const input = ['key1', 'value1', 'key2'];
    expect(() => objectToQueryString(input)).toThrow(new Error("Invalid array format: Expected either an array of key-value pairs (matrix) or a flat array with an even number of elements."));
  });

  it('should throw an error for an empty object', () => {
    const input = {};
    expect(() => objectToQueryString(input)).toThrow(new Error("Invalid input format: Expected a non-empty object or a valid array format."));
  });

  it('should throw an error for an empty array', () => {
    const input: any[] = [];
    expect(() => objectToQueryString(input)).toThrow(new Error("Invalid input format: Expected a non-empty object or a valid array format."));
  });
});