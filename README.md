# Camote Utils

A comprehensive TypeScript utility library for common string and number operations.

[![npm version](https://img.shields.io/npm/v/camote-utils.svg)](https://www.npmjs.com/package/camote-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Total Downloads](https://img.shields.io/npm/dt/camote-utils.svg)](https://www.npmjs.com/package/camote-utils)


## Installation

```bash
npm install camote-utils
```

## Basic Usage

Import the functions you need:

```typescript
import { 
  formatNumber, 
  formatCurrency,
  formatDecimals,
  calculateDiscountPrice,
  pluralize,
  generateUuid,
  isUrl,
  isUuid,
  isDateWithinRange 
} from 'camote-utils';

// Format numbers
formatNumber(1234);     // "1.2K"
formatNumber(1500000);  // "1.5M"

// Format decimals with different rounding modes
formatDecimals(1.2345, 2);         // "1.23"
formatDecimals(1.2345, 2, 'ceil'); // "1.24"

// Format currency
formatCurrency(1234.56);                 // "$1,234.56"
formatCurrency(1234.56, 'EUR');          // "€1,234.56"
formatCurrency(1234.56, 'JPY', 'ja-JP'); // "¥1,235"

// Calculate discounted prices
calculateDiscountPrice(100, 20);      // 80.00 (20% off)
calculateDiscountPrice(100, 30, '$'); // 70.00 ($30 off)

// Pluralize words
pluralize('cat', 1);              // "cat"
pluralize('cat', 2);              // "cats"
pluralize('child', 2, 'children'); // "children"

// Generate UUID
generateUuid();  // "123e4567-e89b-12d3-a456-426614174000"

// Validate strings
isUrl('https://example.com');  // true
isUuid('123e4567-e89b-12d3-a456-426614174000');  // true

// Check if date is within range
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');
isDateWithinRange(startDate, endDate);  // true if current date is within range
```

## Chain Operations

The library now supports chainable operations similar to lodash/underscore. You can use it in three different ways:

### 1. Chain Syntax

```typescript
import { _ } from 'camote-utils';

// String operations
_.chain('hello world')
  .capitalize()
  .toCamelCase()
  .valueOf(); // "HelloWorld"

// Number formatting
_.chain(1234.56)
  .formatCurrency('USD')
  .valueOf(); // "$1,234.56"

// Array operations
_.chain([1, 2, 3, 4])
  .map(x => x * 2)
  .filter(x => x > 4)
  .valueOf(); // [6, 8]
```

### 2. Static Methods

```typescript
import { _ } from 'camote-utils';

// Use static methods directly
_.capitalize('hello world');
_.formatCurrency(1234.56, 'USD');
_.isNil(null); // true
_.isEmpty([]); // true
```

### 3. Direct Imports (Original Way)

```typescript
import { formatters } from 'camote-utils';

// Use original formatters
formatters.capitalize('hello world');
formatters.formatCurrency(1234.56, 'USD');
```

### Available Chain Methods

#### String Operations
- `capitalize()` - Capitalizes the first letter
- `truncate(length, ellipsis?)` - Truncates text to specified length
- `toCamelCase()` - Converts to camelCase
- `toKebabCase()` - Converts to kebab-case

#### Number Operations
- `formatCurrency(currency?, locale?)` - Formats as currency
- `formatWithCommas()` - Adds thousand separators
- `formatPercentage(decimals?)` - Formats as percentage

#### Array Operations
- `map(fn)` - Transforms array elements
- `filter(fn)` - Filters array elements

#### Static Utility Methods
- `_.isNil(value)` - Checks for null/undefined
- `_.isEmpty(value)` - Checks if value is empty
- `_.chain(value)` - Creates a new chain

## API Reference

### Number Formatting

#### formatNumber(number: number, options?: FormatNumberOptions): string
Formats a number into a human-readable string with unit suffixes (K, M, B, T).

```typescript
formatNumber(1234);     // "1.2K"
formatNumber(1500000);  // "1.5M"
formatNumber(1234, { precision: 2 });  // "1.23K"
```

#### formatDecimals(num: number, decimals: number, roundingMode?: 'ceil' | 'floor' | 'round'): string
Formats a number with specified decimal places and rounding mode.

```typescript
// Default rounding (round)
formatDecimals(1.2345, 2);        // "1.23"
formatDecimals(1.2356, 2);        // "1.24"

// Ceiling rounding
formatDecimals(1.2345, 2, 'ceil'); // "1.24"
formatDecimals(1.2301, 2, 'ceil'); // "1.24"

// Floor rounding
formatDecimals(1.2345, 2, 'floor'); // "1.23"
formatDecimals(1.2399, 2, 'floor'); // "1.23"
```

### Currency Formatting

#### formatCurrency(amount: number, currency?: string, locale?: string): string
Formats a number as currency.

```typescript
formatCurrency(1234.56);                    // "$1,234.56"
formatCurrency(1234.56, 'EUR');             // "€1,234.56"
formatCurrency(1234.56, 'JPY', 'ja-JP');    // "¥1,235"
```

### Price Calculations

#### calculateDiscountPrice(originalPrice: number, discountAmount: number, discountType?: '%' | '$'): number
Calculates the final price after applying a discount. Supports both percentage and fixed amount discounts.

```typescript
// Percentage discount (default)
calculateDiscountPrice(100, 20);      // 80.00
calculateDiscountPrice(50, 10, '%');  // 45.00

// Fixed amount discount
calculateDiscountPrice(100, 30, '$'); // 70.00

// Precise decimal handling
calculateDiscountPrice(75.50, 15, '%');    // 64.17
calculateDiscountPrice(50.55, 10.55, '$'); // 40.00
```

### String Manipulation

#### pluralize(word: string, count?: number, customPlural?: string): string
Converts a word to its plural form based on count.

```typescript
pluralize('cat', 1);              // "cat"
pluralize('cat', 2);              // "cats"
pluralize('child', 2, 'children'); // "children"
```

#### capitalize(str: string): string
Capitalizes the first character of a string.

```typescript
capitalize('hello');  // "Hello"
capitalize('world');  // "World"
```

#### truncate(str: string, length: number, ending?: string): string
Truncates a string if longer than specified length.

```typescript
truncate('Hello World', 5);     // "He..."
truncate('Hello World', 8, '~'); // "Hello~"
```

#### toCamelCase(str: string): string
Converts a string to camelCase.

```typescript
toCamelCase('hello-world');  // "helloWorld"
toCamelCase('Hello World');  // "helloWorld"
```

#### toKebabCase(str: string): string
Converts a string to kebab-case.

```typescript
toKebabCase('helloWorld');   // "hello-world"
toKebabCase('Hello World');  // "hello-world"
```

### UUID Generation

#### generateUuid(): string
Generates a UUID v4 string.

```typescript
generateUuid();  // "123e4567-e29b-41d4-a716-446655440000"
generateUuid();  // "550e8400-e29b-41d4-a716-446655440000"
```

### Date Validation

#### isDateWithinRange(startDate: Date | null, endDate: Date | null): boolean
Checks if the current date falls within a given date range. The start date is considered from the beginning of the day (00:00:00.000) and the end date is considered until the end of the day (23:59:59.999).

```typescript
// Check if current date is within range
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');
isDateWithinRange(startDate, endDate);  // true if current date is within range

// Handle null dates
isDateWithinRange(null, new Date());     // false
isDateWithinRange(new Date(), null);     // false

// Same day range
const today = new Date();
isDateWithinRange(today, today);         // true (considers full day)
```

### Checkers

#### isUrl(str: string): boolean
Validates if a string is a valid URL.

```typescript
isUrl('https://example.com');  // true
isUrl('not-a-url');           // false
```

#### isUuid(str: string): boolean
Validates if a string is a valid UUID.

```typescript
isUuid('123e4567-e29b-41d4-a716-446655440000');  // true
isUuid('not-a-uuid');                             // false
```

## Random Generation

The library provides a comprehensive set of random value generation functions:

```typescript
import { _ } from 'camote-utils';

// Generate random integers
_.generateRandomInteger(1, 10);                    // Number between 1 and 10
_.generateRandomIntegerArray(3, 1, 10);           // [4, 7, 2]
_.generateRandomIntegerExcluding(1, 10, [5, 6]);  // Number between 1-4 or 7-10

// Generate random strings
_.generateRandomString(8);                         // "aB3$kL9p"
_.generateRandomString(10, { lowercase: true });   // "abcdefghij"
_.generateRandomString(5, { custom: "ABC123" });   // "B1CA3"

// Generate secure passwords
_.generateRandomPassword(12);                      // "aB3$kL9p#mN4"
_.generateRandomPassword(8, { exclude: 'O0Il1' }); // Excludes ambiguous chars

// Generate hex colors
_.generateRandomHexColor();                        // "#FF5733"
_.generateRandomHexColor(false);                   // "FF5733"

// Generate any random type
_.generateRandom({ type: 'integer', min: 1, max: 10 });     // 7
_.generateRandom({ type: 'float', min: 0, max: 1 });        // 0.123456
_.generateRandom({ type: 'boolean' });                      // true
_.generateRandom({ type: 'string', length: 8 });            // "aB3$kL9p"
_.generateRandom({ type: 'hexColor' });                     // "#FF5733"
```

### Random String Options

When generating random strings, you can customize the character set:

```typescript
interface GenerateRandomStringOptions {
    lowercase?: boolean;   // Include a-z
    uppercase?: boolean;   // Include A-Z
    numbers?: boolean;     // Include 0-9
    special?: boolean;     // Include !@#$%^&*()_+-=[]{}|;:,.<>?
    custom?: string;      // Use custom character set
    exclude?: string;     // Characters to exclude
}

// Examples
_.generateRandomString(10, { 
    lowercase: true, 
    numbers: true 
});  // "a7b2n9k4m5"

_.generateRandomString(8, { 
    custom: "ABC123",
    exclude: "B2" 
});  // "A1C3A1C3"
```

### Password Generation

Generate secure passwords with required character types:

```typescript
// Default includes lowercase, uppercase, numbers, and special chars
const password = _.generateRandomPassword(12);  // "aB3$kL9p#mN4"

// Exclude ambiguous characters
const password = _.generateRandomPassword(12, { 
    exclude: 'O0Il1' 
});  // "mK4$pJ9#nR5"
```

### Random Types

Available types for `generateRandom`:

```typescript
type GenerateRandomType = 'integer' | 'float' | 'boolean' | 'string' | 'hexColor';

interface GenerateRandomOptions {
    type: GenerateRandomType;
    min?: number;          // For numbers
    max?: number;          // For numbers
    length?: number;       // For strings
    stringOptions?: GenerateRandomStringOptions;
    includeHash?: boolean; // For hexColor
}
```

## Security Policy

For information about our security policy and how to report vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Visit our [documentation](https://dev-rhynel.github.io/camote-utils/) for detailed API references and examples.

MIT © [Rhynel](https://github.com/dev-rhynel)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
