import { deepClone, deepCompareObjects, deepCompare, deepMerge, deepExclude } from '../src/formatters/deep';

describe('deepClone', () => {
  it('should create a deep copy of a simple object', () => {
    const original = { a: 1, b: 2 };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should create a deep copy of a nested object', () => {
    const original = { a: { b: { c: 3 } } };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned.a).not.toBe(original.a);
    expect(cloned.a.b).not.toBe(original.a.b);
  });

  it('should create a deep copy of an array', () => {
    const original = [1, 2, 3];
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should create a deep copy of a nested array', () => {
    const original = [[1, 2], [3, 4]];
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned[0]).not.toBe(original[0]);
  });

  it('should create a deep copy of a date', () => {
    const original = new Date();
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should handle null and undefined', () => {
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('should create a deep copy of a complex object', () => {
    const original = {
      name: "John",
      age: 30,
      hobbies: ["reading", "gaming"],
      details: {
        birthDate: new Date(),
        address: {
          city: "New York",
          zip: "10001"
        }
      }
    };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.hobbies).not.toBe(original.hobbies);
    expect(cloned.details).not.toBe(original.details);
    expect(cloned.details.address).not.toBe(original.details.address);
  });
});

describe('deepCompareObjects', () => {
  test('should return differences between two objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    const differences = deepCompareObjects(obj1, obj2, true);
    expect(differences).toEqual({ b: { c: 3 } });
  });

  test('should return false for unequal objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    const areEqual = deepCompareObjects(obj1, obj2);
    expect(areEqual).toBe(false);
  });

  test('should return differences between two arrays of objects', () => {
    const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const array2 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Charlie' }];
    const arrayDifferences = deepCompareObjects(array1, array2, true);
    expect(arrayDifferences).toEqual([{ id: 2, name: 'Charlie' }]);
  });

  test('should return differences for nested objects', () => {
    const nestedObj1 = { users: [{ id: 1, name: 'Alice' }], settings: { theme: 'dark' } };
    const nestedObj2 = { users: [{ id: 1, name: 'Alice' }], settings: { theme: 'light' } };
    const nestedDifferences = deepCompareObjects(nestedObj1, nestedObj2, true);
    expect(nestedDifferences).toEqual({ settings: { theme: 'light' } });
  });
});

describe('deepCompare', () => {
  test('should return true for equal between two string', () => {
    const str1 = 'hello';
    const str2 = 'hello';
    const differences = deepCompare(str1, str2);
    expect(differences).toEqual(true);
  });

  test('should return true for null', () => {
    const str1 = null;
    const str2 = 'hello';
    const differences = deepCompare(str1, str2);
    expect(differences).toEqual(false);
  });

  test('should return true for equal between two arrays', () => {
    const array1 = ['Alice', 'James'];
    const array2 = ['Alice'];
    const differences = deepCompare(array1, array2);
    expect(differences).toEqual(false);
  })

  test('should return differences between two arrays', () => {
    const array1 = ['Alice'];
    const array2 = ['Alice', 'James'];

    const differences = deepCompare(array1, array2, true);
    expect(differences).toEqual(['James']);
  })

  test('should return differences between two objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    const differences = deepCompare(obj1, obj2, true);
    expect(differences).toEqual({ b: { c: 3 } });
  });

  test('should return false for unequal objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    const areEqual = deepCompare(obj1, obj2);
    expect(areEqual).toBe(false);
  });

  test('should return differences between two arrays of objects', () => {
    const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const array2 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Charlie' }];
    const arrayDifferences = deepCompare(array1, array2, true);
    expect(arrayDifferences).toEqual([{ id: 2, name: 'Charlie' }]);
  });

  test('should return differences for nested objects', () => {
    const nestedObj1 = { users: [{ id: 1, name: 'Alice' }], settings: { theme: 'dark' } };
    const nestedObj2 = { users: [{ id: 1, name: 'Alice' }], settings: { theme: 'light' } };
    const nestedDifferences = deepCompare(nestedObj1, nestedObj2, true);
    expect(nestedDifferences).toEqual({ settings: { theme: 'light' } });
  });
});

describe('deepExclude', () => {
  test('should exclude specified values from the array', () => {
    const sourceArray = [1, 2, 3, { id: 4 }, { id: 5 }];
    const valuesToExclude = [2, { id: 5 }];
    const result = deepExclude(sourceArray, valuesToExclude, item => (typeof item === 'object' ? item.id : item));
    expect(result).toEqual([1, 3, { id: 4 }]);
  });

  test('should exclude specified objects from the array based on key', () => {
    const sourceArray = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }];
    const valuesToExclude = [{ id: 2, name: 'Jane' }];
    const result = deepExclude(sourceArray, valuesToExclude, item => item.id);
    expect(result).toEqual([{ id: 1, name: 'John' }, { id: 3, name: 'Bob' }]);
  });

  test('should handle null values correctly', () => {
    const sourceArray = [null, { id: 1 }, { id: 2 }];
    const valuesToExclude = [null, { id: 2 }];
    const result = deepExclude(sourceArray, valuesToExclude, item => (typeof item === 'object' ? item?.id : item));
    expect(result).toEqual([{ id: 1 }]);
  });

  test('should handle arrays of primitive values', () => {
    const sourceArray = [1, 2, 3, 4];
    const valuesToExclude = [2, 4];
    const result = deepExclude(sourceArray, valuesToExclude);
    expect(result).toEqual([1, 3]);
  });

  it('should exclude specified values from an array of strings', () => {
    const sourceArray = ['apple', 'banana', 'cherry', 'date'];
    const valuesToExclude = ['banana', 'date'];
    const result = deepExclude(sourceArray, valuesToExclude);
    expect(result).toEqual(['apple', 'cherry']);
  });
});


describe('deepMerge', () => {
  it('should merge two simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3 };
    const merged = deepMerge(obj1, obj2);
    expect(merged).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should merge nested objects', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { c: 2 }, d: 3 };
    const merged = deepMerge(obj1, obj2);
    expect(merged).toEqual({ a: { b: 1, c: 2 }, d: 3 });
  });

  it('should merge arrays', () => {
    const obj1 = { arr: [1, 2] };
    const obj2 = { arr: [2, 3] };
    const merged = deepMerge(obj1, obj2);
    expect(merged).toEqual({ arr: [1, 2, 3] });
  });

  it('should exclude specified keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4, e: 5 };
    const merged = deepMerge(obj1, obj2, ['d', 'e']);
    expect(merged).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should merge arrays correctly without duplicates', () => {
    const obj1 = { arr: [1, 2, 3] };
    const obj2 = { arr: [3, 4, 5] };
    const merged = deepMerge(obj1, obj2);
    expect(merged).toEqual({ arr: [1, 2, 3, 4, 5] });
  });
});