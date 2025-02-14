import { convertWildcardToRegex } from "./convertWildcardToRegex";
import { escapeRegexString } from "./escapeRegexString";
import { parseRegex } from "./parseRegex";
import { type LiqeQuery, type LiqeOptions } from "./types";

type RegExpCache = Record<string, RegExp>;

const createRegexTest = (regexCache: RegExpCache, regex: string) => {
  let rule: RegExp;

  if (regexCache[regex]) {
    rule = regexCache[regex];
  } else {
    rule = parseRegex(regex);
    regexCache[regex] = rule;
  }

  return (subject: string): false | string => {
    return subject.match(rule)?.[0] ?? false;
  };
};

const normalizeString = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
    return createRegexTest(regexCache, expression.value);
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
      const regex = String(convertWildcardToRegex(normalizedValue)) + flags;
      return (subject: string): false | string => {
        const normalizedSubject = normalizeString(subject);
        return normalizedSubject.match(parseRegex(regex))?.[0] ?? false;
      };
    } else {
      const regex = "/(" + escapeRegexString(normalizedValue) + ")/" + flags;
      return (subject: string): false | string => {
        const normalizedSubject = normalizeString(subject);
        return normalizedSubject.match(parseRegex(regex))?.[0] ?? false;
      };
    }
  }

  // Default accent-sensitive behavior
  if (
    (value.includes("*") || value.includes("?")) &&
    expression.quoted === false
  ) {
    return createRegexTest(
      regexCache,
      String(convertWildcardToRegex(value)) + flags
    );
  } else {
    return createRegexTest(
      regexCache,
      "/(" + escapeRegexString(value) + ")/" + flags
    );
  }
};
