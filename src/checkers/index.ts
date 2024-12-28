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

/**
 * Checks if a string is a valid email address
 * @param str - The input string to validate
 * @returns boolean indicating if the string is a valid email
 * @example
 * isEmail("example@example.com"); // true
 * isEmail("not-an-email"); // false
 * isEmail("user@domain..com"); // false
 */
export const isEmail = (str: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/;
    return emailRegex.test(str);
};

/**
 * Checks if a password is strong
 * @param password - The password to check
 * @returns True if the password is strong
 * @example
 * isStrongPassword("Password123!"); // true
 * isStrongPassword("weakpass"); // false
 */
export const isStrongPassword = (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
};

/**
 * Checks if a string is a valid time format (HH:MM or HH:MM:SS).
 * @param timeString - The time string to validate.
 * @returns True if the time is valid, false otherwise.
 * @example
 * isValidTime("14:30"); // true
 * isValidTime("02:30 PM"); // true
 * isValidTime("25:00"); // false
 * isValidTime("14:60"); // false
 */
export const isValidTime = (timeString: string): boolean => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;
    const amPmRegex = /^(0[0-9]|1[0-2]):([0-5][0-9])(:([0-5][0-9]))?\s?(AM|PM)$/i;
    return timeRegex.test(timeString) || amPmRegex.test(timeString);
};

