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
  pluralize,
  generateUuid,
  isUrl,
  isUuid 
} from 'camote-utils';

// Format numbers
formatNumber(1234);     // "1.2K"
formatNumber(1500000);  // "1.5M"

// Format currency
formatCurrency(1234.56);                 // "$1,234.56"
formatCurrency(1234.56, 'EUR');          // "€1,234.56"
formatCurrency(1234.56, 'JPY', 'ja-JP'); // "¥1,235"

// Pluralize words
pluralize('cat', 1);              // "cat"
pluralize('cat', 2);              // "cats"
pluralize('child', 2, 'children'); // "children"

// Generate UUID
generateUuid();  // "123e4567-e89b-12d3-a456-426614174000"

// Validate strings
isUrl('https://example.com');  // true
isUuid('123e4567-e89b-12d3-a456-426614174000');  // true
```

## API Reference

### Number Formatting

#### formatNumber(number: number, options?: FormatNumberOptions): string
Formats a number into a human-readable string with unit suffixes (K, M, B, T).

```typescript
formatNumber(1234);     // "1.2K"
formatNumber(1500000);  // "1.5M"
formatNumber(1234, { precision: 2 });  // "1.23K"
```

#### formatPercent(number: number, options?: FormatPercentOptions): string
Formats a number as a percentage.

```typescript
formatPercent(0.125);     // "12.5%"
formatPercent(0.125, { precision: 1 });  // "12.5%"
```

### Currency Formatting

#### formatCurrency(amount: number, currency?: string, locale?: string): string
Formats a number as currency.

```typescript
formatCurrency(1234.56);                    // "$1,234.56"
formatCurrency(1234.56, 'EUR');             // "€1,234.56"
formatCurrency(1234.56, 'JPY', 'ja-JP');    // "¥1,235"
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
generateUuid();  // "123e4567-e89b-12d3-a456-426614174000"
generateUuid();  // "550e8400-e29b-41d4-a716-446655440000"
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
isUuid('123e4567-e89b-12d3-a456-426614174000');  // true
isUuid('not-a-uuid');                             // false
```

Visit our [documentation](https://dev-rhynel.github.io/camote-utils/) for detailed API references and examples.

## License

MIT © [Rhynel](https://github.com/dev-rhynel)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
