import { internalFilter } from "./internalFilter";
import { type LiqeQuery, type LiqeOptions } from "./types";

export const filter = <T extends Object>(
  ast: LiqeQuery,
  data: readonly T[],
  options: LiqeOptions = {}
): readonly T[] => {
  return internalFilter(ast, data, true, [], [], options);
};
