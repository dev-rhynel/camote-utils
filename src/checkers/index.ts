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
