# Camote Utils

A comprehensive TypeScript utility library featuring advanced string and number formatting functions.

[![npm version](https://img.shields.io/npm/v/camote-utils.svg)](https://www.npmjs.com/package/camote-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Total Downloads](https://img.shields.io/npm/dt/camote-utils.svg)](https://www.npmjs.com/package/camote-utils)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/rhynel/camote-utils)
[![Maintenance](https://img.shields.io/badge/maintenance-active-brightgreen.svg)](https://github.com/rhynel/camote-utils)
[![GitHub Stars](https://img.shields.io/github/stars/dev-rhynel/camote-utils.svg)](https://github.com/dev-rhynel/camote-utils)
[![Twitter Follow](https://img.shields.io/twitter/follow/devrhynel.svg?style=social)](https://twitter.com/devrhynel)

## Highlights
- A comprehensive TypeScript utility library featuring advanced string and number formatting, data structures, and algorithms.
- Updated to version **1.0.8**.
- New return type for the `generateRandom` method now includes `string[]`.

## Installation

```bash
npm install camote-utils
```

## Basic Usage

Import the functions you need:

```typescript
import { 
   _,
  humanReadableNumber, 
  formatCurrency,
  formatDecimals,
  calculateDiscountPrice,
  pluralize,
  generateUUID,
  isUrl,
  isUuid,
  isDateWithinRange 
} from 'camote-utils';

// Format numbers
// Basic formatting
_.humanReadableNumber(1234567.89)               // "1.2M"

// With units
_.humanReadableNumber(1500, { decimals: 0 })      // "2K"

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
pluralize('cat', 1) // 'cat'
pluralize('cat', 2) // 'cats'
pluralize('box', 2) // 'boxes'
pluralize('baby', 2, 'babies') // 'babies'
pluralize('person', 1, 'people') // 'person'
pluralize('person', 2, 'people') // 'people'    

// Basic UUID generation (v4)
generateUUID()     // e.g., "123e4567-e89b-12d3-a456-426614174000"

// Specific UUID versions
generateUUIDv4()   // e.g., "110ec58a-a0f2-4ac4-8393-c866d813b8d1"

// Validate strings
isUrl('https://example.com');  // true
isUuid('123e4567-e89b-12d3-a456-426614174000');  // true

// Check if date is within range
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');
isDateWithinRange(startDate, endDate);  // true if current date is within range

// Chain Syntax
// String operations
const capitalized = _.chain('hello world')
  .capitalize()
  .toCamelCase()
  .valueOf(); // "HelloWorld"

// Number formatting
const formattedCurrency = _.chain(1234.56)
  .formatCurrency('USD')
  .valueOf(); // "$1,234.56"

// Array operations
const doubledFiltered = _.chain([1, 2, 3, 4])
  .map(x => x * 2) // Double each number
  .filter(x => x > 4) // Keep only numbers greater than 4
  .valueOf(); // [6, 8]
```

For full documentation, please visit our [documentation site](https://dev-rhynel.github.io/camote-utils).

## Security Policy

For information about our security policy and how to report vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT © [Rhynel](https://github.com/dev-rhynel)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
