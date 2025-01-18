import { type InternalHighlight, type LiqeQuery } from './types';
export declare const internalFilter: <T extends Object>(ast: LiqeQuery, rows: readonly T[], resultFast?: boolean, path?: readonly string[], highlights?: InternalHighlight[]) => readonly T[];
