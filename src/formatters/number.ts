export const humanReadableNumber = (num: number, options?: { decimals?: number; compact?: boolean }): string => {
  const { decimals = 1, compact = false } = options || {}
  if (num < 1000) return Math.floor(num).toString()

  const units = ['K', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(num) / 3)
  const unitName = units[order - 1]
  const formattedNum = (num / Math.pow(1000, order)).toFixed(compact ? 1 : decimals);

  return decimals === 0 ? `${parseInt(formattedNum)}${unitName}` : `${formattedNum}${unitName}`;
}

export const formatWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const formatPercentage = (num: number, decimals: number = 0): string => {
  return `${(num * 100).toFixed(decimals)}%`
}

export const formatOrdinal = (num: number): string => {
  const j = num % 10
  const k = num % 100
  if (j === 1 && k !== 11) return num + "st"
  if (j === 2 && k !== 12) return num + "nd"
  if (j === 3 && k !== 13) return num + "rd"
  return num + "th"
}

export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes"
  
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i > 0 ? decimals : 0)} ${sizes[i]}`
}

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
