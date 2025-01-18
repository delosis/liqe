import { type LiqeQuery } from './types';
type RegExpCache = Record<string, RegExp>;
export declare const createStringTest: (regexCache: RegExpCache, ast: LiqeQuery) => (subject: string) => false | string;
export {};
