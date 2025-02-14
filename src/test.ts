import { filter } from "./filter";
import { type LiqeQuery, type LiqeOptions } from "./types";

export const test = <T extends Object>(
  ast: LiqeQuery,
  subject: T,
  options?: LiqeOptions
) => {
  return filter(ast, [subject], options).length === 1;
};
