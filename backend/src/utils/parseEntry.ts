import parseString, { isString } from "./parseString";
import { Entry, UnknownEntry } from '../types';

const isNumber = (n: unknown): n is number => {
    return typeof n === 'number' || n instanceof Number;
};

const parseNumber = (n: unknown): number => {
    n = Number(n);

    if (!isNumber(n)) {
        throw new Error(`Not a number! ${n}`);
    }

    return n;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date' + date);
    }
    return date;
};

const parseEntry = (body: UnknownEntry): Entry => {
    if (!body.user || !body.date || !body.duration || !body.distance || !body.difficulty) {
        throw new Error('Field is missing!');
    }

    const newEntry: Entry = {
        user: parseString(body.user),
        date: parseDate(body.date),
        duration: parseNumber(body.duration),
        distance: parseNumber(body.distance),
        difficulty: parseNumber(body.difficulty)
    };
    return newEntry;
};

export default parseEntry;