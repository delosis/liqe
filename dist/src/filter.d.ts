import { type LiqeQuery } from './types';
export declare const filter: <T extends Object>(ast: LiqeQuery, data: readonly T[]) => readonly T[];
