import { deepClone, deepCompareObjects  } from '../src/formatters/deep';

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