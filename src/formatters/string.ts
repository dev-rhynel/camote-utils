export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str: string, length: number, ellipsis: string = "..."): string => {
  if (str.length <= length) return str
  return str.slice(0, length - ellipsis.length) + ellipsis
}

export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/[\s-_]+(\w)/g, (_, letter) => letter.toUpperCase())
}

export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase()
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const wordCount = (str: string): number => {
  return str.trim() === '' ? 0 : str.trim().split(/\s+/).length
}

export const format = (
  template: string,
  values: Record<string, string | number>
): string => {
  return template.replace(
    /{(\w+)}/g,
    (match, key) => values[key]?.toString() ?? match
  )
}

export const reverse = (str: string): string => {
  return str.split("").reverse().join("")
}

export const clean = (str: string): string => {
  return str.trim().replace(/\s+/g, " ")
}

export const pluralize = (
  word: string,
  count?: number,
  customPlural?: string
): string => {
  if (count === 1) return word
  if (customPlural) return customPlural
  if (word.endsWith('y')) {
    if (!/[aeiou]y$/i.test(word)) {
      return word.slice(0, -1) + 'ies'
    }
  } else if (word.endsWith('s') || word.endsWith('sh') || 
             word.endsWith('ch') || word.endsWith('x') || 
             word.endsWith('z')) {
    return word + 'es'
  }
  return word + 's'
}

export const toUpperCase = (str: string, locale?: string): string => {
  return locale ? str.toLocaleUpperCase(locale) : str.toUpperCase()
}

export const toLowerCase = (str: string, locale?: string): string => {
  return locale ? str.toLocaleLowerCase(locale) : str.toLowerCase()
}

export const chopStart = (str: string, count: number = 1): string => {
  if (!str || count <= 0) return str
  return str.slice(count > str.length ? str.length : count)
}

export const chopEnd = (str: string, count: number = 1): string => {
  if (!str || count <= 0) return str
  return str.slice(0, -(count > str.length ? str.length : count))
}

export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase())
}

export const mask = (str: string, maskChar: string = '*', visibleCount: number = 6, position: 'start' | 'end' = 'end', active: boolean = true): string => {
  if (!active) return str
  if (!str) return str
  visibleCount = Math.min(visibleCount, str.length);
  const maskedLength = Math.max(0, str.length - visibleCount)
  switch (position) {
    case 'start':
      return maskChar.repeat(maskedLength) + str.slice(-visibleCount)
    case 'end':
      return str.slice(0, visibleCount) + maskChar.repeat(maskedLength)
    default:
      return str
  }
}

export const pad = (
  str: string,
  length: number,
  char: string = " ",
  position: "start" | "end" | "both" = "end"
): string => {
  const padChar = char.charAt(0)
  const padLength = length - str.length

  if (padLength <= 0) return str

  switch (position) {
    case "start":
      return padChar.repeat(padLength) + str
    case "both":
      const startPad = Math.floor(padLength / 2)
      const endPad = padLength - startPad
      return padChar.repeat(startPad) + str + padChar.repeat(endPad)
    default:
      return str + padChar.repeat(padLength)
  }
}

export const trim = (str: string): string => str.trim();

export const explode = (str: string, delimiter: string, limit?: number): string[] => {
  if (!str) return []
  const parts = str.split(delimiter)
  if (limit && limit < parts.length) {
    const lastPart = parts.slice(limit).join(delimiter)
    return [...parts.slice(0, limit), lastPart]
  }
  return parts
};

export const toUnicodes = (str: string, exclude: string | string[] = ""): string => {
  if (!str) return str

  const stringArray = Array.from(str) 
 
  for (let i = 0; i < stringArray.length; i++) {

     if (exclude.length > 0) {
        exclude = typeof(exclude) == "object" ? exclude.join('') : exclude;
        if (exclude.includes(stringArray[i])) continue
     }

     const codePoint = stringArray[i].codePointAt(0)

     if (codePoint) {
        const hex = codePoint.toString(16).toUpperCase();
        stringArray[i] = `\\u{${hex.padStart(4, "0")}}`;
     }
  }

 return stringArray.join('')
}

export const toHtmlEntities = (str: string,  exclude: string | string[] = ""): string => {
  if (!str) return str

  const stringArray = Array.from(str)
 
  for (let i = 0; i < stringArray.length; i++) {
     
     if (exclude.length > 0) {
        exclude = typeof(exclude) == "object" ? exclude.join('') : exclude;
        if (exclude.includes(stringArray[i])) continue
     }

     const codePoint = stringArray[i].codePointAt(0);

     if (codePoint) {
        stringArray[i] = `&#${codePoint};`
     }
  }

 return stringArray.join('')
}

export const swapCase = (str: string): string => {
  return str.replace(/[a-zA-Z]/g, match => {
    return match === match.toUpperCase() ? match.toLowerCase() : match.toUpperCase()
  })
}