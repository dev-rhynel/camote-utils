import { _ } from '../src/chain';

const FIXED_DATE = new Date('2024-12-12T14:15:42+08:00');

jest.useFakeTimers();
jest.setSystemTime(FIXED_DATE);

describe('Chain - Date Operations', () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  describe('isDateWithinRange', () => {
    it('should return true if the current date is within the range', () => {
      const startDate = new Date('2024-12-11');
      const endDate = new Date('2024-12-13');

      const result = _.chain(startDate)
        .isDateWithinRange(endDate)
        .valueOf();

      expect(result).toBe(true);
    });

    it('should return false if the current date is not within the range', () => {
      const startDate = new Date('2024-12-10');
      const endDate = new Date('2024-12-11');

      const result = _.chain(startDate)
        .isDateWithinRange(endDate)
        .valueOf();

      expect(result).toBe(false);
    });
  });
});

// Test suite for the _ class
describe('Chain - String Operations', () => {
  it('should capitalize a string', () => {
    const result = _.chain('hello world').capitalize().valueOf();
    expect(result).toBe('Hello world');
  });

  it('should truncate a string', () => {
    const result = _.chain('hello world').truncate(5).valueOf();
    expect(result).toBe('he...');
  });

  it('should convert a string to camelCase', () => {
    const result = _.chain('hello world').toCamelCase().valueOf();
    expect(result).toBe('helloWorld');
  });

  it('should convert a string to kebab-case', () => {
    const result = _.chain('hello world').toKebabCase().valueOf();
    expect(result).toBe('hello-world');
  });
});

// Test suite for number operations
describe('Chain - Number Operations', () => {
  it('should format a number as currency', () => {
    const result = _.chain(1234.56).formatCurrency('USD', 'en-US').valueOf();
    expect(result).toBe('$1,234.56');
  });

  it('should format a number with commas', () => {
    const result = _.chain(1234567).formatWithCommas().valueOf();
    expect(result).toBe('1,234,567');
  });

  it('should format a number as a percentage', () => {
    const result = _.chain(0.1234).formatPercentage(2).valueOf();
    expect(result).toBe('12.34%');
  });
});

// Test suite for array operations
describe('Chain - Array Operations', () => {
  it('should map over an array', () => {
    const result = _.chain([1, 2, 3]).map(x => x * 2).valueOf();
    expect(result).toEqual([2, 4, 6]);
  });

  it('should filter an array', () => {
    const result = _.chain([1, 2, 3, 4]).filter(x => x % 2 === 0).valueOf();
    expect(result).toEqual([2, 4]);
  });
});

describe('valueOf', () => {
  it('should return the internal value', () => {
    const instance = new _('test value');
    const result = instance.valueOf();
    expect(result).toBe('test value');
  });
});
