"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStringTest = void 0;
const convertWildcardToRegex_1 = require("./convertWildcardToRegex");
const escapeRegexString_1 = require("./escapeRegexString");
const getMatchedText = (subject, regex) => {
    regex.lastIndex = 0; // Reset lastIndex since we're using exec
    const match = regex.exec(subject);
    return match ? match[0] : false;
};
const createRegexTest = (regexCache, pattern, flags) => {
    const regexStr = pattern + flags;
    let rule;
    if (regexCache[regexStr]) {
        rule = regexCache[regexStr];
    }
    else {
        try {
            rule = new RegExp(pattern, flags);
            regexCache[regexStr] = rule;
        }
        catch (e) {
            console.error("Failed to create regex:", e);
            return () => false;
        }
    }
    return (subject) => {
        if (typeof subject !== "string")
            return false;
        try {
            return getMatchedText(subject, rule);
        }
        catch (e) {
            console.error("Failed to execute regex:", e);
            return false;
        }
    };
};
const normalizeString = (str) => {
    try {
        const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalized;
    }
    catch (e) {
        console.error("Failed to normalize string:", e);
        return str;
    }
};
const convertToRegexPattern = (value, quoted) => {
    if (value.includes("*") || value.includes("?")) {
        if (!quoted) {
            const wildcardRegex = (0, convertWildcardToRegex_1.convertWildcardToRegex)(value);
            return wildcardRegex.source;
        }
    }
    return "(" + (0, escapeRegexString_1.escapeRegexString)(value) + ")";
};
const createStringTest = (regexCache, ast, options = {}) => {
    if (ast.type !== "Tag") {
        throw new Error("Expected a tag expression.");
    }
    const { expression } = ast;
    if (expression.type === "RangeExpression") {
        throw new Error("Unexpected range expression.");
    }
    if (expression.type === "RegexExpression") {
        return createRegexTest(regexCache, expression.value, options.caseSensitive ? "u" : "ui");
    }
    if (expression.type !== "LiteralExpression") {
        throw new Error("Expected a literal expression.");
    }
    const value = String(expression.value);
    const flags = options.caseSensitive ? "u" : "ui";
    const pattern = convertToRegexPattern(value, expression.quoted);
    // If accent-insensitive, normalize both the pattern and subject for comparison
    if (options.accentSensitive === false) {
        // First normalize the value before converting to pattern
        const normalizedValue = normalizeString(value);
        const normalizedPattern = convertToRegexPattern(normalizedValue, expression.quoted);
        return (subject) => {
            if (typeof subject !== "string")
                return false;
            const normalizedSubject = normalizeString(subject);
            return createRegexTest(regexCache, normalizedPattern, flags)(normalizedSubject);
        };
    }
    // Default accent-sensitive behavior
    return createRegexTest(regexCache, pattern, flags);
};
exports.createStringTest = createStringTest;
