import { type LiqeQuery, type LiqeOptions, type InternalTest } from "./types";
type RegExpCache = Record<string, RegExp>;
export declare const createStringTest: (regexCache: RegExpCache, ast: LiqeQuery, options?: LiqeOptions) => InternalTest;
export {};
