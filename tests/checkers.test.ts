import {
  isUrl,
  isUuid,
  contains,
  exactly,
  isEmpty,
  isArray,
  isObject,
  isFunction,
  isString,
  isNumber,
  isFinite,
  isBoolean,
  isDataView,
  isNaN,
  isNull,
  isUndefined,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
  isValidTime
} from '../src/checkers/index';

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


describe('Type Checking Functions', () => {

  describe('Basic Type Checks', () => {
      it('should check strings', () => {
          expect(isString('')).toBe(true);
          expect(isString('hello')).toBe(true);
          expect(isString(String('hello'))).toBe(true);
          expect(isString(123)).toBe(false);
          expect(isString(null)).toBe(false);
      });

      it('should check numbers', () => {
          expect(isNumber(123)).toBe(true);
          expect(isNumber(0)).toBe(true);
          expect(isNumber(Number('123'))).toBe(true);
          expect(isNumber(NaN)).toBe(false);
          expect(isNumber(Infinity)).toBe(false);
          expect(isNumber('123')).toBe(false);
      });

      it('should check booleans', () => {
          expect(isBoolean(true)).toBe(true);
          expect(isBoolean(false)).toBe(true);
          expect(isBoolean(Boolean(1))).toBe(true);
          expect(isBoolean(1)).toBe(false);
          expect(isBoolean('true')).toBe(false);
      });
  });

  describe('Object Type Checks', () => {
      it('should check arrays', () => {
          expect(isArray([])).toBe(true);
          expect(isArray([1, 2, 3])).toBe(true);
          expect(isArray(new Array())).toBe(true);
          expect(isArray({ length: 0 })).toBe(false);
          expect(isArray(null)).toBe(false);
      });

      it('should check objects', () => {
          expect(isObject({})).toBe(true);
          expect(isObject({ a: 1 })).toBe(true);
          expect(isObject(Object.create(null))).toBe(true);
          expect(isObject([])).toBe(false);
          expect(isObject(null)).toBe(false);
      });

      it('should check functions', () => {
          expect(isFunction(() => {})).toBe(true);
          expect(isFunction(function() {})).toBe(true);
          expect(isFunction(async () => {})).toBe(true);
          expect(isFunction({})).toBe(false);
          expect(isFunction(null)).toBe(false);
      });
  });


  describe('Special Value Checks', () => {
      it('should check NaN', () => {
          expect(isNaN(NaN)).toBe(true);
          expect(isNaN(Number('not a number'))).toBe(true);
          expect(isNaN(123)).toBe(false);
          expect(isNaN('123')).toBe(false);
      });

      it('should check null and undefined', () => {
          expect(isNull(null)).toBe(true);
          expect(isNull(undefined)).toBe(false);
          expect(isUndefined(undefined)).toBe(true);
          expect(isUndefined(null)).toBe(false);
      });

      it('should check finite numbers', () => {
          expect(isFinite(123)).toBe(true);
          expect(isFinite(-123.45)).toBe(true);
          expect(isFinite(Infinity)).toBe(false);
          expect(isFinite(-Infinity)).toBe(false);
          expect(isFinite(NaN)).toBe(false);
      });
  });

  describe('isEmail', () => {
      test('valid email', () => {
          expect(isEmail("rhynel@dev.com")).toBe(true);
      });
      test('invalid email without domain', () => {
          expect(isEmail("not-an-email")).toBe(false);
      });
      test('valid email with domain', () => {
          expect(isEmail("user@domain.co")).toBe(true);
      });
      test('invalid email with empty domain', () => {
          expect(isEmail("user@.com")).toBe(false);
      });
      test('invalid email with double dots', () => {
          expect(isEmail("user@domain..com")).toBe(false);
      });
  });

  describe('isStrongPassword', () => {
      test('strong password', () => {
          expect(isStrongPassword("Password123!")).toBe(true);
      });
      test('weak password', () => {
          expect(isStrongPassword("weakpass")).toBe(false);
      });
      test('missing uppercase letter', () => {
          expect(isStrongPassword("password123!")).toBe(false);
      });
      test('missing lowercase letter', () => {
          expect(isStrongPassword("PASSWORD123!")).toBe(false);
      });
      test('missing number', () => {
          expect(isStrongPassword("Password!")).toBe(false);
      });
      test('missing special character', () => {
          expect(isStrongPassword("Password123")).toBe(false);
      });
  });
});

describe('isAlphanumeric', () => {
  it('should return true for alphanumeric strings', () => {
      expect(isAlphanumeric('abc123')).toBe(true);
      expect(isAlphanumeric('ABC123')).toBe(true);
      expect(isAlphanumeric('123456')).toBe(true);
      expect(isAlphanumeric('abcABC')).toBe(true);
  });

  it('should return false for non-alphanumeric strings', () => {
      expect(isAlphanumeric('abc 123')).toBe(false);
      expect(isAlphanumeric('abc-123')).toBe(false);
      expect(isAlphanumeric('abc_123')).toBe(false);
      expect(isAlphanumeric('abc@123')).toBe(false);
      expect(isAlphanumeric('')).toBe(false);
  });

  it('should handle edge cases', () => {
      expect(isAlphanumeric('0')).toBe(true);
      expect(isAlphanumeric('a')).toBe(true);
      expect(isAlphanumeric('Z')).toBe(true);
      expect(isAlphanumeric(' ')).toBe(false);
      expect(isAlphanumeric('\t')).toBe(false);
      expect(isAlphanumeric('\n')).toBe(false);
  });
});

describe('isValidTime', () => {
  test('valid times', () => {
      expect(isValidTime('14:30')).toBe(true);
      expect(isValidTime('02:30 PM')).toBe(true);
      expect(isValidTime('00:00')).toBe(true);
      expect(isValidTime('12:59:59')).toBe(true);
  });

  test('invalid times', () => {
      expect(isValidTime('25:00')).toBe(false);
      expect(isValidTime('14:60')).toBe(false);
      expect(isValidTime('02:30:61')).toBe(false);
      expect(isValidTime('invalid time')).toBe(false);
      expect(isValidTime('')).toBe(false);
  });
});
