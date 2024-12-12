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
  clean,
  pluralize,
  isUrl,
  isUuid,
  toUpperCase,
  toLowerCase,
  chopStart,
  chopEnd,
  contains,
  exactly,
  generateUuid
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

  describe('pluralize', () => {
    test('returns singular form when count is 1', () => {
      expect(pluralize('cat', 1)).toBe('cat');
      expect(pluralize('dog', 1)).toBe('dog');
    });
  
    test('uses custom plural form when provided', () => {
      expect(pluralize('person', 2, 'people')).toBe('people');
      expect(pluralize('child', 2, 'children')).toBe('children');
    });
  
    test('handles words ending in y correctly', () => {
      expect(pluralize('baby', 2)).toBe('babies');
      expect(pluralize('toy', 2)).toBe('toys');  // y after vowel
    });
  
    test('handles words requiring es suffix', () => {
      expect(pluralize('box', 2)).toBe('boxes');
      expect(pluralize('church', 2)).toBe('churches');
      expect(pluralize('buzz', 2)).toBe('buzzes');
    });
  
    test('adds s for regular plurals', () => {
      expect(pluralize('cat', 2)).toBe('cats');
      expect(pluralize('dog', 2)).toBe('dogs');
    });
  
    test('uses plural form when count is undefined', () => {
      expect(pluralize('cat')).toBe('cats');
      expect(pluralize('person', undefined, 'people')).toBe('people');
    });
  });

  describe('isUuid', () => {
    it('should return true for valid UUIDs', () => {
      expect(isUuid('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
      expect(isUuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
      expect(isUuid('6ba7b810-9dad-41d4-80b4-00c04fd430c8')).toBe(true)
    })

    it('should return false for invalid UUIDs', () => {
      expect(isUuid('not-a-uuid')).toBe(false)
      expect(isUuid('http:/example.com')).toBe(false)
      expect(isUuid('')).toBe(false)
      expect(isUuid('123e4567-e89b-12d3-a456')).toBe(false)
      expect(isUuid('123e4567-e89b-12d3-a456-42661417400')).toBe(false)
      expect(isUuid('123e4567-e89b-12d3-a456-4266141740000')).toBe(false)
    })
  })

  describe('toUpperCase', () => {
    it('should convert string to uppercase', () => {
      expect(toUpperCase('hello')).toBe('HELLO')
      expect(toUpperCase('Hello World')).toBe('HELLO WORLD')
    })

    it('should handle empty string', () => {
      expect(toUpperCase('')).toBe('')
    })

    it('should support locale-specific uppercase conversion', () => {
      expect(toUpperCase('philippines', 'en-PH')).toBe('PHILIPPINES')
    })
  })

  describe('toLowerCase', () => {
    it('should convert string to lowercase', () => {
      expect(toLowerCase('HELLO')).toBe('hello')
      expect(toLowerCase('Hello World')).toBe('hello world')
    })

    it('should handle empty string', () => {
      expect(toLowerCase('')).toBe('')
    })

    it('should support locale-specific lowercase conversion', () => {
      expect(toLowerCase('PHILIPPINES', 'en-PH')).toBe('philippines')
    })
  })

  describe('chopStart', () => {
    it('should remove one character from start by default', () => {
      expect(chopStart('hello')).toBe('ello')
      expect(chopStart('world')).toBe('orld')
    })

    it('should remove specified number of characters from start', () => {
      expect(chopStart('hello', 2)).toBe('llo')
      expect(chopStart('world', 3)).toBe('ld')
    })

    it('should handle empty string', () => {
      expect(chopStart('')).toBe('')
    })

    it('should handle count greater than string length', () => {
      expect(chopStart('hello', 10)).toBe('')
    })

    it('should handle zero or negative count', () => {
      expect(chopStart('hello', 0)).toBe('hello')
      expect(chopStart('hello', -1)).toBe('hello')
    })
  })

  describe('chopEnd', () => {
    it('should remove one character from end by default', () => {
      expect(chopEnd('hello')).toBe('hell')
      expect(chopEnd('world')).toBe('worl')
    })

    it('should remove specified number of characters from end', () => {
      expect(chopEnd('hello', 2)).toBe('hel')
      expect(chopEnd('world', 3)).toBe('wo')
    })

    it('should handle empty string', () => {
      expect(chopEnd('')).toBe('')
    })

    it('should handle count greater than string length', () => {
      expect(chopEnd('hello', 10)).toBe('')
    })

    it('should handle zero or negative count', () => {
      expect(chopEnd('hello', 0)).toBe('hello')
      expect(chopEnd('hello', -1)).toBe('hello')
    })
  })

  describe('contains', () => {
    it('should find substring with case sensitivity by default', () => {
      expect(contains('Hello World', 'World')).toBe(true)
      expect(contains('Hello World', 'world')).toBe(false)
      expect(contains('Hello World', 'lo')).toBe(true)
    })

    it('should find substring ignoring case when specified', () => {
      expect(contains('Hello World', 'world', false)).toBe(true)
      expect(contains('Hello World', 'HELLO', false)).toBe(true)
      expect(contains('HELLO WORLD', 'hello', false)).toBe(true)
    })

    it('should handle empty strings', () => {
      expect(contains('', 'test')).toBe(false)
      expect(contains('test', '')).toBe(false)
      expect(contains('', '')).toBe(false)
    })

    it('should return false for non-existing substrings', () => {
      expect(contains('Hello World', 'xyz')).toBe(false)
      expect(contains('Hello World', 'xyz', false)).toBe(false)
    })
  })

  describe('exactly', () => {
    it('should match exact strings with case sensitivity by default', () => {
      expect(exactly('Hello', 'Hello')).toBe(true)
      expect(exactly('Hello', 'hello')).toBe(false)
      expect(exactly('World', 'World')).toBe(true)
    })

    it('should match strings ignoring case when specified', () => {
      expect(exactly('Hello', 'hello', false)).toBe(true)
      expect(exactly('WORLD', 'world', false)).toBe(true)
      expect(exactly('HeLLo', 'hEllO', false)).toBe(true)
    })

    it('should handle empty strings', () => {
      expect(exactly('', '')).toBe(true)
      expect(exactly('', '', false)).toBe(true)
      expect(exactly('test', '')).toBe(false)
      expect(exactly('', 'test')).toBe(false)
    })

    it('should handle undefined values', () => {
      expect(exactly(undefined as any, 'test')).toBe(false)
      expect(exactly('test', undefined as any)).toBe(false)
      expect(exactly(undefined as any, undefined as any)).toBe(false)
    })

    it('should handle different strings', () => {
      expect(exactly('Hello', 'World')).toBe(false)
      expect(exactly('Hello', 'World', false)).toBe(false)
      expect(exactly('test', 'testing')).toBe(false)
    })
  })

  describe('generateUuid', () => {
    it('should generate valid UUID v4 strings', () => {
      const uuid1 = generateUuid()
      const uuid2 = generateUuid()

      // Should be valid UUIDs
      expect(isUuid(uuid1)).toBe(true)
      expect(isUuid(uuid2)).toBe(true)

      // Should be different UUIDs
      expect(uuid1).not.toBe(uuid2)
    })

    it('should generate UUIDs with correct format', () => {
      const uuid = generateUuid()
      
      // Check UUID v4 format
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      
      // Version should be 4
      expect(uuid.charAt(14)).toBe('4')
      
      // Variant should be 8, 9, a, or b
      expect('89ab').toContain(uuid.charAt(19))
    })

    it('should generate multiple unique UUIDs', () => {
      const uuids = new Set(Array.from({ length: 1000 }, () => generateUuid()))
      expect(uuids.size).toBe(1000) // All should be unique
    })
  })

  describe('isUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isUrl('https://example.com')).toBe(true)
      expect(isUrl('http://localhost:3000')).toBe(true)
      expect(isUrl('https://sub.domain.com/path?query=1#hash')).toBe(true)
      expect(isUrl('ftp://ftp.example.com')).toBe(true)
    })

    it('should return false for invalid URLs', () => {
      expect(isUrl('not-a-url')).toBe(false)
      expect(isUrl('http:/example.com')).toBe(false)
      expect(isUrl('')).toBe(false)
      expect(isUrl('example.com')).toBe(false)
    })
  })
})
