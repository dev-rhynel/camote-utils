interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * Checks if the current date is within the given date range
 * If either start or end date is null, returns false
 * End date is set to end of day (23:59:59.999)
 * @param startDate Start date of the range
 * @param endDate End date of the range
 * @returns boolean indicating if current date is within range
 */
export const isDateWithinRange = (
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  const now = new Date();

  if (!startDate || !endDate) return false;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Set start date to start of day
  start.setHours(0, 0, 0, 0);
  // Set end date to end of day
  end.setHours(23, 59, 59, 999);

  return now >= start && now <= end;
};