import { type Highlight, type LiqeQuery } from './types';
export declare const highlight: <T extends Object>(ast: LiqeQuery, data: T) => Highlight[];
