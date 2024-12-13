import * as numberFormatters from '../formatters/number';
import * as stringFormatters from '../formatters/string';
import * as dateFormatters from '../formatters/date';
import * as checkers from '../checkers';

export class _ {
    private value: any;

    constructor(value: any) {
        this.value = value;
    }

    // Get the final value
    valueOf(): any {
        return this.value;
    }

    // String operations
    capitalize(): _ {
        this.value = stringFormatters.capitalize(String(this.value));
        return this;
    }

    truncate(length: number, ellipsis?: string): _ {
        this.value = stringFormatters.truncate(String(this.value), length, ellipsis);
        return this;
    }

    toCamelCase(): _ {
        this.value = stringFormatters.toCamelCase(String(this.value));
        return this;
    }

    toKebabCase(): _ {
        this.value = stringFormatters.toKebabCase(String(this.value));
        return this;
    }

    // Number operations
    formatCurrency(currency?: string, locale?: string): _ {
        this.value = numberFormatters.formatCurrency(Number(this.value), currency, locale);
        return this;
    }

    formatWithCommas(): _ {
        this.value = numberFormatters.formatWithCommas(Number(this.value));
        return this;
    }

    formatPercentage(decimals?: number): _ {
        this.value = numberFormatters.formatPercentage(Number(this.value), decimals);
        return this;
    }

    // Date operations
    isDateWithinRange(endDate: Date): _ {
        this.value = dateFormatters.isDateWithinRange(this.value as Date, endDate);
        return this;
    }

    // Array operations
    map(fn: (item: any) => any): _ {
        if (!Array.isArray(this.value)) {
            throw new Error('Map can only be called on arrays');
        }
        this.value = this.value.map(fn);
        return this;
    }

    filter(fn: (item: any) => boolean): _ {
        if (!Array.isArray(this.value)) {
            throw new Error('Filter can only be called on arrays');
        }
        this.value = this.value.filter(fn);
        return this;
    }

    // Static methods
    static chain(value: any): _ {
        return new _(value);
    }

    // Export checkers as static methods
    static isNil = checkers.isNil;
    static isEmpty = checkers.isEmpty;
    static isNumber = checkers.isNumber;
    static isString = checkers.isString;
    static isArray = checkers.isArray;
    static isObject = checkers.isObject;
    static isUrl = checkers.isUrl;
    static isUuid = checkers.isUuid;

    // Export formatters as static methods
    static formatCurrency = numberFormatters.formatCurrency;
    static formatWithCommas = numberFormatters.formatWithCommas;
    static formatPercentage = numberFormatters.formatPercentage;
    static capitalize = stringFormatters.capitalize;
    static truncate = stringFormatters.truncate;
    static toCamelCase = stringFormatters.toCamelCase;
    static toKebabCase = stringFormatters.toKebabCase;
    static isDateWithinRange = dateFormatters.isDateWithinRange;
}

// Export original formatters
export const formatters = {
    ...numberFormatters,
    ...stringFormatters,
    ...dateFormatters
};
