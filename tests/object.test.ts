import { removeEmptyKeysEntries, objectToQueryString, objectFilterByKeys } from './../src/formatters/object';

describe('removeEmptyKeysEntries', () => {
  it('removes keys with empty values', () => {
    const input = {
      a: 1,
      b: null,
      c: undefined,
      d: '',
      e: [],
      f: {},
      g: 0,
      h: 'value',
      i: [1, 2, 3],
    };

    const expectedOutput = {
      a: 1,
      g: 0,
      h: 'value',
      i: [1, 2, 3],
    };

    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });

  it('removes nested keys with empty values', () => {
    const input = {
      a: 1,
      b: {
        b1: null,
        b2: 2,
        b3: '',
      },
      c: {
        c1: [],
        c2: {
          c21: 3,
          c22: {},
          c23: null,
        },
      },
      d: 0,
    };

    const expectedOutput = {
      a: 1,
      b: { b2: 2 },
      c: { c2: { c21: 3 } },
      d: 0,
    };

    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });

  it('handles empty objects', () => {
    const input = {};
    const expectedOutput = {};
    expect(removeEmptyKeysEntries(input)).toEqual(expectedOutput);
  });
});

describe('objectToQueryString', () => {
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

describe('objectFilterByKeys', () => {
  it('should filter a user object by dynamic keys', () => {
    const input = { a: 1, b: 2 }
    const expectedOutput = { a: 1 } 
    expect(objectFilterByKeys(input, ['a'])).toEqual(expectedOutput)
  })
})