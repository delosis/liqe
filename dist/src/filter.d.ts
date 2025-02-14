import { type LiqeQuery, type LiqeOptions } from "./types";
export declare const filter: <T extends Object>(ast: LiqeQuery, data: readonly T[], options?: LiqeOptions) => readonly T[];
