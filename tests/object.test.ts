import { deepClone, deepCompareObjects  } from '../src/formatters/object';

describe('deepClone', () => {
    it('should create a deep copy of an object', () => {
        const original = { a: 1, b: { c: 2 } };
        const copy = deepClone(original);
        
        // Verify that the copy is a different object
        expect(copy).not.toBe(original);
        
        // Verify that the properties are equal
        expect(copy).toEqual(original);
        
        // Modify the copy and ensure the original is not affected
        copy.b.c = 3;
        expect(original.b.c).toBe(2); // Original should remain unchanged
    });

    it('should handle arrays', () => {
        const original = [1, 2, [3, 4]];
        const copy = deepClone(original);
        
        expect(copy).not.toBe(original);
        expect(copy).toEqual(original);
        
        // Modify the copy and ensure the original is not affected
        (copy[2] as number[])[0] = 5;
        expect((original[2] as number[])[0]).toBe(3); // Original should remain unchanged
        expect(original[2]).toEqual([3, 4]); // Ensure the original array remains unchanged
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