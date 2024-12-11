# camote-utils

A comprehensive TypeScript utility library featuring advanced string and number formatting, data structures, and algorithms.

[![npm version](https://img.shields.io/npm/v/camote-utils.svg)](https://www.npmjs.com/package/camote-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install camote-utils
```

## Usage

### Number Formatting

```typescript
import {
  humanReadableNumber,
  formatWithCommas,
  formatPercentage,
  formatOrdinal,
  formatFileSize,
  formatCurrency,
  formatDecimals
} from 'camote-utils';

// Human readable numbers
console.log(humanReadableNumber(1234));     // "1.2K"
console.log(humanReadableNumber(1500000));  // "1.5M"
console.log(humanReadableNumber(1000000000)); // "1.0B"

// Numbers with commas
console.log(formatWithCommas(1234567));  // "1,234,567"

// Percentages
console.log(formatPercentage(0.1234));    // "12%"
console.log(formatPercentage(0.1234, 1)); // "12.3%"

// Ordinal numbers
console.log(formatOrdinal(1));  // "1st"
console.log(formatOrdinal(2));  // "2nd"
console.log(formatOrdinal(3));  // "3rd"
console.log(formatOrdinal(4));  // "4th"

// File sizes
console.log(formatFileSize(1024));        // "1.00 KB"
console.log(formatFileSize(1234567));     // "1.18 MB"
console.log(formatFileSize(1024 * 1024)); // "1.00 MB"

// Currency
console.log(formatCurrency(1234.56));                    // "$1,234.56"
console.log(formatCurrency(1234.56, 'EUR', 'de-DE'));   // "1.234,56 €"

// Decimal places with rounding
console.log(formatDecimals(1.2345, 2));           // "1.23"
console.log(formatDecimals(1.2345, 2, 'ceil'));   // "1.24"
console.log(formatDecimals(1.2345, 2, 'floor'));  // "1.23"
```

### String Formatting

```typescript
import {
  capitalize,
  truncate,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  slugify,
  wordCount,
  pad,
  format,
  reverse,
  clean,
  pluralize
} from 'camote-utils';

// Capitalize strings
console.log(capitalize("hello"));  // "Hello"

// Truncate strings
console.log(truncate("Hello World", 8));  // "Hello..."
console.log(truncate("Hello World", 8, '!'));  // "Hello W!"

// Case conversions
console.log(toCamelCase("hello-world"));   // "helloWorld"
console.log(toKebabCase("helloWorld"));    // "hello-world"
console.log(toSnakeCase("Hello World"));   // "hello_world"

// URL-friendly slugs
console.log(slugify("Hello World!"));      // "hello-world"
console.log(slugify("What's Up?"));        // "whats-up"

// Word counting
console.log(wordCount("Hello world"));     // 2

// String padding
console.log(pad("hello", 8));              // "hello   "
console.log(pad("hello", 8, "*", "start")); // "***hello"
console.log(pad("hello", 8, "*", "both"));  // "*hello**"

// Template formatting
console.log(format("Hello {name}!", { name: "World" }));  // "Hello World!"
console.log(format("{greeting} {name}!", { 
  greeting: "Hi",
  name: "User"
}));  // "Hi User!"

// String reversal
console.log(reverse("hello"));  // "olleh"

// Clean whitespace
console.log(clean("  hello   world  "));  // "hello world"

// Pluralization
console.log(pluralize('cat', 1));              // "cat"
console.log(pluralize('cat', 2));              // "cats"
console.log(pluralize('baby', 2));             // "babies"
console.log(pluralize('box', 2));              // "boxes"
console.log(pluralize('child', 2, 'children')); // "children"
```

## Features

- 🚀 **Fast & Lightweight**: Optimized for performance
- 💪 **Type-Safe**: Written in TypeScript with full type definitions
- 🔧 **Easy to Use**: Simple, intuitive API
- 🌍 **Internationalization**: Support for multiple locales
- 📦 **Tree-Shakeable**: Import only what you need

## Documentation

Visit our [documentation](https://dev-rhynel.github.io/camote-utils/) for detailed API references and examples.

## License

MIT © [Rhynel](https://github.com/dev-rhynel)
