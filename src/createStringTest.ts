import { convertWildcardToRegex } from "./convertWildcardToRegex";
import { escapeRegexString } from "./escapeRegexString";
import { parseRegex } from "./parseRegex";
import { type LiqeQuery, type LiqeOptions } from "./types";

type RegExpCache = Record<string, RegExp>;

const createRegexTest = (
  regexCache: RegExpCache,
  pattern: string,
  flags: string
) => {
  const regexStr = "/" + pattern + "/" + flags;
  let rule: RegExp;

  if (regexCache[regexStr]) {
    rule = regexCache[regexStr];
  } else {
    rule = parseRegex(regexStr);
    regexCache[regexStr] = rule;
  }

  return (subject: string): false | string => {
    const match = rule.exec(subject);
    return match?.[0] ?? false;
  };
};

const normalizeString = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const createNormalizedTest = (pattern: string, flags: string) => {
  const regexStr = "/" + pattern + "/" + flags;
  const rule = parseRegex(regexStr);

  return (subject: string): false | string => {
    const normalizedSubject = normalizeString(subject);
    const match = rule.exec(normalizedSubject);
    return match?.[0] ?? false;
  };
};

export const createStringTest = (
  regexCache: RegExpCache,
  ast: LiqeQuery,
  options: LiqeOptions = {}
) => {
  if (ast.type !== "Tag") {
    throw new Error("Expected a tag expression.");
  }

  const { expression } = ast;

  if (expression.type === "RangeExpression") {
    throw new Error("Unexpected range expression.");
  }

  if (expression.type === "RegexExpression") {
    return createRegexTest(
      regexCache,
      expression.value,
      options.caseSensitive ? "u" : "ui"
    );
  }

  if (expression.type !== "LiteralExpression") {
    throw new Error("Expected a literal expression.");
  }

  const value = String(expression.value);
  const flags = options.caseSensitive ? "u" : "ui";

  // If accent-insensitive, normalize the search value and wrap the regex to normalize the subject
  if (options.accentSensitive === false) {
    const normalizedValue = normalizeString(value);
    if (
      (value.includes("*") || value.includes("?")) &&
      expression.quoted === false
    ) {
      const pattern = convertWildcardToRegex(normalizedValue);
      return createNormalizedTest(pattern, flags);
    } else {
      const pattern = "(" + escapeRegexString(normalizedValue) + ")";
      return createNormalizedTest(pattern, flags);
    }
  }

  // Default accent-sensitive behavior
  if (
    (value.includes("*") || value.includes("?")) &&
    expression.quoted === false
  ) {
    const pattern = convertWildcardToRegex(value);
    return createRegexTest(regexCache, pattern, flags);
  } else {
    const pattern = "(" + escapeRegexString(value) + ")";
    return createRegexTest(regexCache, pattern, flags);
  }
};
