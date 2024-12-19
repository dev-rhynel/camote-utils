import { 
    generateRandomInteger, 
    generateRandomIntegerArray, 
    generateRandomIntegerExcluding, 
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
    generateRandomIntegerInRange,
    generateStrongPassword
} from '../src/random/index';


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
            const excludedValues = [5, 6];
            for (let i = 0; i < 100; i++) {
                const result = generateRandomIntegerExcluding(1, 10, excludedValues);
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(10);
                expect(excludedValues).not.toContain(result); // Ensure result is not in excluded values
                expect(Number.isInteger(result)).toBe(true);
            }
        });
    
        it('should handle single available number', () => {
            const result = generateRandomIntegerExcluding(1, 3, [1, 3]);
            expect(result).toBe(2);
        });
    
        it('should throw error when all numbers are excluded', () => {
            expect(() => generateRandomIntegerExcluding(1, 3, [1, 2, 3]))
                .toThrow('No valid numbers available in the range after exclusions. Please check your min, max, and exclude values.');
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
        it('should throw error for negative length', () => {
            expect(() => generateRandomString(-1)).toThrow('Length cannot be negative');
        });

        it('should throw error when no characters available', () => {
            expect(() => generateRandomString(10, { custom: '' }))
                .toThrow('No characters available for string generation. Please specify at least one character type.');
        });

        it('should generate a string of specified length with valid characters', () => {
            const result = generateRandomString(10, { lowercase: true, uppercase: true, numbers: true });
            expect(result).toHaveLength(10);
            expect(result).toMatch(/^[a-zA-Z0-9]+$/); // Check if it contains only letters and numbers
        });

        it('should generate a string using a custom character set', () => {
            const result = generateRandomString(10, { custom: 'ABC123' });
            expect(result).toHaveLength(10);
            expect(result).toMatch(/^[ABC123]+$/); // Check if it contains only specified characters
        });

        it('should exclude specified characters', () => {
            const result = generateRandomString(100, {
                lowercase: true,
                uppercase: true,
                numbers: true,
                exclude: 'aeiou0123'
            });
            expect(result).not.toMatch(/[aeiou0123]/); // Ensure excluded characters are not present
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
            const result = generateRandom({ type: 'string', length: 10, stringOptions: { lowercase: true } });
            expect(typeof result).toBe('string');
            expect(result).toHaveLength(10);
            expect(result).toMatch(/^[a-z]+$/); // Ensure it contains only lowercase letters
        });
    
        it('should respect string options', () => {
            const result = generateRandom({
                type: 'string',
                length: 100,
                stringOptions: { lowercase: true, uppercase: true }
            }) as string;
            expect(result).toMatch(/^[a-zA-Z]+$/); // Ensure it contains only letters
        });
    
        it('should throw error without length', () => {
            expect(() => generateRandom({ type: 'string' }))
                .toThrow('Length must be provided for string type');
        });
    });

    describe('all types', () => {
        it('should generate integer within range', () => {
            const result = generateRandom({ type: 'integer', min: 1, max: 10 });
            expect(typeof result).toBe('number');
            expect(Number.isInteger(result)).toBe(true);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
        });

        it('should handle float generation', () => {
            const result = generateRandom({ type: 'float', min: 0, max: 1 });
            expect(typeof result).toBe('number');
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(1);
        });

        it('should generate boolean', () => {
            const result = generateRandom({ type: 'boolean' });
            expect(typeof result).toBe('boolean');
        });

        it('should generate string of specified length', () => {
            const result = generateRandom({ type: 'string', length: 10, stringOptions: { lowercase: true } });
            expect(typeof result).toBe('string');
            expect(result).toHaveLength(10);
            expect(result).toMatch(/^[a-z]+$/); // Ensure it contains only lowercase letters
        });
    });

    it('should throw error for invalid type', () => {
        expect(() => generateRandom({ type: 'invalid' as any }))
            .toThrow('Invalid random type: invalid');
    });
});

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
        const result = generateRandomString(8, { lowercase: true, uppercase: true, numbers: true });
        expect(result).toHaveLength(8);
        expect(result).toMatch(/^[a-zA-Z0-9]+$/); // Check if it contains only letters and numbers
    });
    
    test('generateRandomPassword should return a string of at least 8 characters', () => {
        const result = generateRandomPassword(10);
        expect(result).toHaveLength(10);
        expect(result).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/); // Check if it contains valid characters
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
    
    describe('generateStrongPassword function', () => {
        test('should generate a password of specified length', () => {
          const password = generateStrongPassword(12);
          expect(password).toHaveLength(12);
        });
      
        test('should throw an error if length is less than 8', () => {
          expect(() => generateStrongPassword(7)).toThrow('Password length must be at least 8 characters');
        });
      
        test('should include at least one lowercase letter', () => {
          const password = generateStrongPassword(12);
          expect(password).toMatch(/[a-z]/);
        });
      
        test('should include at least one uppercase letter', () => {
          const password = generateStrongPassword(12);
          expect(password).toMatch(/[A-Z]/);
        });
      
        test('should include at least one number', () => {
          const password = generateStrongPassword(12);
          expect(password).toMatch(/[0-9]/);
        });
      
        test('should include at least one special character', () => {
          const password = generateStrongPassword(12);
          expect(password).toMatch(/[!@#$%^&*()_+[\]{}|;:,.<>?]/);
        });
      });
});
