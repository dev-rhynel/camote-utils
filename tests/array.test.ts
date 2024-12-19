import { removeDuplicates, flattenArray, filterArray, transformArray } from '../src/formatters/array';

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

});