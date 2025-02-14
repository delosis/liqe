import { type InternalHighlight, type LiqeQuery, type LiqeOptions } from "./types";
export declare const internalFilter: <T extends Object>(ast: LiqeQuery, rows: readonly T[], resultFast?: boolean, path?: readonly string[], highlights?: InternalHighlight[], options?: LiqeOptions) => readonly T[];
