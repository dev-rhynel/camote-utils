import { generateRandomInteger, generateRandomIntegerArray, generateRandomIntegerExcluding, generateRandomString, generateRandomPassword, generateRandomHexColor, generateRandom } from '../index';

describe('Random Number Functions', () => {
    describe('generateRandomInteger', () => {
        it('should generate numbers within the specified range', () => {
            for (let i = 0; i < 1000; i++) {
                const result = generateRandomInteger(1, 10);
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(10);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        it('should handle min equal to max', () => {
            const result = generateRandomInteger(5, 5);
            expect(result).toBe(5);
        });

        it('should handle negative numbers', () => {
            for (let i = 0; i < 100; i++) {
                const result = generateRandomInteger(-10, -1);
                expect(result).toBeGreaterThanOrEqual(-10);
                expect(result).toBeLessThanOrEqual(-1);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        it('should throw error for invalid range', () => {
            expect(() => generateRandomInteger(10, 1)).toThrow('Min cannot be greater than max');
        });

        it('should throw error for non-finite numbers', () => {
            expect(() => generateRandomInteger(Infinity, 10)).toThrow('Both min and max must be finite numbers');
            expect(() => generateRandomInteger(1, Infinity)).toThrow('Both min and max must be finite numbers');
            expect(() => generateRandomInteger(NaN, 10)).toThrow('Both min and max must be finite numbers');
        });
    });

    describe('generateRandomIntegerArray', () => {
        it('should generate array of specified length', () => {
            const result = generateRandomIntegerArray(5, 1, 10);
            expect(result).toHaveLength(5);
            result.forEach(num => {
                expect(num).toBeGreaterThanOrEqual(1);
                expect(num).toBeLessThanOrEqual(10);
                expect(Number.isInteger(num)).toBe(true);
            });
        });

        it('should handle empty array', () => {
            const result = generateRandomIntegerArray(0, 1, 10);
            expect(result).toHaveLength(0);
        });

        it('should throw error for negative length', () => {
            expect(() => generateRandomIntegerArray(-1, 1, 10)).toThrow('Length cannot be negative');
        });
    });

    describe('generateRandomIntegerExcluding', () => {
        it('should generate numbers excluding specified values', () => {
            for (let i = 0; i < 100; i++) {
                const result = generateRandomIntegerExcluding(1, 10, [5, 6]);
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(10);
                expect(result).not.toBe(5);
                expect(result).not.toBe(6);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        it('should handle single available number', () => {
            const result = generateRandomIntegerExcluding(1, 3, [1, 3]);
            expect(result).toBe(2);
        });

        it('should throw error when all numbers are excluded', () => {
            expect(() => generateRandomIntegerExcluding(1, 3, [1, 2, 3]))
                .toThrow('No valid numbers available in the specified range after exclusions');
        });

        it('should handle empty exclusion list', () => {
            const result = generateRandomIntegerExcluding(1, 5, []);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(5);
            expect(Number.isInteger(result)).toBe(true);
        });
    });
});

describe('Random String Functions', () => {
    describe('generateRandomString', () => {
        it('should generate string of specified length', () => {
            const result = generateRandomString(10);
            expect(result).toHaveLength(10);
        });

        it('should use default alphanumeric characters', () => {
            const result = generateRandomString(100);
            expect(result).toMatch(/^[a-zA-Z0-9]+$/);
        });

        it('should respect character set options', () => {
            const lowercase = generateRandomString(100, { lowercase: true });
            expect(lowercase).toMatch(/^[a-z]+$/);

            const uppercase = generateRandomString(100, { uppercase: true });
            expect(uppercase).toMatch(/^[A-Z]+$/);

            const numbers = generateRandomString(100, { numbers: true });
            expect(numbers).toMatch(/^[0-9]+$/);

            const special = generateRandomString(100, { special: true });
            expect(special).toMatch(/^[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
        });

        it('should handle custom characters', () => {
            const result = generateRandomString(100, { custom: 'ABC123' });
            expect(result).toMatch(/^[ABC123]+$/);
        });

        it('should exclude specified characters', () => {
            const result = generateRandomString(100, {
                lowercase: true,
                uppercase: true,
                numbers: true,
                exclude: 'aeiou0123'
            });
            expect(result).not.toMatch(/[aeiou0123]/);
        });

        it('should throw error for negative length', () => {
            expect(() => generateRandomString(-1)).toThrow('Length cannot be negative');
        });

        it('should throw error when no characters available', () => {
            expect(() => generateRandomString(10, { custom: '' }))
                .toThrow('No characters available for string generation');
        });
    });

    describe('generateRandomPassword', () => {
        it('should generate secure password of specified length', () => {
            const result = generateRandomPassword(12);
            expect(result).toHaveLength(12);
        });

        it('should include all required character types', () => {
            const result = generateRandomPassword(12);
            expect(result).toMatch(/[a-z]/);    // lowercase
            expect(result).toMatch(/[A-Z]/);    // uppercase
            expect(result).toMatch(/[0-9]/);    // numbers
            expect(result).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/); // special
        });

        it('should respect excluded characters', () => {
            const result = generateRandomPassword(12, { exclude: 'O0Il1' });
            expect(result).not.toMatch(/[O0Il1]/);
        });

        it('should throw error for short passwords', () => {
            expect(() => generateRandomPassword(7))
                .toThrow('Password length must be at least 8 characters');
        });
    });

    describe('generateRandomHexColor', () => {
        it('should generate valid hex color with hash', () => {
            const result = generateRandomHexColor();
            expect(result).toMatch(/^#[0-9A-F]{6}$/);
        });

        it('should generate valid hex color without hash', () => {
            const result = generateRandomHexColor(false);
            expect(result).toMatch(/^[0-9A-F]{6}$/);
        });
    });
});

describe('generateRandom', () => {
    describe('integer type', () => {
        it('should generate integer within range', () => {
            const result = generateRandom({ type: 'integer', min: 1, max: 10 });
            expect(typeof result).toBe('number');
            expect(Number.isInteger(result)).toBe(true);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
        });

        it('should throw error without min/max', () => {
            expect(() => generateRandom({ type: 'integer' }))
                .toThrow('Min and max must be provided for integer type');
        });
    });

    describe('float type', () => {
        it('should generate float within range', () => {
            const result = generateRandom({ type: 'float', min: 0, max: 1 }) as number;
            expect(typeof result).toBe('number');
            expect(Number.isInteger(result)).toBe(false);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(1);
        });

        it('should throw error without min/max', () => {
            expect(() => generateRandom({ type: 'float' }))
                .toThrow('Min and max must be provided for float type');
        });
    });

    describe('boolean type', () => {
        it('should generate boolean', () => {
            const result = generateRandom({ type: 'boolean' });
            expect(typeof result).toBe('boolean');
        });

        it('should generate both true and false', () => {
            const results = new Set();
            for (let i = 0; i < 100; i++) {
                results.add(generateRandom({ type: 'boolean' }));
            }
            expect(results.size).toBe(2);
        });
    });

    describe('string type', () => {
        it('should generate string of specified length', () => {
            const result = generateRandom({ type: 'string', length: 10 });
            expect(typeof result).toBe('string');
            expect(result).toHaveLength(10);
        });

        it('should respect string options', () => {
            const result = generateRandom({
                type: 'string',
                length: 100,
                stringOptions: { lowercase: true }
            }) as string;
            expect(result).toMatch(/^[a-z]+$/);
        });

        it('should throw error without length', () => {
            expect(() => generateRandom({ type: 'string' }))
                .toThrow('Length must be provided for string type');
        });
    });

    describe('hexColor type', () => {
        it('should generate valid hex color with hash', () => {
            const result = generateRandom({ type: 'hexColor', includeHash: true });
            expect(typeof result).toBe('string');
            expect(result).toMatch(/^#[0-9A-F]{6}$/);
        });

        it('should generate valid hex color without hash', () => {
            const result = generateRandom({ type: 'hexColor', includeHash: false });
            expect(typeof result).toBe('string');
            expect(result).toMatch(/^[0-9A-F]{6}$/);
        });
    });

    it('should throw error for invalid type', () => {
        expect(() => generateRandom({ type: 'invalid' as any }))
            .toThrow('Invalid random type: invalid');
    });
});
