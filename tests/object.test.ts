import { deepClone } from '../src/formatters/object';

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