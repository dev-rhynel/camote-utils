import * as numberFormatters from '../formatters/number';
import * as stringFormatters from '../formatters/string';
import * as dateFormatters from '../formatters/date';
import * as checkers from '../checkers';
import {
    generateRandomInteger,
    generateRandomIntegerArray,
    generateRandomIntegerExcluding,
    generateRandomString,
    generateRandomPassword,
    generateRandom,
    GenerateRandomType,
    GenerateRandomOptions,
    GenerateRandomStringOptions,
    generateRandomHexColor,
    generateRandomRGB,
    generateRandomHSL,
    generateColorPalette,
    generateRandomColor,
    generateUUID,
    generateUUIDv4
} from '../random';

export class _ {
    private value: any;

    constructor(value: any) {
        this.value = value;
    }

    // Get the final value
    valueOf(): any {
        return this.value;
    }

    // Random generation functions
    static generateRandomInteger(min: number, max: number): number {
        return generateRandomInteger(min, max);
    }

    static generateRandomIntegerArray(length: number, min: number, max: number): number[] {
        return generateRandomIntegerArray(length, min, max);
    }

    static generateRandomIntegerExcluding(min: number, max: number, exclude: number[]): number {
        return generateRandomIntegerExcluding(min, max, exclude);
    }

    static generateRandomString(length: number, options?: GenerateRandomStringOptions): string {
        return generateRandomString(length, options);
    }

    static generateRandomPassword(length: number, options?: Omit<GenerateRandomStringOptions, 'lowercase' | 'uppercase' | 'numbers' | 'special'>): string {
        return generateRandomPassword(length, options);
    }

    static generateRandomHexColor(includeHash?: boolean): string {
        return generateRandomHexColor(includeHash);
    }

    static generateRandom(options: GenerateRandomOptions): number | string | boolean | string[] {
        return generateRandom(options);
    }

    static generateRandomHex(includeHash: boolean = true): string {
        return generateRandomHexColor(includeHash);
    }

    static generateRandomColor(format?: 'hex' | 'rgb' | 'hsl'): string {
        return generateRandomColor(format);
    }

    static generateColorPalette(numColors: number, format?: 'hex' | 'rgb' | 'hsl'): string[] {
        return generateColorPalette(numColors, format);
    }

    static generateRandomRGB(includeAlpha: boolean = false): string | number[] {
        return generateRandomRGB(includeAlpha);
    }

    static generateRandomHSL(includeAlpha: boolean = false): string | number[] {
        return generateRandomHSL(includeAlpha);
    }

    static generateUUID(): string {
        return generateUUID();
    }

    static generateUUIDv4(): string {
        return generateUUIDv4();
    }

    static humanReadableNumber(value: number, options?: { decimals?: number; compact?: boolean }): _ {
        const instance = new _(value);
        instance.value = numberFormatters.humanReadableNumber(value, options);
        return instance;
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

    // Static checker methods
    static isNil(value: any): value is null | undefined {
        return checkers.isNil(value);
    }

    static isEmpty(value: any): boolean {
        return checkers.isEmpty(value);
    }

    static isNumber(value: any): value is number {
        return checkers.isNumber(value);
    }

    static isString(value: any): value is string {
        return checkers.isString(value);
    }

    static isArray(value: any): value is any[] {
        return checkers.isArray(value);
    }

    static isObject(value: any): value is object {
        return checkers.isObject(value);
    }

    static isUrl(value: string): boolean {
        return checkers.isUrl(value);
    }

    static isUuid(value: string): boolean {
        return checkers.isUuid(value);
    }

    static isAlphanumeric(str: string): boolean {
        return checkers.isAlphanumeric(str);
    }

    // Instance checker methods
    isAlphanumeric(): boolean {
        return checkers.isAlphanumeric(String(this.value));
    }

    // Static methods
    static chain(value: any): _ {
        return new _(value);
    }

    // Formatter methods
    static formatCurrency(value: number, currency?: string, locale?: string): string {
        return numberFormatters.formatCurrency(value, currency, locale);
    }

    static formatWithCommas(value: number): string {
        return numberFormatters.formatWithCommas(value);
    }

    static formatPercentage(value: number, decimals?: number): string {
        return numberFormatters.formatPercentage(value, decimals);
    }

    static capitalize(str: string): string {
        return stringFormatters.capitalize(str);
    }

    static truncate(str: string, length: number, ellipsis?: string): string {
        return stringFormatters.truncate(str, length, ellipsis);
    }

    static toCamelCase(str: string): string {
        return stringFormatters.toCamelCase(str);
    }

    static toKebabCase(str: string): string {
        return stringFormatters.toKebabCase(str);
    }

    static isDateWithinRange(startDate: Date, endDate: Date): boolean {
        return dateFormatters.isDateWithinRange(startDate, endDate);
    }
}

// Export original formatters and checkers
export const formatters = {
    ...numberFormatters,
    ...stringFormatters,
    ...dateFormatters
};

export const checks = {
    ...checkers
};

// Export types
export type {
    GenerateRandomType,
    GenerateRandomOptions,
    GenerateRandomStringOptions
};
