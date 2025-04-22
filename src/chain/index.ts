import * as numberFormatters from '../formatters/number'
import * as stringFormatters from '../formatters/string'
import * as dateFormatters from '../formatters/date'
import * as arrayFormatters from '../formatters/array'
import * as objectFormatters from '../formatters/object'
import * as deepFormatters from '../formatters/deep'
import * as checkers from '../checkers'

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
    generateUUIDv4,
    generateStrongPassword,
} from '../random'

export class _ {
    private value: any
        
    constructor(value: any) {
        this.value = value
    }

    // Get the final value
    valueOf(): any {
        return this.value
    }

    // Method to get the current value
    public getValue(): any {
        return this.value
    }
    
    public removeDuplicates(): this {
        this.value = arrayFormatters.removeDuplicates(this.value)
        return this
    }

    public flattenArray(): this {
        this.value = arrayFormatters.flattenArray(this.value)
        return this
    }

    public filterArray(conditionFn: (value: any) => boolean): this {
        this.value = arrayFormatters.filterArray(this.value, conditionFn)
        return this
    }

    public transformArray(transformFn: (value: any) => any): this {
        this.value = arrayFormatters.transformArray(this.value, transformFn)
        return this
    }

    public implode(arr: any[], delimiter: string): this {
        this.value = arrayFormatters.implode(arr, delimiter)
        return this
    }

    public capitalizeEach(): this {
        this.value = arrayFormatters.capitalizeEach(this.value)
        return this
    }

    public removeEmptyKeysEntries(): this {
        this.value = objectFormatters.removeEmptyKeysEntries(this.value)
        return this
    }

    public deepClone(): this {
        this.value = deepFormatters.deepClone(this.value)
        return this
    }

    public deepSortAlphabetical(): this {
        this.value = deepFormatters.deepSortAlphabetical(this.value)
        return this
    }

    public deepCompareObjects(anotherValue: any): this {
        this.value = deepFormatters.deepCompareObjects(this.value, anotherValue)
        return this
    }

    public deepCompare(anotherValue: any): this {
        this.value = deepFormatters.deepCompare(this.value, anotherValue)
        return this
    }

    public deepMerge(anotherValue: any): this {
        this.value = deepFormatters.deepMerge(this.value, anotherValue)
        return this
    }

    public objectToQueryString(): this {
        this.value = objectFormatters.objectToQueryString(this.value)
        return this
    }

    public objectFilterByKeys(keys: any[]): this {
        this.value = objectFormatters.objectFilterByKeys(this.value, keys)
        return this
    }

    // String operations
    capitalize(): _ {
        this.value = stringFormatters.capitalize(String(this.value))
        return this
    }

    slugifyRevert(): _ {
        this.value = stringFormatters.slugifyRevert(String(this.value))
        return this
    }

    slugify(): _ {
        this.value = stringFormatters.slugify(String(this.value))
        return this
    }

    truncate(length: number, ellipsis?: string): _ {
        this.value = stringFormatters.truncate(String(this.value), length, ellipsis)
        return this
    }

    toCamelCase(): _ {
        this.value = stringFormatters.toCamelCase(String(this.value))
        return this
    }

    toKebabCase(): _ {
        this.value = stringFormatters.toKebabCase(String(this.value))
        return this
    }

    mask(str: string, maskChar: string = '*', visibleCount: number = 4, position: 'start' | 'end' = 'end', active: boolean = true): string {
        return stringFormatters.mask(str, maskChar, visibleCount, position, active)
    }

    explode(delimiter: string, limit?: number): _ {
        this.value = stringFormatters.explode(String(this.value), delimiter, limit)
        return this
    }

    toUnicodes(exclude: string | string[] = ""): _ {
        this.value = stringFormatters.toUnicodes(String(this.value), exclude)
        return this
    }

    toHTMLEntities(exclude: string | string[] = ""): _ {
        this.value = stringFormatters.toHtmlEntities(String(this.value), exclude)
        return this
    }

    swapCase(): _ {
        this.value = stringFormatters.swapCase(String(this.value))
        return this
    }

    // Date operations
    isDateWithinRange(endDate: Date): _ {
        this.value = dateFormatters.isDateWithinRange(this.value as Date, endDate)
        return this
    }

    // Array operations
    map(fn: (item: any) => any): _ {
        if (!Array.isArray(this.value)) {
            throw new Error('Map can only be called on arrays')
        }
        this.value = this.value.map(fn)
        return this
    }

    filter(fn: (item: any) => boolean): _ {
        if (!Array.isArray(this.value)) {
            throw new Error('Filter can only be called on arrays')
        }
        this.value = this.value.filter(fn)
        return this
    }

    capitalizeWords(): _ {
        this.value = stringFormatters.capitalizeWords(String(this.value))
        return this
    }

    trim(): _ {
        this.value = stringFormatters.trim(String(this.value))
        return this
    }

    pluralize(count?: number, customPlural?: string): _ {
        this.value = stringFormatters.pluralize(String(this.value), count, customPlural)
        return this
    }

    // Number operations
   formatCurrency(currency?: string, locale?: string): _ {
        this.value = numberFormatters.formatCurrency(Number(this.value), currency, locale)
        return this
    }

    formatWithCommas(): _ {
        this.value = numberFormatters.formatWithCommas(Number(this.value))
        return this
    }

    formatPercentage(decimals?: number): _ {
        this.value = numberFormatters.formatPercentage(Number(this.value), decimals)
        return this
    }
    
    // Static methods
    static chain(value: any): _ {
        return new _(value)
    }

    // Static checker methods
    static isNil(value: any): value is null | undefined {
        return checkers.isNil(value)
    }

    static isEmpty(value: any): boolean {
        return checkers.isEmpty(value)
    }

    static isNumber(value: any): value is number {
        return checkers.isNumber(value)
    }

    static isString(value: any): value is string {
        return checkers.isString(value)
    }

    static isArray(value: any): value is any[] {
        return checkers.isArray(value)
    }

    static isObject(value: any): value is object {
        return checkers.isObject(value)
    }

    static isUrl(value: string): boolean {
        return checkers.isUrl(value)
    }

    static isUuid(value: string): boolean {
        return checkers.isUuid(value)
    }

    static isAlphanumeric(value: string): boolean {
        return checkers.isAlphanumeric(value)
    }

    static isEmail(value: string): boolean {
        return checkers.isEmail(value)
    }

    static isStrongPassword(value: string): boolean {
        return checkers.isStrongPassword(value)
    }

    static isValidTime(value: string): boolean {
        return checkers.isValidTime(value)
    }

    static isFunction(value: any): value is (...args: any[]) => any {
        return checkers.isFunction(value)
    }

    static isDateWithinRange(startDate: Date, endDate: Date): boolean {
        return dateFormatters.isDateWithinRange(startDate, endDate)
    }

    static isBoolean(str: string): boolean {
        return checkers.isBoolean(str)
    }

    static isDataView(str: string): boolean {
        return checkers.isDataView(str)
    }

    static isNaN(str: string): boolean {
        return checkers.isNaN(str)
    }

    static isUndefined(str: string): boolean {
        return checkers.isUndefined(str)
    }

    static isFinite(str: string): boolean {
        return checkers.isFinite(str)
    }

    static isNull(str: string): boolean {
        return checkers.isNull(str)
    }

    // Number formatters
    static formatCurrency(value: number, currency?: string, locale?: string): string {
        return numberFormatters.formatCurrency(value, currency, locale)
    }

    static formatWithCommas(value: number): string {
        return numberFormatters.formatWithCommas(value)
    }

    static formatPercentage(value: number, decimals?: number): string {
        return numberFormatters.formatPercentage(value, decimals)
    }

    static formatDecimals(value: number, decimals: number): string {
        return numberFormatters.formatDecimals(value, decimals)
    }

    static formatOrdinal(value: number): string {
        return numberFormatters.formatOrdinal(value)
    }

    static calculateDiscountPrice(price: number, discount: number): number {
        return numberFormatters.calculateDiscountPrice(price, discount)
    }

    // String formatters
    static capitalize(str: string): string {
        return stringFormatters.capitalize(str)
    }

    static truncate(str: string, length: number, ellipsis?: string): string {
        return stringFormatters.truncate(str, length, ellipsis)
    }

    static toCamelCase(str: string): string {
        return stringFormatters.toCamelCase(str)
    }

    static toKebabCase(str: string): string {
        return stringFormatters.toKebabCase(str)
    }

    static pad(str: string, length: number, char: string = ' ', position: 'start' | 'end' | 'both' = 'end'): string {
        return stringFormatters.pad(str, length, char, position)
    }

    static mask(str: string, maskChar: string = '*', visibleCount: number = 4, position: 'start' | 'end' = 'end', active: boolean = true): string {
        return stringFormatters.mask(str, maskChar, visibleCount, position, active)
    }

    static toLowerCase(str: string, substr: string): string {
        return stringFormatters.toLowerCase(str, substr)
    }

    static toUpperCase(str: string, substr: string): string {
        return stringFormatters.toUpperCase(str, substr)
    }

    static chopEnd(str: string, count: number = 1): string {
        return stringFormatters.chopEnd(str, count)
    }   

    static chopStart(str: string, count: number = 1): string {
        return stringFormatters.chopStart(str, count)
    }

    static toHtmlEntities(str: string, exclude: string | string[] = ""): string {
        return stringFormatters.toHtmlEntities(str, exclude)
    }

    static toUnicodes(str: string, exclude: string | string[] = ""): string {    
        return stringFormatters.toUnicodes(str, exclude)
    }

    static swapCase(str: string): string {
        return stringFormatters.swapCase(str)
    }
 
    // Random generation functions
    static generateRandomInteger(min: number, max: number): number {
        return generateRandomInteger(min, max)
    }

    static generateRandomIntegerArray(length: number, min: number, max: number): number[] {
        return generateRandomIntegerArray(length, min, max)
    }

    static generateRandomIntegerExcluding(min: number, max: number, exclude: number[]): number {
        return generateRandomIntegerExcluding(min, max, exclude)
    }

    static generateRandomString(length: number, options?: GenerateRandomStringOptions): string {
        return generateRandomString(length, options)
    }

    static generateRandomPassword(length: number, options?: Omit<GenerateRandomStringOptions, 'lowercase' | 'uppercase' | 'numbers' | 'special'>): string {
        return generateRandomPassword(length, options)
    }

    static generateRandomHexColor(includeHash?: boolean): string {
        return generateRandomHexColor(includeHash)
    }

    static generateRandom(options: GenerateRandomOptions): number | string | boolean | string[] {
        return generateRandom(options)
    }

    static generateRandomHex(includeHash: boolean = true): string {
        return generateRandomHexColor(includeHash)
    }

    static generateRandomColor(format?: 'hex' | 'rgb' | 'hsl'): string {
        return generateRandomColor(format)
    }

    static generateColorPalette(numColors: number, format?: 'hex' | 'rgb' | 'hsl'): string[] {
        return generateColorPalette(numColors, format)
    }

    static generateRandomRGB(includeAlpha: boolean = false): string | number[] {
        return generateRandomRGB(includeAlpha)
    }

    static generateRandomHSL(includeAlpha: boolean = false): string | number[] {
        return generateRandomHSL(includeAlpha)
    }

    static generateUUID(): string {
        return generateUUID()
    }

    static generateUUIDv4(): string {
        return generateUUIDv4()
    }

    static humanReadableNumber(value: number, options?: { decimals?: number, compact?: boolean }): _ {
        const instance = new _(value)
        instance.value = numberFormatters.humanReadableNumber(value, options)
        return instance
    }

    static generateStrongPassword = (length: number) : string => {
        return generateStrongPassword(length)
    }
}

export const formatters = {
    ...numberFormatters,
    ...stringFormatters,
    ...dateFormatters,
    ...arrayFormatters,
    ...objectFormatters,
    ...deepFormatters
}

export const checks = {
    ...checkers
}

export type {
    GenerateRandomType,
    GenerateRandomOptions,
    GenerateRandomStringOptions
}
