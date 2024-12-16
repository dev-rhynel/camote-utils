import { isValidTime } from './index';

describe('isValidTime', () => {
    test('valid times', () => {
        expect(isValidTime('14:30')).toBe(true);
        expect(isValidTime('02:30 PM')).toBe(true);
        expect(isValidTime('00:00')).toBe(true);
        expect(isValidTime('12:59:59')).toBe(true);
    });

    test('invalid times', () => {
        expect(isValidTime('25:00')).toBe(false);
        expect(isValidTime('14:60')).toBe(false);
        expect(isValidTime('02:30:61')).toBe(false);
        expect(isValidTime('invalid time')).toBe(false);
        expect(isValidTime('')).toBe(false);
    });
});
