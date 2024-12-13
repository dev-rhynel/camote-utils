/**
 * Generates a random integer between min (inclusive) and max (inclusive)
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer between min and max
 * @throws {Error} If min is greater than max
 * @throws {Error} If min or max is not a finite number
 * @example
 * generateRandomInteger(1, 10);    // Returns a number between 1 and 10
 * generateRandomInteger(0, 1);     // Returns either 0 or 1
 * generateRandomInteger(-5, 5);    // Returns a number between -5 and 5
 */
export const generateRandomInteger = (min: number, max: number): number => {
    // Validate input types
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new Error('Both min and max must be finite numbers');
    }

    // Convert to integers
    min = Math.floor(min);
    max = Math.floor(max);

    // Validate range
    if (min > max) {
        throw new Error('Min cannot be greater than max');
    }

    // Calculate range and add 1 to make max inclusive
    const range = max - min + 1;
    
    // Generate random number
    return Math.floor(Math.random() * range) + min;
};

/**
 * Generates an array of random integers
 * @param length - The length of the array to generate
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns An array of random integers
 * @throws {Error} If length is less than 0
 * @example
 * generateRandomIntegerArray(3, 1, 10);    // Returns e.g. [4, 7, 2]
 * generateRandomIntegerArray(5, 0, 1);     // Returns e.g. [1, 0, 1, 0, 1]
 */
export const generateRandomIntegerArray = (length: number, min: number, max: number): number[] => {
    if (length < 0) {
        throw new Error('Length cannot be negative');
    }

    return Array.from({ length }, () => generateRandomInteger(min, max));
};

/**
 * Generates a random integer excluding certain values
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @param exclude - Array of numbers to exclude
 * @returns A random integer between min and max, excluding specified values
 * @throws {Error} If no valid numbers are available in the range
 * @example
 * generateRandomIntegerExcluding(1, 10, [5, 6]);    // Returns a number between 1-4 or 7-10
 * generateRandomIntegerExcluding(1, 3, [2]);        // Returns either 1 or 3
 */
export const generateRandomIntegerExcluding = (min: number, max: number, exclude: number[]): number => {
    // Convert to integers and create a set of excluded numbers
    min = Math.floor(min);
    max = Math.floor(max);
    const excludeSet = new Set(exclude.map(Math.floor));

    // Calculate available numbers
    const range = max - min + 1;
    const availableCount = range - excludeSet.size;

    if (availableCount <= 0) {
        throw new Error('No valid numbers available in the range after exclusions');
    }

    // Generate random number until we get one that's not excluded
    let result: number;
    do {
        result = generateRandomInteger(min, max);
    } while (excludeSet.has(result));

    return result;
};

/**
 * Options for random string generation
 */
export interface GenerateRandomStringOptions {
    lowercase?: boolean;
    uppercase?: boolean;
    numbers?: boolean;
    special?: boolean;
    custom?: string;
    exclude?: string;
}

const CHARS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

/**
 * Generates a random string with specified options
 * @param length - Length of the string to generate
 * @param options - Configuration options for string generation
 * @returns Random string matching the specified criteria
 * @throws {Error} If length is less than 0
 * @throws {Error} If no character set is selected
 * @example
 * generateRandomString(8);                    // "aB3$kL9p"
 * generateRandomString(10, { lowercase: true, numbers: true }); // "a7b2n9k4m5"
 * generateRandomString(5, { custom: "ABC123" }); // "B1CA3"
 */
export const generateRandomString = (length: number, options: GenerateRandomStringOptions = {}): string => {
    if (length < 0) {
        throw new Error('Length cannot be negative');
    }

    // Build character set based on options
    let chars = '';
    if (options.custom) {
        chars = options.custom;
    } else {
        if (options.lowercase) chars += CHARS.lowercase;
        if (options.uppercase) chars += CHARS.uppercase;
        if (options.numbers) chars += CHARS.numbers;
        if (options.special) chars += CHARS.special;
        if (!chars) chars = CHARS.lowercase + CHARS.uppercase + CHARS.numbers;
    }

    // Remove excluded characters if specified
    if (options.exclude) {
        const excludeSet = new Set(options.exclude);
        chars = [...chars].filter(c => !excludeSet.has(c)).join('');
    }

    if (!chars) {
        throw new Error('No characters available for string generation');
    }

    // Generate random string
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[generateRandomInteger(0, chars.length - 1)];
    }

    return result;
};

/**
 * Generates a random password with good security characteristics
 * @param length - Length of the password (minimum 8)
 * @param options - Optional configuration for additional requirements
 * @returns Secure random password
 * @throws {Error} If length is less than 8
 * @example
 * generateRandomPassword(12);  // "aB3$kL9p#mN4"
 * generateRandomPassword(8, { exclude: 'O0Il1' }); // Excludes ambiguous characters
 */
export const generateRandomPassword = (length: number, options: Omit<GenerateRandomStringOptions, 'lowercase' | 'uppercase' | 'numbers' | 'special'> = {}): string => {
    if (length < 8) {
        throw new Error('Password length must be at least 8 characters');
    }

    // Ensure password has at least one of each required character type
    const password = generateRandomString(length, {
        ...options,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true
    });

    return password;
};

/**
 * Generates a random hex color string
 * @param includeHash - Whether to include # prefix
 * @returns Random hex color string
 * @example
 * generateRandomHexColor();     // "#FF5733"
 * generateRandomHexColor(false); // "FF5733"
 */
export const generateRandomHexColor = (includeHash: boolean = true): string => {
    const hex = generateRandomInteger(0, 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
    return includeHash ? `#${hex}` : hex;
};

/**
 * Generates a UUID v4 (random) string
 * @returns A UUID v4 string
 * @example
 * generateUuid() // "123e4567-e89b-12d3-a456-426614174000"
 */
export const generateUuid = (): string => {
    // Generate 16 random bytes
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        bytes[i] = generateRandomInteger(0, 255);
    }

    // Set version (4) and variant (RFC4122)
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    // Convert to hex string
    const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');

    // Format as UUID
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

/**
 * Type of random value to generate
 */
export type GenerateRandomType = 'integer' | 'float' | 'boolean' | 'string' | 'hexColor' | 'uuid';

/**
 * Options for random value generation
 */
export interface GenerateRandomOptions {
    type: GenerateRandomType;
    min?: number;          // For numbers
    max?: number;          // For numbers
    length?: number;       // For strings
    stringOptions?: GenerateRandomStringOptions; // For strings
    includeHash?: boolean; // For hexColor
}

/**
 * Generates a random value of the specified type
 * @param options - Configuration options for random value generation
 * @returns Random value of the specified type
 * @throws {Error} If invalid options are provided
 * @example
 * generateRandom({ type: 'integer', min: 1, max: 10 });     // 7
 * generateRandom({ type: 'float', min: 0, max: 1 });        // 0.123456
 * generateRandom({ type: 'boolean' });                      // true
 * generateRandom({ type: 'string', length: 8 });            // "aB3$kL9p"
 * generateRandom({ type: 'hexColor' });                     // "#FF5733"
 * generateRandom({ type: 'uuid' });                         // "123e4567-e89b-12d3-a456-426614174000"
 */
export const generateRandom = (options: GenerateRandomOptions): number | string | boolean => {
    switch (options.type) {
        case 'integer':
            if (typeof options.min !== 'number' || typeof options.max !== 'number') {
                throw new Error('Min and max must be provided for integer type');
            }
            return generateRandomInteger(options.min, options.max);

        case 'float':
            if (typeof options.min !== 'number' || typeof options.max !== 'number') {
                throw new Error('Min and max must be provided for float type');
            }
            return options.min + Math.random() * (options.max - options.min);

        case 'boolean':
            return Math.random() < 0.5;

        case 'string':
            if (typeof options.length !== 'number') {
                throw new Error('Length must be provided for string type');
            }
            return generateRandomString(options.length, options.stringOptions);

        case 'hexColor':
            return generateRandomHexColor(options.includeHash);

        case 'uuid':
            return generateUuid();

        default:
            throw new Error(`Invalid random type: ${options.type}`);
    }
};
