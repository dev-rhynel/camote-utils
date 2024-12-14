interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * Checks if a specified date is within the given date range.
 * If either start or end date is null, returns false.
 * End date is set to the end of the day (23:59:59.999).
 * @param startDate Start date of the range
 * @param endDate End date of the range
 * @param date The date to check (defaults to the current date)
 * @returns boolean indicating if the specified date is within the range
 * @example
 * isDateWithinRange(new Date('2024-01-01'), new Date('2024-01-10')); // true
 */
export const isDateWithinRange = (
  startDate: Date | null,
  endDate: Date | null,
  date: Date | null = new Date()
): boolean => {
  if (!startDate || !endDate || !date) return false;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Set start date to start of day
  start.setHours(0, 0, 0, 0);
  // Set end date to end of day
  end.setHours(23, 59, 59, 999);

  return date >= start && date <= end;
};