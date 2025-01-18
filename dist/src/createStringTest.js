"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStringTest = void 0;
const convertWildcardToRegex_1 = require("./convertWildcardToRegex");
const escapeRegexString_1 = require("./escapeRegexString");
const parseRegex_1 = require("./parseRegex");
const createRegexTest = (regexCache, regex) => {
    let rule;
    if (regexCache[regex]) {
        rule = regexCache[regex];
    }
    else {
        rule = (0, parseRegex_1.parseRegex)(regex);
        regexCache[regex] = rule;
    }
    return (subject) => {
        var _a, _b;
        return (_b = (_a = subject.match(rule)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : false;
    };
};
const createStringTest = (regexCache, ast) => {
    if (ast.type !== 'Tag') {
        throw new Error('Expected a tag expression.');
    }
    const { expression } = ast;
    if (expression.type === 'RangeExpression') {
        throw new Error('Unexpected range expression.');
    }
    if (expression.type === 'RegexExpression') {
        return createRegexTest(regexCache, expression.value);
    }
    if (expression.type !== 'LiteralExpression') {
        throw new Error('Expected a literal expression.');
    }
    const value = String(expression.value);
    if ((value.includes('*') || value.includes('?')) &&
        expression.quoted === false) {
        return createRegexTest(regexCache, String((0, convertWildcardToRegex_1.convertWildcardToRegex)(value)) + 'ui');
    }
    else {
        return createRegexTest(regexCache, '/(' + (0, escapeRegexString_1.escapeRegexString)(value) + ')/' + 'ui');
    }
};
exports.createStringTest = createStringTest;
