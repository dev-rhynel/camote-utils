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
 * Generates a random integer between min (inclusive) and max (inclusive)
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer between min and max
 * @throws {Error} If min is greater than max
 * @throws {Error} If min or max is not a finite number
 * @example
 * generateRandomIntegerInRange(5, 10);    // Returns a number between 5 and 10
 * generateRandomIntegerInRange(-10, 10);   // Returns a number between -10 and 10
 */
export const generateRandomIntegerInRange = (min: number, max: number): number => {
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
    const availableNumbers = Array.from({ length: range }, (_, i) => min + i).filter(num => !excludeSet.has(num));
    const availableCount = availableNumbers.length;

    if (availableCount <= 0) {
        throw new Error('No valid numbers available in the range after exclusions. Please check your min, max, and exclude values.');
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
 * Generates a random string based on specified options.
 * 
 * @param length - The length of the string to generate.
 * @param options - Configuration options for string generation, which may include:
 *    - custom: A string of custom characters to use for generation.
 *    - lowercase: A boolean indicating whether to include lowercase letters.
 *    - uppercase: A boolean indicating whether to include uppercase letters.
 *    - numbers: A boolean indicating whether to include numeric characters.
 *    - special: A boolean indicating whether to include special characters.
 *    - exclude: A string of characters to exclude from the generated string.
 * 
 * @returns A random string that matches the specified criteria.
 * 
 * @throws {Error} If length is less than 0.
 * @throws {Error} If no character set is selected (i.e., all options are false or empty).
 * 
 * @example
 * generateRandomString(8); // Might return "aB3$kL9p"
 * generateRandomString(10, { lowercase: true, numbers: true }); // Might return "a7b2n9k4m5"
 * generateRandomString(5, { custom: "ABC123" }); // Might return "B1CA3"
 */
export const generateRandomString = (length: number, options?: GenerateRandomStringOptions): string => {
    // Check for negative length
    if (length < 0) {
        throw new Error('Length cannot be negative');
    }

    const { custom, lowercase, uppercase, numbers, special, exclude } = options || {};
    let characters = '';

    // Build the character set using the CHARS object
    if (custom) {
        characters += custom;
    }
    if (lowercase) {
        characters += CHARS.lowercase;
    }
    if (uppercase) {
        characters += CHARS.uppercase;
    }
    if (numbers) {
        characters += CHARS.numbers;
    }
    if (special) {
        characters += CHARS.special;
    }

    // Exclude specified characters
    if (exclude) {
        characters = characters.split('').filter(char => !exclude.includes(char)).join('');
    }

    // Throw an error if no characters are available
    if (characters.length === 0) {
        throw new Error('No characters available for string generation. Please specify at least one character type.');
    }

    // Generate the random string
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

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
}

export const generateStrongPassword = (length: number = 12): string => {
    if (length < 8) {
        throw new Error('Password length must be at least 8 characters');
    }

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    // Ensure at least one character from each set is included
    const passwordChars = [
        lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length)),
        uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length)),
        numberChars.charAt(Math.floor(Math.random() * numberChars.length)),
        specialChars.charAt(Math.floor(Math.random() * specialChars.length))
    ];

    // Fill the rest of the password length with random characters
    for (let i = 4; i < length; i++) {
        const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
        passwordChars.push(allChars.charAt(Math.floor(Math.random() * allChars.length)))
    }

    // Shuffle the password characters
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    return passwordChars.join('')
}

export const generateRandomHexColor = (includeHash: boolean = true): string => {
    const hex = generateRandomInteger(0, 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
    return includeHash ? `#${hex}` : hex
}

export const generateRandomRGB = (includeArray: boolean = false): string | number[] => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return includeArray ? [r, g, b] : `rgb(${r}, ${g}, ${b})`
}

export const generateRandomHSL = (includeArray: boolean = false): string | number[] => {
    const h = Math.floor(Math.random() * 361) // Hue: 0-360
    const s = Math.floor(Math.random() * 101) // Saturation: 0-100%
    const l = Math.floor(Math.random() * 101) // Lightness: 0-100%
    return includeArray ? [h, s, l] : `hsl(${h}, ${s}%, ${l}%)`;
};

export const generateColorPalette = (numColors: number, format: 'hex' | 'rgb' | 'hsl' = 'hex'): string[] => {
    const palette: string[] = []
    for (let i = 0; i < numColors; i++) {
        palette.push(generateRandomColor(format))
    }
    return palette
}

export const generateRandomColor = (format: 'hex' | 'rgb' | 'hsl' = 'hex'): string => {
    switch (format) {
        case 'rgb':
            const rgbArray = generateRandomRGB(true)
            return Array.isArray(rgbArray) ? `rgb(${rgbArray.join(', ')})` : rgbArray
        case 'hsl':
            const hslArray = generateRandomHSL(true);
            return Array.isArray(hslArray) ? `hsl(${hslArray.join(', ')})` : hslArray
        default:
            return generateRandomHexColor()
    }
}

export const generateUUID = (): string => {
    // Generate 16 random bytes
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        bytes[i] = generateRandomInteger(0, 255)
    }

    // Set version (4) and variant (RFC4122)
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80

    // Convert to hex string
    const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');

    // Format as UUID
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const generateUUIDv4 = (): string => {
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        bytes[i] = generateRandomInteger(0, 255);
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Set version to 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Set variant to RFC4122

    const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export type GenerateRandomType = 'integer' | 'float' | 'boolean' | 'string' | 'hexColor' | 'rgbColor' | 'hslColor' | 'uuid' | 'colorPalette';

export interface GenerateRandomOptions {
    type: GenerateRandomType;
    min?: number;         
    max?: number;         
    length?: number;      
    stringOptions?: GenerateRandomStringOptions; 
    includeHash?: boolean; 
    numColors?: number;   
    format?: 'hex' | 'rgb' | 'hsl'; 
}

export const generateRandom = (options: GenerateRandomOptions): number | string | boolean | string[] => {
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

        case 'rgbColor':
            const rgb = generateRandomRGB();
            return Array.isArray(rgb) ? rgb.map(num => num.toString()) : rgb;
        
        case 'hslColor':
            const hsl = generateRandomHSL();
            return Array.isArray(hsl) ? hsl.map(num => num.toString()) : hsl;
        
        case 'colorPalette':
            if (typeof options.numColors !== 'number') {
                throw new Error('Number of colors must be provided for colorPalette type');
            }
            if (typeof options.format !== 'string') {
                throw new Error('Format must be provided for colorPalette type');
            }
            return generateColorPalette(options.numColors, options.format);
        
        case 'uuid':
            return generateUUID();
    
        default:
            throw new Error(`Invalid random type: ${options.type}`);
    }
};