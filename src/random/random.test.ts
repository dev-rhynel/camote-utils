import { 
    generateRandomInteger, 
    generateRandomIntegerArray, 
    generateRandomString, 
    generateRandomPassword, 
    generateRandomHexColor, 
    generateRandomRGB, 
    generateUUID, 
    generateUUIDv4,
    generateRandomHSL,
    generateColorPalette,
    generateRandomColor,
    generateRandom,
    generateRandomIntegerInRange
} from './index';

describe('Random Generation Functions', () => {
    test('generateRandomInteger should return a number between min and max', () => {
        const result = generateRandomInteger(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
    });

    test('generateRandomIntegerArray should return an array of specified length', () => {
        const result = generateRandomIntegerArray(5, 1, 10);
        expect(result).toHaveLength(5);
        result.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(1);
            expect(num).toBeLessThanOrEqual(10);
        });
    });

    test('generateRandomString should return a string of specified length', () => {
        const result = generateRandomString(8);
        expect(result).toHaveLength(8);
    });

    test('generateRandomPassword should return a string of at least 8 characters', () => {
        const result = generateRandomPassword(10);
        expect(result).toHaveLength(10);
    });

    test('generateRandomHexColor should return a valid hex color', () => {
        const result = generateRandomHexColor();
        expect(result).toMatch(/^#[0-9A-F]{6}$/i);
    });

    test('generateRandomRGB should return a valid RGB string', () => {
        const result = generateRandomRGB();
        expect(result).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
    });

    test('generateRandomHSL should return a valid HSL string', () => {
        const result = generateRandomHSL();
        expect(result).toMatch(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/);
    });

    test('generateColorPalette should return an array of specified length', () => {
        const result = generateColorPalette(5);
        expect(result).toHaveLength(5);
    });

    test('generateRandomColor should return a valid color string', () => {
        const result = generateRandomColor();
        expect(result).toMatch(/^(#([0-9A-F]{3}|[0-9A-F]{6})|rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)|hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\))$/);
    });

    test('generateUUID should return a valid UUID', () => {
        const result = generateUUID();
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    test('generateUUIDv4 should return a valid UUID v4', () => {
        const result = generateUUIDv4();
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    test('generateUUID should return a valid UUID', () => {
        const result = generateUUID();
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    test('generateUUIDv4 should return a valid UUID v4', () => {
        const result = generateUUIDv4();
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    test('generateRandom should return a number for integer type', () => {
        const result = generateRandom({ type: 'integer', min: 1, max: 10 });
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
    });
});

describe('generateRandomIntegerInRange', () => {
    test('returns a number within the range', () => {
        const result = generateRandomIntegerInRange(5, 10);
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeLessThanOrEqual(10);
    });

    test('returns the same number when min and max are equal', () => {
        const result = generateRandomIntegerInRange(7, 7);
        expect(result).toBe(7);
    });

    test('handles negative ranges', () => {
        const result = generateRandomIntegerInRange(-10, -5);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(-5);
    });

    test('throws an error if min is greater than max', () => {
        expect(() => generateRandomIntegerInRange(10, 5)).toThrow('Min cannot be greater than max');
    });

    test('throws an error if min or max is not a finite number', () => {
        expect(() => generateRandomIntegerInRange(NaN, 10)).toThrow('Both min and max must be finite numbers');
        expect(() => generateRandomIntegerInRange(5, Infinity)).toThrow('Both min and max must be finite numbers');
    });
});
