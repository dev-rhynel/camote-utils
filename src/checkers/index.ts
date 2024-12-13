/**
 * Checks if a value is null or undefined
 * @param value - The value to check
 * @returns True if the value is null or undefined
 */
export const isNil = (value: any): value is null | undefined => {
    return value === null || value === undefined;
};

/**
 * Checks if a value is empty
 * @param value - The value to check
 * @returns True if the value is empty (null, undefined, empty string, empty array, empty object)
 * @example
 * isEmpty(null);        // true
 * isEmpty('');          // true
 * isEmpty([]);          // true
 * isEmpty({});          // true
 * isEmpty('hello');     // false
 * isEmpty([1, 2, 3]);   // false
 */
export const isEmpty = (value: any): boolean => {
    if (isNil(value)) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};

/**
 * Checks if a value is a valid number
 * @param value - The value to check
 * @returns True if the value is a valid number (not NaN or Infinity)
 */
export const isNumber = (value: any): value is number => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Checks if a value is a string
 * @param value - The value to check
 * @returns True if the value is a string
 */
export const isString = (value: any): value is string => {
    return typeof value === 'string';
};

/**
 * Checks if a value is an array
 * @param value - The value to check
 * @returns True if the value is an array
 */
export const isArray = <T>(value: any): value is T[] => {
    return Array.isArray(value);
};

/**
 * Checks if a value is an object
 * @param value - The value to check
 * @returns True if the value is an object (not null, not array)
 */
export const isObject = (value: any): value is object => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Checks if a string is a valid URL
 * @param str - The input string to validate
 * @returns boolean indicating if the string is a valid URL
 * @example
 * isUrl("https://example.com") // true
 * isUrl("not-a-url") // false
 * isUrl("http://localhost:3000") // true
 * isUrl("ftp://example.com") // true
 */
export const isUrl = (str: string): boolean => {
    try {
        const url = new URL(str);
        // Check for valid protocol (must be http, https, or ftp)
        if (!url.protocol || !['http:', 'https:', 'ftp:'].includes(url.protocol)) {
            return false;
        }
        // Check for valid hostname
        if (!url.hostname || url.hostname.length === 0) {
            return false;
        }
        // Check for double slashes in path
        if (url.pathname.includes('//')) {
            return false;
        }
        // Check for malformed URLs
        if (!str.match(/^(https?|ftp):\/\//i)) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
};

/**
 * Checks if a string is a valid UUID (v4)
 * @param str - The input string to validate
 * @returns boolean indicating if the string is a valid UUID
 * @example
 * isUuid("123e4567-e89b-12d3-a456-426614174000") // true
 * isUuid("not-a-uuid") // false
 */
export const isUuid = (str: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
};

import { chopEnd, chopStart } from '../formatters/string';
export { chopEnd, chopStart };

/**
 * Converts a string to uppercase
 * @param str - The input string
 * @returns The string in uppercase
 */
export const toUpperCase = (str: string): string => {
    return str.toUpperCase();
};

/**
 * Converts a string to lowercase
 * @param str - The input string
 * @returns The string in lowercase
 */
export const toLowerCase = (str: string): string => {
    return str.toLowerCase();
};

/**
 * Checks if a string contains a specified substring
 * @param str - The input string
 * @param substring - The substring to search for
 * @param caseSensitive - Whether the search should be case-sensitive (default: true)
 * @returns True if the substring is found, false otherwise
 */
export const contains = (str: string, substring: string, caseSensitive: boolean = true): boolean => {
    if (!str || !substring) return false;
    if (!caseSensitive) {
        return str.toLowerCase().includes(substring.toLowerCase());
    }
    return str.includes(substring);
};

/**
 * Checks if a string exactly matches another string
 * @param str - The input string
 * @param match - The string to match against
 * @returns True if the strings match exactly, false otherwise
 */
export const exactly = (str: string, match: string, caseSensitive?: boolean): boolean => {
    if (str === undefined || match === undefined) return false;
    if (caseSensitive === undefined) caseSensitive = true;
    if (!caseSensitive) {
        return str.toLowerCase() === match.toLowerCase();
    }
    return str === match;
};

/**
 * Checks if a value is a boolean
 * @param value - The value to check
 * @returns True if the value is a boolean
 * @example
 * isBoolean(true);      // true
 * isBoolean(false);     // true
 * isBoolean(1);         // false
 * isBoolean('true');    // false
 */
export const isBoolean = (value: any): value is boolean => {
    return typeof value === 'boolean';
};

/**
 * Performs a deep equality comparison between two values
 * @param value - First value to compare
 * @param other - Second value to compare
 * @returns True if the values are deeply equal
 * @example
 * isEqual([1, 2], [1, 2]);           // true
 * isEqual({ a: 1 }, { a: 1 });       // true
 * isEqual([1, 2], [1, 3]);           // false
 */
export const isEqual = (value: any, other: any): boolean => {
    if (value === other) return true;
    if (value == null || other == null) return value === other;
    
    const valueType = Object.prototype.toString.call(value);
    if (valueType !== Object.prototype.toString.call(other)) return false;

    if (Array.isArray(value)) {
        if (value.length !== other.length) return false;
        return value.every((item, index) => isEqual(item, other[index]));
    }

    if (valueType === '[object Object]') {
        const valueKeys = Object.keys(value);
        const otherKeys = Object.keys(other);
        if (valueKeys.length !== otherKeys.length) return false;
        return valueKeys.every(key => isEqual(value[key], other[key]));
    }

    return value === other;
};

/**
 * Checks if object matches the pattern of properties and values
 * @param object - The object to check
 * @param pattern - The pattern to match against
 * @returns True if the object matches the pattern
 * @example
 * isMatch({ a: 1, b: 2 }, { a: 1 });     // true
 * isMatch({ a: 1, b: 2 }, { a: 2 });     // false
 * isMatch({ a: { b: 2 } }, { a: { b: 2 } }); // true
 * isMatch(null, {});                      // false
 * isMatch({}, null);                      // false
 */
export const isMatch = (object: any, pattern: any): boolean => {
    // Handle null/undefined cases
    if (object === null || object === undefined) return false;
    if (pattern === null || pattern === undefined) return false;

    // Direct equality check
    if (object === pattern) return true;

    // Type check for non-objects
    if (typeof pattern !== 'object' || typeof object !== 'object') {
        return object === pattern;
    }

    // Handle arrays
    if (Array.isArray(pattern) !== Array.isArray(object)) {
        return false;
    }

    return Object.keys(pattern).every(key => {
        // Check if key exists in object
        if (!(key in object)) return false;

        const patternValue = pattern[key];
        const objectValue = object[key];

        // Handle nested objects
        if (patternValue && typeof patternValue === 'object') {
            return isMatch(objectValue, patternValue);
        }

        // Handle primitive values
        return objectValue === patternValue;
    });
};

/**
 * Checks if a value is an HTML Element
 * @param value - The value to check
 * @returns True if the value is an HTML Element
 * @example
 * isElement(document.body);          // true
 * isElement(document.createElement('div')); // true
 * isElement({});                     // false
 */
export const isElement = (value: any): value is Element => {
    return value instanceof Element;
};

/**
 * Checks if a value is an Arguments object
 * @param value - The value to check
 * @returns True if the value is an Arguments object
 * @example
 * function test() { return isArguments(arguments); }
 * test();                            // true
 * isArguments([1, 2, 3]);           // false
 */
export const isArguments = (value: any): boolean => {
    return Object.prototype.toString.call(value) === '[object Arguments]';
};

/**
 * Checks if a value is a Function
 * @param value - The value to check
 * @returns True if the value is a Function
 * @example
 * isFunction(() => {});             // true
 * isFunction(function() {});        // true
 * isFunction(class {});             // true
 * isFunction({});                   // false
 */
export const isFunction = (value: any): value is Function => {
    return typeof value === 'function';
};

/**
 * Checks if a value is a Date object
 * @param value - The value to check
 * @returns True if the value is a Date object
 * @example
 * isDate(new Date());               // true
 * isDate('2023-01-01');            // false
 */
export const isDate = (value: any): value is Date => {
    return value instanceof Date && !isNaN(value.getTime());
};

/**
 * Checks if a value is a RegExp object
 * @param value - The value to check
 * @returns True if the value is a RegExp object
 * @example
 * isRegExp(/test/);                // true
 * isRegExp(new RegExp('test'));    // true
 * isRegExp('test');                // false
 */
export const isRegExp = (value: any): value is RegExp => {
    return value instanceof RegExp;
};

/**
 * Checks if a value is an Error object
 * @param value - The value to check
 * @returns True if the value is an Error object
 * @example
 * isError(new Error());            // true
 * isError(new TypeError());        // true
 * isError({ message: 'error' });   // false
 */
export const isError = (value: any): value is Error => {
    return value instanceof Error;
};

/**
 * Checks if a value is a Symbol
 * @param value - The value to check
 * @returns True if the value is a Symbol
 * @example
 * isSymbol(Symbol());              // true
 * isSymbol(Symbol('test'));        // true
 * isSymbol('symbol');              // false
 */
export const isSymbol = (value: any): value is symbol => {
    return typeof value === 'symbol';
};

/**
 * Checks if a value is a Map
 * @param value - The value to check
 * @returns True if the value is a Map
 * @example
 * isMap(new Map());                // true
 * isMap(new WeakMap());            // false
 * isMap({});                       // false
 */
export const isMap = (value: any): value is Map<any, any> => {
    return value instanceof Map;
};

/**
 * Checks if a value is a WeakMap
 * @param value - The value to check
 * @returns True if the value is a WeakMap
 * @example
 * isWeakMap(new WeakMap());        // true
 * isWeakMap(new Map());            // false
 */
export const isWeakMap = (value: any): value is WeakMap<object, any> => {
    return value instanceof WeakMap;
};

/**
 * Checks if a value is a Set
 * @param value - The value to check
 * @returns True if the value is a Set
 * @example
 * isSet(new Set());                // true
 * isSet(new WeakSet());            // false
 * isSet([]);                       // false
 */
export const isSet = (value: any): value is Set<any> => {
    return value instanceof Set;
};

/**
 * Checks if a value is a WeakSet
 * @param value - The value to check
 * @returns True if the value is a WeakSet
 * @example
 * isWeakSet(new WeakSet());        // true
 * isWeakSet(new Set());            // false
 */
export const isWeakSet = (value: any): value is WeakSet<object> => {
    return value instanceof WeakSet;
};

/**
 * Checks if a value is an ArrayBuffer
 * @param value - The value to check
 * @returns True if the value is an ArrayBuffer
 * @example
 * isArrayBuffer(new ArrayBuffer(8));    // true
 * isArrayBuffer(new Uint8Array(8));     // false
 */
export const isArrayBuffer = (value: any): value is ArrayBuffer => {
    return value instanceof ArrayBuffer;
};

/**
 * Checks if a value is a DataView
 * @param value - The value to check
 * @returns True if the value is a DataView
 * @example
 * const buffer = new ArrayBuffer(8);
 * isDataView(new DataView(buffer));     // true
 * isDataView(buffer);                   // false
 */
export const isDataView = (value: any): value is DataView => {
    return value instanceof DataView;
};

/**
 * Checks if a value is a TypedArray
 * @param value - The value to check
 * @returns True if the value is any kind of TypedArray
 * @example
 * isTypedArray(new Uint8Array());       // true
 * isTypedArray(new Float64Array());     // true
 * isTypedArray([]);                     // false
 */
export const isTypedArray = (value: any): boolean => {
    return ArrayBuffer.isView(value) && !(value instanceof DataView);
};

/**
 * Checks if a value is NaN
 * @param value - The value to check
 * @returns True if the value is NaN
 * @example
 * isNaN(NaN);                      // true
 * isNaN(Number('not a number'));   // true
 * isNaN(1);                        // false
 */
export const isNaN = (value: any): boolean => {
    return Number.isNaN(value);
};

/**
 * Checks if a value is null
 * @param value - The value to check
 * @returns True if the value is null
 * @example
 * isNull(null);                    // true
 * isNull(undefined);               // false
 * isNull(0);                       // false
 */
export const isNull = (value: any): value is null => {
    return value === null;
};

/**
 * Checks if a value is undefined
 * @param value - The value to check
 * @returns True if the value is undefined
 * @example
 * isUndefined(undefined);          // true
 * isUndefined(void 0);             // true
 * isUndefined(null);               // false
 */
export const isUndefined = (value: any): value is undefined => {
    return value === undefined;
};

/**
 * Checks if a value is finite
 * @param value - The value to check
 * @returns True if the value is a finite number
 * @example
 * isFinite(123);                   // true
 * isFinite(Infinity);              // false
 * isFinite(NaN);                   // false
 */
export const isFinite = (value: any): boolean => {
    return Number.isFinite(value);
};

/**
 * Checks if a string contains only alphanumeric characters (letters and numbers)
 * @param str - The string to check
 * @returns True if the string contains only alphanumeric characters
 * @example
 * isAlphanumeric('abc123');   // true
 * isAlphanumeric('abc-123');  // false
 * isAlphanumeric('abc 123');  // false
 */
export const isAlphanumeric = (str: string): boolean => {
    if (typeof str !== 'string') return false;
    return /^[a-zA-Z0-9]+$/.test(str);
};
