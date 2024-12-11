/**
 * Formats a number into a human-readable string with K, M, B, T suffixes
 * @param num - The number to format
 * @returns A formatted string representation of the number
 * @example
 * humanReadableNumber(1234) // "1.2K"
 * humanReadableNumber(1000000) // "1.0M"
 */
export const humanReadableNumber = (num: number): string => {
  if (num < 1000) return num.toString()

  const units = ['K', 'M', 'B', 'T']
  const order = Math.floor(Math.log10(num) / 3)
  const unitName = units[order - 1]
  const formattedNum = (num / Math.pow(1000, order)).toFixed(1)

  return `${formattedNum}${unitName}`
}

/**
 * Formats a number with commas as thousand separators
 * @param num - The number to format
 * @returns A string with comma-separated thousands
 * @example
 * formatWithCommas(1234567) // "1,234,567"
 */
export const formatWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * Formats a number as a percentage
 * @param num - The number to format (0-1)
 * @param decimals - Number of decimal places (default: 0)
 * @returns A percentage string
 * @example
 * formatPercentage(0.1234) // "12%"
 * formatPercentage(0.1234, 1) // "12.3%"
 */
export const formatPercentage = (num: number, decimals: number = 0): string => {
  return `${(num * 100).toFixed(decimals)}%`
}

/**
 * Formats a number as an ordinal string (1st, 2nd, 3rd, etc.)
 * @param num - The number to format
 * @returns A string with the ordinal suffix
 * @example
 * formatOrdinal(1) // "1st"
 * formatOrdinal(2) // "2nd"
 * formatOrdinal(3) // "3rd"
 * formatOrdinal(4) // "4th"
 */
export const formatOrdinal = (num: number): string => {
  const j = num % 10
  const k = num % 100
  if (j === 1 && k !== 11) return num + "st"
  if (j === 2 && k !== 12) return num + "nd"
  if (j === 3 && k !== 13) return num + "rd"
  return num + "th"
}

/**
 * Formats a number of bytes into a human-readable string
 * @param bytes - The number of bytes to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns A formatted string representation of the file size
 * @example
 * formatFileSize(1234) // "1.21 KB"
 * formatFileSize(1234567) // "1.18 MB"
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes"
  
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i > 0 ? decimals : 0)} ${sizes[i]}`
}

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale to use (default: 'en-US')
 * @returns A formatted currency string
 * @example
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, 'EUR', 'de-DE') // "1.234,56 €"
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Formats a number with specified decimal places and rounding
 * @param num - The number to format
 * @param decimals - Number of decimal places
 * @param roundingMode - Rounding mode ('ceil', 'floor', or 'round', default: 'round')
 * @returns A formatted number string
 * @example
 * formatDecimals(1.2345, 2) // "1.23"
 * formatDecimals(1.2345, 2, 'ceil') // "1.24"
 * formatDecimals(1.2345, 2, 'floor') // "1.23"
 */
export const formatDecimals = (
  num: number,
  decimals: number,
  roundingMode: 'ceil' | 'floor' | 'round' = 'round'
): string => {
  const factor = Math.pow(10, decimals)
  let result: number
  
  switch (roundingMode) {
    case 'ceil':
      result = Math.ceil(num * factor) / factor
      break
    case 'floor':
      result = Math.floor(num * factor) / factor
      break
    default:
      result = Math.round(num * factor) / factor
  }
  
  return result.toFixed(decimals)
}

/**
 * Calculates the final price after applying a discount
 * @param originalPrice - The original price before discount
 * @param discountAmount - The amount of discount to apply
 * @param discountType - The type of discount ('%' for percentage, '$' for fixed amount)
 * @returns The price after applying the discount, rounded to 2 decimal places
 * @example
 * calculateDiscountPrice(100, 20, '%')  // 80.00 (20% off)
 * calculateDiscountPrice(100, 30, '$')  // 70.00 ($30 off)
 * calculateDiscountPrice(100, 10)       // 90.00 (10% off)
 */
export const calculateDiscountPrice = (
  originalPrice: number,
  discountAmount: number,
  discountType: '%' | '$' = '%'
): number => {
  const discountValue = discountType === '$' 
    ? discountAmount 
    : originalPrice * (discountAmount / 100)
    
  return parseFloat((originalPrice - discountValue).toFixed(2))
}
