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