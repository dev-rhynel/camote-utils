import { isDateWithinRange } from '../src/formatters/date';

describe('Date Formatter', () => {
  describe('isDateWithinRange', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    test('should return true for a date within the range', () => {
        const date = new Date('2024-01-15');
        expect(isDateWithinRange(startDate, endDate, date)).toBe(true);
    });

    test('should return true for a date equal to the start date', () => {
        const date = new Date('2024-01-01');
        expect(isDateWithinRange(startDate, endDate, date)).toBe(true);
    });

    test('should return true for a date equal to the end date', () => {
        const date = new Date('2024-01-31');
        expect(isDateWithinRange(startDate, endDate, date)).toBe(true);
    });

    test('should return false for a date outside the range', () => {
        const date = new Date('2024-02-01');
        expect(isDateWithinRange(startDate, endDate, date)).toBe(false);
    });

    test('should return false if start date is null', () => {
        const date = new Date('2024-01-15');
        expect(isDateWithinRange(null, endDate, date)).toBe(false);
    });

    test('should return false if end date is null', () => {
        const date = new Date('2024-01-15');
        expect(isDateWithinRange(startDate, null, date)).toBe(false);
    });
  });
});