import {
  capitalize,
  truncate,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  slugify,
  wordCount,
  pad,
  format,
  reverse,
  clean
} from '../src/formatters/string'

describe('String Formatters', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('world')).toBe('World')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should handle already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })
  })

  describe('truncate', () => {
    it('should truncate string with default ellipsis', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...')
    })

    it('should truncate string with custom ellipsis', () => {
      expect(truncate('Hello World', 8, '!')).toBe('Hello W!')
    })

    it('should not truncate if string length is less than limit', () => {
      expect(truncate('Hello', 10)).toBe('Hello')
    })
  })

  describe('toCamelCase', () => {
    it('should convert hyphenated string to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld')
    })

    it('should convert space-separated string to camelCase', () => {
      expect(toCamelCase('Hello World')).toBe('helloWorld')
    })

    it('should handle underscore-separated string', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld')
    })
  })

  describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world')
    })

    it('should convert space-separated string to kebab-case', () => {
      expect(toKebabCase('Hello World')).toBe('hello-world')
    })

    it('should handle underscore-separated string', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world')
    })
  })

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world')
    })

    it('should convert space-separated string to snake_case', () => {
      expect(toSnakeCase('Hello World')).toBe('hello_world')
    })

    it('should handle hyphenated string', () => {
      expect(toSnakeCase('hello-world')).toBe('hello_world')
    })
  })

  describe('slugify', () => {
    it('should convert string to URL-friendly slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
    })

    it('should handle special characters', () => {
      expect(slugify("What's Up?")).toBe('whats-up')
    })

    it('should handle multiple spaces and dashes', () => {
      expect(slugify('  hello   world  ')).toBe('hello-world')
    })
  })

  describe('wordCount', () => {
    it('should count words in a string', () => {
      expect(wordCount('Hello world')).toBe(2)
    })

    it('should handle multiple spaces', () => {
      expect(wordCount('Hello   world  test')).toBe(3)
    })

    it('should handle empty string', () => {
      expect(wordCount('')).toBe(0)
    })
  })

  describe('pad', () => {
    it('should pad end by default', () => {
      expect(pad('hello', 8)).toBe('hello   ')
    })

    it('should pad start when specified', () => {
      expect(pad('hello', 8, '*', 'start')).toBe('***hello')
    })

    it('should pad both sides when specified', () => {
      expect(pad('hello', 8, '*', 'both')).toBe('*hello**')
    })

    it('should not pad if string length equals desired length', () => {
      expect(pad('hello', 5)).toBe('hello')
    })
  })

  describe('format', () => {
    it('should replace placeholders with values', () => {
      expect(format('Hello {name}!', { name: 'World' })).toBe('Hello World!')
    })

    it('should handle multiple placeholders', () => {
      expect(format('{greeting} {name}!', { greeting: 'Hi', name: 'User' }))
        .toBe('Hi User!')
    })

    it('should keep placeholder if value not provided', () => {
      expect(format('Hello {name}!', {})).toBe('Hello {name}!')
    })
  })

  describe('reverse', () => {
    it('should reverse a string', () => {
      expect(reverse('hello')).toBe('olleh')
    })

    it('should handle empty string', () => {
      expect(reverse('')).toBe('')
    })

    it('should handle palindrome', () => {
      expect(reverse('radar')).toBe('radar')
    })
  })

  describe('clean', () => {
    it('should remove extra whitespace', () => {
      expect(clean('  hello   world  ')).toBe('hello world')
    })

    it('should handle string with only spaces', () => {
      expect(clean('   ')).toBe('')
    })

    it('should handle empty string', () => {
      expect(clean('')).toBe('')
    })
  })
})
