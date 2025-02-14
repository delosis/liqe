import { convertWildcardToRegex } from "./convertWildcardToRegex";
import { escapeRegexString } from "./escapeRegexString";
import { type LiqeQuery, type LiqeOptions, type InternalTest } from "./types";

type RegExpCache = Record<string, RegExp>;

const getMatchedText = (subject: string, regex: RegExp): boolean | string => {
  regex.lastIndex = 0; // Reset lastIndex since we're using exec
  const match = regex.exec(subject);
  return match ? match[0] : false;
};

const createRegexTest = (
  regexCache: RegExpCache,
  pattern: string,
  flags: string
): InternalTest => {
  const regexStr = pattern + flags;
  let rule: RegExp;

  if (regexCache[regexStr]) {
    rule = regexCache[regexStr];
  } else {
    try {
      rule = new RegExp(pattern, flags);
      regexCache[regexStr] = rule;
    } catch (e) {
      console.error("Failed to create regex:", e);
      return () => false;
    }
  }

  console.log(
    "Creating regex test with pattern:",
    pattern,
    "flags:",
    flags,
    "rule:",
    rule
  );
  return (subject: unknown): boolean | string => {
    if (typeof subject !== "string") return false;
    try {
      return getMatchedText(subject, rule);
    } catch (e) {
      console.error("Failed to execute regex:", e);
      return false;
    }
  };
};

const normalizeString = (str: string): string => {
  try {
    const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    console.log("Normalizing string:", str, "result:", normalized);
    return normalized;
  } catch (e) {
    console.error("Failed to normalize string:", e);
    return str;
  }
};

const convertToRegexPattern = (value: string, quoted: boolean): string => {
  if (value.includes("*") || value.includes("?")) {
    if (!quoted) {
      const wildcardRegex = convertWildcardToRegex(value);
      return wildcardRegex.source;
    }
  }
  return "(" + escapeRegexString(value) + ")";
};

export const createStringTest = (
  regexCache: RegExpCache,
  ast: LiqeQuery,
  options: LiqeOptions = {}
): InternalTest => {
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
  console.log(
    "Creating string test with options:",
    options,
    "value:",
    value,
    "flags:",
    flags
  );

  const pattern = convertToRegexPattern(value, expression.quoted);

  // If accent-insensitive, normalize both the pattern and subject for comparison
  if (options.accentSensitive === false) {
    const normalizedPattern = normalizeString(pattern);
    return (subject: unknown): boolean | string => {
      if (typeof subject !== "string") return false;
      const normalizedSubject = normalizeString(subject);
      return createRegexTest(
        regexCache,
        normalizedPattern,
        flags
      )(normalizedSubject);
    };
  }

  // Default accent-sensitive behavior
  return createRegexTest(regexCache, pattern, flags);
};
