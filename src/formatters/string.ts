/**
 * Capitalizes the first letter of a string
 * @param str - The input string
 * @returns The string with its first letter capitalized
 * @example
 * capitalize("hello") // "Hello"
 */
export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str - The input string
 * @param length - Maximum length before truncation
 * @param ellipsis - The ellipsis string to append (default: "...")
 * @returns The truncated string
 * @example
 * truncate("Hello World", 8) // "Hello..."
 */
export const truncate = (str: string, length: number, ellipsis: string = "..."): string => {
  if (str.length <= length) return str
  return str.slice(0, length - ellipsis.length) + ellipsis
}

/**
 * Converts a string to camelCase
 * @param str - The input string
 * @returns The camelCase string
 * @example
 * toCamelCase("hello-world") // "helloWorld"
 * toCamelCase("Hello World") // "helloWorld"
 */
export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/[\s-_]+(\w)/g, (_, letter) => letter.toUpperCase())
}

/**
 * Converts a string to kebab-case
 * @param str - The input string
 * @returns The kebab-case string
 * @example
 * toKebabCase("helloWorld") // "hello-world"
 * toKebabCase("Hello World") // "hello-world"
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

/**
 * Converts a string to snake_case
 * @param str - The input string
 * @returns The snake_case string
 * @example
 * toSnakeCase("helloWorld") // "hello_world"
 * toSnakeCase("Hello World") // "hello_world"
 */
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase()
}

/**
 * Converts a string to a URL-friendly slug
 * @param str - The input string
 * @returns The slugified string
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("What's Up?") // "whats-up"
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Counts the number of words in a string
 * @param str - The input string
 * @returns The number of words
 * @example
 * wordCount("Hello world") // 2
 */
export const wordCount = (str: string): number => {
  return str.trim() === '' ? 0 : str.trim().split(/\s+/).length
}


/**
 * Formats a string by replacing placeholders with provided values
 * @param template - The template string with {placeholder} syntax
 * @param values - Object containing values to replace placeholders
 * @returns The formatted string
 * @example
 * format("Hello {name}!", { name: "World" }) // "Hello World!"
 * format("{greeting} {name}!", { greeting: "Hi", name: "User" }) // "Hi User!"
 */
export const format = (
  template: string,
  values: Record<string, string | number>
): string => {
  return template.replace(
    /{(\w+)}/g,
    (match, key) => values[key]?.toString() ?? match
  )
}

/**
 * Reverses a string
 * @param str - The input string
 * @returns The reversed string
 * @example
 * reverse("hello") // "olleh"
 */
export const reverse = (str: string): string => {
  return str.split("").reverse().join("")
}

/**
 * Removes extra whitespace from a string
 * @param str - The input string
 * @returns The cleaned string
 * @example
 * clean("  hello   world  ") // "hello world"
 */
export const clean = (str: string): string => {
  return str.trim().replace(/\s+/g, " ")
}

/**
 * Pluralizes a word based on count or returns custom plural form
 * @param word - The singular form of the word
 * @param count - The count to determine pluralization (optional)
 * @param customPlural - Custom plural form (optional)
 * @returns The pluralized or singular word based on count
 * @example
 * pluralize("cat", 1)              // "cat"
 * pluralize("cat", 2)              // "cats"
 * pluralize("baby", 2)             // "babies"
 * pluralize("box", 2)              // "boxes"
 * pluralize("child", 2, "children") // "children"
 * pluralize("person", undefined, "people") // "people"
 */
export const pluralize = (
  word: string,
  count?: number,
  customPlural?: string
): string => {
  // If count is 1, return singular form
  if (count === 1) return word;
  
  // If custom plural is provided, use it
  if (customPlural) return customPlural;
  
  // Basic English pluralization rules
  if (word.endsWith('y')) {
    // Consonant + y: change y to ies
    if (!/[aeiou]y$/i.test(word)) {
      return word.slice(0, -1) + 'ies';
    }
  } else if (word.endsWith('s') || word.endsWith('sh') || 
             word.endsWith('ch') || word.endsWith('x') || 
             word.endsWith('z')) {
    return word + 'es';
  }
  
  // Default: add 's'
  return word + 's';
}

/**
 * Converts a string to uppercase with optional locale support
 * @param str - The input string
 * @param locale - Optional locale for case conversion (e.g., 'tr-TR' for Turkish)
 * @returns The uppercase string
 * @example
 * toUpperCase("hello") // "HELLO"
 * toUpperCase("philippines", "en-PH") // "PHILIPPINES"
 */
export const toUpperCase = (str: string, locale?: string): string => {
  return locale ? str.toLocaleUpperCase(locale) : str.toUpperCase()
}

/**
 * Converts a string to lowercase with optional locale support
 * @param str - The input string
 * @param locale - Optional locale for case conversion (e.g., 'tr-TR' for Turkish)
 * @returns The lowercase string
 * @example
 * toLowerCase("HELLO") // "hello"
 * toLowerCase("PHILIPPINES", "en-PH") // "philippines"
 */
export const toLowerCase = (str: string, locale?: string): string => {
  return locale ? str.toLocaleLowerCase(locale) : str.toLowerCase()
}

/**
 * Removes a specified number of characters from the start of a string
 * @param str - The input string
 * @param count - Number of characters to remove from the start (default: 1)
 * @returns The string with characters removed from the start
 * @example
 * chopStart("hello") // "ello"
 * chopStart("hello", 2) // "llo"
 * chopStart("hello", 10) // ""
 */
export const chopStart = (str: string, count: number = 1): string => {
  if (!str || count <= 0) return str
  return str.slice(count > str.length ? str.length : count)
}

/**
 * Removes a specified number of characters from the end of a string
 * @param str - The input string
 * @param count - Number of characters to remove from the end (default: 1)
 * @returns The string with characters removed from the end
 * @example
 * chopEnd("hello") // "hell"
 * chopEnd("hello", 2) // "hel"
 * chopEnd("hello", 10) // ""
 */
export const chopEnd = (str: string, count: number = 1): string => {
  if (!str || count <= 0) return str
  return str.slice(0, -(count > str.length ? str.length : count))
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The input string
 * @returns The string with the first letter of each word capitalized
 * @example
 * capitalizeWords("hello world") // "Hello World"
 */
export const capitalizeWords = (str: string): string => {
  // Use a regular expression to find the first character of each word
  // and replace it with its uppercase version.
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Masks a portion of a string with a specified character.
 * @param str - The input string
 * @param maskChar - The character to use for masking (default: '*')
 * @param visibleCount - The number of characters to keep visible (default: 6)
 * @param position - The position to apply the mask ('start', 'end', default: 'end')
 * @param active - Whether to apply the mask (default: true)
 * @returns The masked string
 * @example
 * mask('1234567890') // '123456****'
 * mask('1234567890', '#') // '123456####'
 * mask('1234567890', '*', 4) // '1234******'
 * mask('1234567890', '*', 6, 'start') // '******7890'
 * mask('1234567890', '*', 6, 'end', false) // '1234567890'
 */
export const mask = (str: string, maskChar: string = '*', visibleCount: number = 6, position: 'start' | 'end' = 'end', active: boolean = true): string => {
  if (!active) return str;
  if (!str) return str;
  visibleCount = Math.min(visibleCount, str.length);
  const maskedLength = Math.max(0, str.length - visibleCount);
  switch (position) {
    case 'start':
      return maskChar.repeat(maskedLength) + str.slice(-visibleCount);
    case 'end':
      return str.slice(0, visibleCount) + maskChar.repeat(maskedLength);
    default:
      return str;
  }
}

/**
 * Pads a string to a specified length
 * @param str - The input string
 * @param length - The desired total length
 * @param char - The padding character (default: " ")
 * @param position - The padding position ("start" | "end" | "both", default: "end")
 * @returns The padded string
 * @example
 * pad("hello", 8) // "hello   "
 * pad("hello", 8, "*", "start") // "***hello"
 * pad("hello", 8, "*", "both") // "*hello**"
 */
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

/**
 * Trims whitespace from both ends of a string.
 * @param str - The input string
 * @returns The trimmed string
 */
export const trim = (str: string): string => str.trim();

/**
 * Splits a string into an array of substrings based on a specified delimiter.
 * Similar to PHP's explode function.
 * @param str - The input string
 * @param delimiter - The delimiter to split the string by
 * @param limit - Optional limit on the number of substrings to return
 * @returns An array of substrings
 * @example
 * explode("Hello,World", ",") // ["Hello", "World"]
 * @example
 * explode("Hello,World,Again", ",", 2) // ["Hello", "World,Again"]
 */
export const explode = (str: string, delimiter: string, limit?: number): string[] => {
  if (!str) return []; // Return an empty array for empty strings
  const parts = str.split(delimiter);
  if (limit && limit < parts.length) {
    const lastPart = parts.slice(limit).join(delimiter);
    return [...parts.slice(0, limit), lastPart];
  }
  return parts;
};
