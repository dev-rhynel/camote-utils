import {
  isUrl,
  isUuid,
  toUpperCase,
  toLowerCase,
  chopStart,
  chopEnd,
  contains,
  exactly,
  isEmpty,
} from '../src/checkers';

describe('Checkers Module', () => {
  describe('isUrl', () => {
    it('should validate URLs correctly', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://localhost:3000')).toBe(true);
      expect(isUrl('ftp://example.com')).toBe(true);
      expect(isUrl('not-a-url')).toBe(false);
    });
  });

  describe('isUuid', () => {
    it('should validate UUIDs correctly', () => {
      expect(isUuid('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isUuid('not-a-uuid')).toBe(false);
    });
  });

  describe('toUpperCase', () => {
    it('should convert string to uppercase', () => {
      expect(toUpperCase('hello')).toBe('HELLO');
      expect(toUpperCase('world')).toBe('WORLD');
    });
  });

  describe('toLowerCase', () => {
    it('should convert string to lowercase', () => {
      expect(toLowerCase('HELLO')).toBe('hello');
      expect(toLowerCase('WORLD')).toBe('world');
    });
  });

  describe('chopStart', () => {
    it('should remove characters from the start of the string', () => {
      expect(chopStart('hello', 2)).toBe('llo');
      expect(chopStart('world', 3)).toBe('ld');
    });
  });

  describe('chopEnd', () => {
    it('should remove characters from the end of the string', () => {
      expect(chopEnd('hello', 2)).toBe('hel');
      expect(chopEnd('world', 3)).toBe('wo');
    });
  });

  describe('contains', () => {
    it('should check if string contains a substring', () => {
      expect(contains('hello world', 'world', true)).toBe(true);
      expect(contains('hello world', 'WORLD', false)).toBe(true);
      expect(contains('hello world', 'WORLD', true)).toBe(false);
    });
  });

  describe('exactly', () => {
    it('should check if two strings match exactly', () => {
      expect(exactly('hello', 'hello', true)).toBe(true);
      expect(exactly('hello', 'HELLO', true)).toBe(false);
      expect(exactly('hello', 'HELLO', false)).toBe(true);
    });

    it('should handle undefined values', () => {
      expect(exactly(undefined as any, 'test')).toBe(false);
      expect(exactly('test', undefined as any)).toBe(false);
      expect(exactly(undefined as any, undefined as any)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for null', () => {
      expect(isEmpty(null)).toBe(true);
    });
    it('should return true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });
    it('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });
    it('should return true for empty array', () => {
      expect(isEmpty([])).toBe(true);
    });
    it('should return true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });
    it('should return false for non-empty string', () => {
      expect(isEmpty('hello')).toBe(false);
    });
    it('should return false for non-empty array', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });
    it('should return false for non-empty object', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });
});
