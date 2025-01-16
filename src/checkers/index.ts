export const isNil = (value: any): value is null | undefined => {
    return value === null || value === undefined;
}

export const isEmpty = (value: any): boolean => {
    if (isNil(value)) return true
    if (typeof value === 'string') return value.trim().length === 0
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
}

export const isNumber = (value: any): value is number => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

export const isString = (value: any): value is string => {
    return typeof value === 'string'
}

export const isArray = <T>(value: any): value is T[] => {
    return Array.isArray(value)
}

export const isObject = (value: any): value is object => {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const isUrl = (str: string): boolean => {
    try {
        const url = new URL(str);
        // Check for valid protocol (must be http, https, or ftp)
        if (!url.protocol || !['http:', 'https:', 'ftp:'].includes(url.protocol)) {
            return false;
        }
        // Check for valid hostname
        if (!url.hostname || url.hostname.length === 0) {
            return false;
        }
        if (url.pathname.includes('//')) {
            return false;
        }
        if (!str.match(/^(https?|ftp):\/\//i)) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

export const isUuid = (str: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
};

export const contains = (str: string, substring: string, caseSensitive: boolean = true): boolean => {
    if (!str || !substring) return false;
    if (!caseSensitive) {
        return str.toLowerCase().includes(substring.toLowerCase())
    }
    return str.includes(substring)
}

export const exactly = (str: string, match: string, caseSensitive?: boolean): boolean => {
    if (str === undefined || match === undefined) return false
    if (caseSensitive === undefined) caseSensitive = true
    if (!caseSensitive) {
        return str.toLowerCase() === match.toLowerCase()
    }
    return str === match
}

export const isBoolean = (value: any): value is boolean => {
    return typeof value === 'boolean'
}

export const isFunction = (value: any): value is Function => {
    return typeof value === 'function'
}


export const isDataView = (value: any): value is DataView => {
    return value instanceof DataView
}

export const isNaN = (value: any): boolean => {
    return Number.isNaN(value)
}

export const isNull = (value: any): value is null => {
    return value === null
}

export const isUndefined = (value: any): value is undefined => {
    return value === undefined
}

export const isFinite = (value: any): boolean => {
    return Number.isFinite(value)
}

export const isAlphanumeric = (str: string): boolean => {
    if (typeof str !== 'string') return false
    return /^[a-zA-Z0-9]+$/.test(str)
}

export const isEmail = (str: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/;
    return emailRegex.test(str)
}

export const isStrongPassword = (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return strongPasswordRegex.test(password)
}

export const isValidTime = (timeString: string): boolean => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;
    const amPmRegex = /^(0[0-9]|1[0-2]):([0-5][0-9])(:([0-5][0-9]))?\s?(AM|PM)$/i;
    return timeRegex.test(timeString) || amPmRegex.test(timeString);
};

