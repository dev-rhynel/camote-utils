import {
  humanReadableNumber,
  formatWithCommas,
  formatPercentage,
  formatOrdinal,
  formatFileSize,
  formatCurrency,
  formatDecimals,
  calculateDiscountPrice
} from '../src/formatters/number'

describe('Number Formatters', () => {
  describe('humanReadableNumber', () => {
    it('should format numbers with K suffix', () => {
      expect(humanReadableNumber(1234)).toBe('1.2K')
      expect(humanReadableNumber(5678)).toBe('5.7K')
    })

    it('should format numbers with M suffix', () => {
      expect(humanReadableNumber(1234567)).toBe('1.2M')
    })

    it('should handle numbers less than 1000', () => {
      expect(humanReadableNumber(999)).toBe('999')
    })

    it('should format numbers with specified decimals', () => {
      expect(humanReadableNumber(1234, { decimals: 1 })).toBe('1.2K')
      expect(humanReadableNumber(1500, { decimals: 0 })).toBe('2K')
    })

    it('should format numbers in compact representation', () => {
      expect(humanReadableNumber(1500, { compact: true })).toBe('1.5K')
      expect(humanReadableNumber(1500000, { compact: true })).toBe('1.5M')
    })
  })

  describe('formatWithCommas', () => {
    it('should add commas to large numbers', () => {
      expect(formatWithCommas(1234567)).toBe('1,234,567')
    })

    it('should handle numbers less than 1000', () => {
      expect(formatWithCommas(999)).toBe('999')
    })

    it('should handle zero', () => {
      expect(formatWithCommas(0)).toBe('0')
    })
  })

  describe('formatPercentage', () => {
    it('should format number as percentage with default decimals', () => {
      expect(formatPercentage(0.1234)).toBe('12%')
    })

    it('should format number as percentage with specified decimals', () => {
      expect(formatPercentage(0.1234, 1)).toBe('12.3%')
    })

    it('should handle zero', () => {
      expect(formatPercentage(0)).toBe('0%')
    })
  })

  describe('formatOrdinal', () => {
    it('should format numbers with st suffix', () => {
      expect(formatOrdinal(1)).toBe('1st')
      expect(formatOrdinal(21)).toBe('21st')
    })

    it('should format numbers with nd suffix', () => {
      expect(formatOrdinal(2)).toBe('2nd')
      expect(formatOrdinal(22)).toBe('22nd')
    })

    it('should format numbers with rd suffix', () => {
      expect(formatOrdinal(3)).toBe('3rd')
      expect(formatOrdinal(23)).toBe('23rd')
    })

    it('should format numbers with th suffix', () => {
      expect(formatOrdinal(4)).toBe('4th')
      expect(formatOrdinal(11)).toBe('11th')
      expect(formatOrdinal(12)).toBe('12th')
      expect(formatOrdinal(13)).toBe('13th')
    })
  })

  describe('formatFileSize', () => {
    it('should format bytes', () => {
      expect(formatFileSize(500)).toBe('500 Bytes')
    })

    it('should format kilobytes', () => {
      expect(formatFileSize(1024)).toBe('1.00 KB')
    })

    it('should format megabytes', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1.00 MB')
    })

    it('should handle zero', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
    })
  })

  describe('formatCurrency', () => {
    it('should format USD by default', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })

    it('should format with specified currency and locale', () => {
      const formatted = formatCurrency(1234.56, 'EUR', 'de-DE')
      expect(formatted).toMatch(/1[.,]234[.,]56\s*€/)
    })

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0.00')
    })
  })

  describe('formatDecimals', () => {
    it('should format with specified decimal places', () => {
      expect(formatDecimals(1.2345, 2)).toBe('1.23')
    })

    it('should round up with ceil mode', () => {
      expect(formatDecimals(1.2345, 2, 'ceil')).toBe('1.24')
    })

    it('should round down with floor mode', () => {
      expect(formatDecimals(1.2345, 2, 'floor')).toBe('1.23')
    })

    it('should handle zero', () => {
      expect(formatDecimals(0, 2)).toBe('0.00')
    })
  })

  describe('calculateDiscountPrice', () => {
    test('should calculate percentage discount correctly', () => {
      expect(calculateDiscountPrice(100, 20, '%')).toBe(80.00)
      expect(calculateDiscountPrice(50, 10, '%')).toBe(45.00)
      expect(calculateDiscountPrice(75.50, 15, '%')).toBe(64.17)
    })

    test('should calculate fixed amount discount correctly', () => {
      expect(calculateDiscountPrice(100, 30, '$')).toBe(70.00)
      expect(calculateDiscountPrice(50, 10, '$')).toBe(40.00)
      expect(calculateDiscountPrice(75.50, 15.50, '$')).toBe(60.00)
    })

    test('should default to percentage discount when no type is specified', () => {
      expect(calculateDiscountPrice(100, 10)).toBe(90.00)
      expect(calculateDiscountPrice(50, 20)).toBe(40.00)
      expect(calculateDiscountPrice(75.50, 25)).toBe(56.63)
    })

    test('should handle edge cases correctly', () => {
      // 100% discount
      expect(calculateDiscountPrice(100, 100, '%')).toBe(0.00)
      // 0% discount
      expect(calculateDiscountPrice(100, 0, '%')).toBe(100.00)
      // Discount greater than price
      expect(calculateDiscountPrice(50, 75, '$')).toBe(-25.00)
      // Zero price
      expect(calculateDiscountPrice(0, 20, '%')).toBe(0.00)
    })

    test('should round to 2 decimal places', () => {
      expect(calculateDiscountPrice(100.33, 33.33, '%')).toBe(66.89)
      expect(calculateDiscountPrice(50.55, 10.55, '$')).toBe(40.00)
      expect(calculateDiscountPrice(75.99, 25)).toBe(56.99)
    })
  })
})
