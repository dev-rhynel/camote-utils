import {
  humanReadableNumber,
  formatWithCommas,
  formatPercentage,
  formatOrdinal,
  formatFileSize,
  formatCurrency,
  formatDecimals
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
})
