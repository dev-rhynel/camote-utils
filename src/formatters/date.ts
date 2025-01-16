interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export const isDateWithinRange = (
  startDate: Date | null,
  endDate: Date | null,
  date: Date | null = new Date()
): boolean => {
  if (!startDate || !endDate || !date) return false

  const start = new Date(startDate)
  const end = new Date(endDate)

  start.setHours(0, 0, 0, 0)

  end.setHours(23, 59, 59, 999)

  return date >= start && date <= end
}