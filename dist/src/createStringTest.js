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
    console.log("Creating regex test with pattern:", pattern, "flags:", flags, "rule:", rule);
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
        console.log("Normalizing string:", str, "result:", normalized);
        return normalized;
    }
    catch (e) {
        console.error("Failed to normalize string:", e);
        return str;
    }
};
const createNormalizedTest = (pattern, flags) => {
    let rule;
    try {
        rule = new RegExp(pattern, flags);
    }
    catch (e) {
        console.error("Failed to create normalized regex:", e);
        return () => false;
    }
    console.log("Creating normalized test with pattern:", pattern, "flags:", flags, "rule:", rule);
    return (subject) => {
        if (typeof subject !== "string")
            return false;
        try {
            const normalizedSubject = normalizeString(subject);
            return getMatchedText(normalizedSubject, rule);
        }
        catch (e) {
            console.error("Failed to execute normalized regex:", e);
            return false;
        }
    };
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
    console.log("Creating string test with options:", options, "value:", value, "flags:", flags);
    // If accent-insensitive, normalize the search value and wrap the regex to normalize the subject
    if (options.accentSensitive === false) {
        const normalizedValue = normalizeString(value);
        const pattern = convertToRegexPattern(normalizedValue, expression.quoted);
        return createNormalizedTest(pattern, flags);
    }
    // Default accent-sensitive behavior
    const pattern = convertToRegexPattern(value, expression.quoted);
    return createRegexTest(regexCache, pattern, flags);
};
exports.createStringTest = createStringTest;
