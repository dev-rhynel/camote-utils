import {
    isEqual,
    isMatch,
    isElement,
    isArray,
    isObject,
    isArguments,
    isFunction,
    isString,
    isNumber,
    isFinite,
    isBoolean,
    isDate,
    isRegExp,
    isError,
    isSymbol,
    isMap,
    isWeakMap,
    isSet,
    isWeakSet,
    isArrayBuffer,
    isDataView,
    isTypedArray,
    isNaN,
    isNull,
    isUndefined,
    isAlphanumeric,
    isEmail,
    isStrongPassword
} from '../index';

describe('Type Checking Functions', () => {
    describe('isEqual', () => {
        it('should compare primitive values', () => {
            expect(isEqual(1, 1)).toBe(true);
            expect(isEqual('hello', 'hello')).toBe(true);
            expect(isEqual(true, true)).toBe(true);
            expect(isEqual(null, null)).toBe(true);
            expect(isEqual(undefined, undefined)).toBe(true);
            expect(isEqual(1, 2)).toBe(false);
            expect(isEqual('hello', 'world')).toBe(false);
        });

        it('should compare arrays', () => {
            expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
            expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
            expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
            expect(isEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
        });

        it('should compare objects', () => {
            expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
            expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
            expect(isEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
            expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
        });
    });

    describe('isMatch', () => {
        it('should handle basic pattern matching', () => {
            expect(isMatch({ a: 1, b: 2 }, { a: 1 })).toBe(true);
            expect(isMatch({ a: 1, b: 2 }, { a: 2 })).toBe(false);
            expect(isMatch({ a: 1 }, { a: 1, b: 2 })).toBe(false);
        });

        it('should handle nested objects', () => {
            expect(isMatch({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
            expect(isMatch({ a: { b: 2, c: 3 } }, { a: { b: 2 } })).toBe(true);
            expect(isMatch({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
        });

        it('should handle edge cases', () => {
            expect(isMatch(null, {})).toBe(false);
            expect(isMatch({}, null)).toBe(false);
            expect(isMatch(undefined, {})).toBe(false);
            expect(isMatch({}, undefined)).toBe(false);
            expect(isMatch({}, {})).toBe(true);
        });

        it('should handle arrays', () => {
            expect(isMatch([1, 2, 3], [1, 2])).toBe(true);
            expect(isMatch({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
            expect(isMatch({ a: [1, 2] }, { a: [1, 3] })).toBe(false);
        });
    });

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

    describe('Special Type Checks', () => {
        it('should check dates', () => {
            expect(isDate(new Date())).toBe(true);
            expect(isDate(new Date('2023-01-01'))).toBe(true);
            expect(isDate(new Date('invalid'))).toBe(false);
            expect(isDate('2023-01-01')).toBe(false);
        });

        it('should check regular expressions', () => {
            expect(isRegExp(/test/)).toBe(true);
            expect(isRegExp(new RegExp('test'))).toBe(true);
            expect(isRegExp('/test/')).toBe(false);
            expect(isRegExp({})).toBe(false);
        });

        it('should check errors', () => {
            expect(isError(new Error())).toBe(true);
            expect(isError(new TypeError())).toBe(true);
            expect(isError({ message: 'error' })).toBe(false);
            expect(isError('error')).toBe(false);
        });

        it('should check symbols', () => {
            expect(isSymbol(Symbol())).toBe(true);
            expect(isSymbol(Symbol('test'))).toBe(true);
            expect(isSymbol('symbol')).toBe(false);
            expect(isSymbol(123)).toBe(false);
            expect(isSymbol({})).toBe(false);
        });

        it('should check arguments object', () => {
            function test() {
                expect(isArguments(arguments)).toBe(true);
            }
            test();
            
            expect(isArguments([])).toBe(false);
            expect(isArguments({})).toBe(false);
            expect(isArguments(null)).toBe(false);
        });
    });

    describe('Collection Type Checks', () => {
        it('should check Maps', () => {
            expect(isMap(new Map())).toBe(true);
            expect(isMap(new WeakMap())).toBe(false);
            expect(isMap({})).toBe(false);
        });

        it('should check Sets', () => {
            expect(isSet(new Set())).toBe(true);
            expect(isSet(new WeakSet())).toBe(false);
            expect(isSet([])).toBe(false);
        });

        it('should check WeakMaps and WeakSets', () => {
            expect(isWeakMap(new WeakMap())).toBe(true);
            expect(isWeakMap(new Map())).toBe(false);
            expect(isWeakSet(new WeakSet())).toBe(true);
            expect(isWeakSet(new Set())).toBe(false);
        });
    });

    describe('Buffer and View Checks', () => {
        it('should check ArrayBuffers', () => {
            expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true);
            expect(isArrayBuffer(new Uint8Array(8))).toBe(false);
            expect(isArrayBuffer([])).toBe(false);
        });

        it('should check DataViews', () => {
            const buffer = new ArrayBuffer(8);
            expect(isDataView(new DataView(buffer))).toBe(true);
            expect(isDataView(buffer)).toBe(false);
            expect(isDataView([])).toBe(false);
        });

        it('should check TypedArrays', () => {
            expect(isTypedArray(new Uint8Array())).toBe(true);
            expect(isTypedArray(new Float64Array())).toBe(true);
            expect(isTypedArray(new DataView(new ArrayBuffer(8)))).toBe(false);
            expect(isTypedArray([])).toBe(false);
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

    // Browser-specific tests
    if (typeof window !== 'undefined') {
        describe('DOM Element Checks', () => {
            it('should check HTML Elements', () => {
                expect(isElement(document.createElement('div'))).toBe(true);
                expect(isElement(document.body)).toBe(true);
                expect(isElement({})).toBe(false);
                expect(isElement('<div></div>')).toBe(false);
            });
        });
    }
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
