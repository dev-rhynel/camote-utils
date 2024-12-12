import { isDateWithinRange } from '../src/formatters/date';

describe('Date Formatter', () => {
  describe('isDateWithinRange', () => {
    const FIXED_DATE = new Date('2024-12-12T14:15:42+08:00');

    beforeEach(() => {
      // Mock the current date to our fixed test date
      jest.useFakeTimers();
      jest.setSystemTime(FIXED_DATE);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    describe('null handling', () => {
      it('should return false when start date is null', () => {
        expect(isDateWithinRange(null, new Date())).toBe(false);
      });

      it('should return false when end date is null', () => {
        expect(isDateWithinRange(new Date(), null)).toBe(false);
      });

      it('should return false when both dates are null', () => {
        expect(isDateWithinRange(null, null)).toBe(false);
      });
    });

    describe('date range validation', () => {
      it('should return true when current date is within range', () => {
        const startDate = new Date('2024-01-01T00:00:00+08:00');
        const endDate = new Date('2024-12-31T00:00:00+08:00');
        expect(isDateWithinRange(startDate, endDate)).toBe(true);
      });

      it('should return false when current date is before start date', () => {
        const startDate = new Date('2025-01-01T00:00:00+08:00');
        const endDate = new Date('2025-12-31T00:00:00+08:00');
        expect(isDateWithinRange(startDate, endDate)).toBe(false);
      });

      it('should return false when current date is after end date', () => {
        const startDate = new Date('2023-01-01T00:00:00+08:00');
        const endDate = new Date('2023-12-31T00:00:00+08:00');
        expect(isDateWithinRange(startDate, endDate)).toBe(false);
      });
    });

    describe('same day scenarios', () => {
      it('should return true for same day range', () => {
        const today = new Date(FIXED_DATE);
        expect(isDateWithinRange(today, today)).toBe(true);
      });

      it('should handle start of day', () => {
        const today = new Date(FIXED_DATE);
        today.setHours(0, 0, 0, 0);
        expect(isDateWithinRange(today, today)).toBe(true);
      });

      it('should handle end of day', () => {
        const today = new Date(FIXED_DATE);
        today.setHours(23, 59, 59, 999);
        expect(isDateWithinRange(today, today)).toBe(true);
      });
    });

    describe('time handling', () => {
      it('should consider start date from beginning of day', () => {
        const startDate = new Date(FIXED_DATE);
        startDate.setHours(23, 59, 59, 999); // End of current day
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); // Next day
        expect(isDateWithinRange(startDate, endDate)).toBe(true);
      });

      it('should consider end date until end of day', () => {
        const startDate = new Date(FIXED_DATE);
        startDate.setDate(startDate.getDate() - 1); // Previous day
        const endDate = new Date(FIXED_DATE);
        endDate.setHours(0, 0, 0, 0); // Start of current day
        expect(isDateWithinRange(startDate, endDate)).toBe(true);
      });
    });
  });
});
