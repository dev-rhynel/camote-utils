import { removeDuplicates, flattenArray, filterArray, transformArray, capitalizeEach, implode } from '../src/formatters/array';

describe('Array Manipulation Functions', () => {
  
  describe('removeDuplicates', () => {
    it('should remove duplicate values from an array', () => {
      const input = [1, 2, 2, 3, 4, 4, 5];
      const expectedOutput = [1, 2, 3, 4, 5];
      expect(removeDuplicates(input)).toEqual(expectedOutput);
    });

    it('should return an empty array when input is empty', () => {
      expect(removeDuplicates([])).toEqual([]);
    });
  });

  describe('flattenArray', () => {
    it('should flatten a nested array', () => {
      const input = [[1, 2], [3, 4], [5]];
      const expectedOutput = [1, 2, 3, 4, 5];
      expect(flattenArray(input)).toEqual(expectedOutput);
    });

    it('should return an empty array when input is empty', () => {
      expect(flattenArray([])).toEqual([]);
    });
  });

  describe('filterArray', () => {
    it('should filter values based on a condition', () => {
      const input = [1, 2, 3, 4, 5];
      const conditionFn = (value: number) => value > 3;
      const expectedOutput = [4, 5];
      expect(filterArray(input, conditionFn)).toEqual(expectedOutput);
    });

    it('should return an empty array if no values meet the condition', () => {
      const input = [1, 2, 3];
      const conditionFn = (value: number) => value > 5;
      expect(filterArray(input, conditionFn)).toEqual([]);
    });
  });

  describe('transformArray', () => {
    it('should transform each value in the array', () => {
      const input = [1, 2, 3];
      const transformFn = (value: number) => value * 2;
      const expectedOutput = [2, 4, 6];
      expect(transformArray(input, transformFn)).toEqual(expectedOutput);
    });

    it('should return an empty array when input is empty', () => {
      const transformFn = (value: number) => value * 2;
      expect(transformArray([], transformFn)).toEqual([]);
    });
  });

  describe('capitalizeEach', () => {
    it('should capitalize the first letter of each word in each string', () => {
      const input = ['hello world', 'goodbye world'];
      const expectedOutput = ['Hello World', 'Goodbye World'];
      expect(capitalizeEach(input)).toEqual(expectedOutput);
    });

    it('should handle an empty array', () => {
      const input: string[] = [];
      const expectedOutput: string[] = [];
      expect(capitalizeEach(input)).toEqual(expectedOutput);
    });

    it('should throw an error if the input is not an array', () => {
      expect(() => capitalizeEach('not an array' as any)).toThrow('Capitalize each can only be called on arrays');
    });
  });

  
  describe('Array Utility Functions', () => {
    describe('implode', () => {
      it('should join array elements into a string with a specified delimiter', () => {
        const result = implode(["Hello", "World"], " ");
        expect(result).toBe("Hello World");
      });

      it('should return an empty string for an empty array', () => {
        const result = implode([], " ");
        expect(result).toBe("");
      });

      it('should join a single element array', () => {
        const result = implode(["Hello"], " ");
        expect(result).toBe("Hello");
      });
    });
  });
});