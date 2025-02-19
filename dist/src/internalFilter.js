"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalFilter = void 0;
const createStringTest_1 = require("./createStringTest");
const testComparisonRange_1 = require("./testComparisonRange");
const testRange_1 = require("./testRange");
const createValueTest = (ast, options) => {
    if (ast.type !== "Tag") {
        throw new Error("Expected a tag expression.");
    }
    const { expression } = ast;
    if (expression.type === "RangeExpression") {
        return (value) => {
            return (0, testRange_1.testRange)(value, expression.range);
        };
    }
    if (expression.type === "EmptyExpression") {
        return () => {
            return false;
        };
    }
    const expressionValue = expression.value;
    if (ast.operator && ast.operator.operator !== ":") {
        const operator = ast.operator;
        if (typeof expressionValue !== "number") {
            throw new TypeError("Expected a number.");
        }
        return (value) => {
            if (typeof value !== "number") {
                return false;
            }
            return (0, testComparisonRange_1.testComparisonRange)(expressionValue, value, operator.operator);
        };
    }
    else if (typeof expressionValue === "boolean") {
        return (value) => {
            return value === expressionValue;
        };
    }
    else if (expressionValue === null) {
        return (value) => {
            return value === null;
        };
    }
    else {
        const testString = (0, createStringTest_1.createStringTest)({}, ast, options);
        return (value) => {
            return testString(String(value));
        };
    }
};
const testValue = (ast, value, resultFast, path, highlights) => {
    // No early return for primitives - let the test function handle type coercion
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (testValue(ast, value[i], resultFast, [...path, String(i)], highlights)) {
                // Early return for fast mode
                if (resultFast) {
                    return true;
                }
                // Only continue if we need all matches for highlighting
                if (!highlights) {
                    return true;
                }
            }
        }
        return false;
    }
    if (typeof value === "object" && value !== null) {
        for (const key in value) {
            if (testValue(ast, value[key], resultFast, [...path, key], highlights)) {
                // Early return for fast mode
                if (resultFast) {
                    return true;
                }
                // Only continue if we need all matches for highlighting
                if (!highlights) {
                    return true;
                }
            }
        }
        return false;
    }
    if (ast.type !== "Tag") {
        throw new Error("Expected a tag expression.");
    }
    if (!ast.test) {
        throw new Error("Expected test to be defined.");
    }
    const result = ast.test(value);
    if (result && highlights) {
        highlights.push({
            ...(typeof result === "string" && { keyword: result }),
            path: path.join("."),
        });
    }
    return Boolean(result);
};
const testField = (row, ast, resultFast, path, highlights, options) => {
    if (ast.type !== "Tag") {
        throw new Error("Expected a tag expression.");
    }
    if (!ast.test) {
        ast.test = createValueTest(ast, options);
    }
    if (ast.field.type === "ImplicitField") {
        // For implicit fields, test each field until we find a match
        for (const fieldName in row) {
            const fieldAst = {
                ...ast,
                field: {
                    location: { end: -1, start: -1 },
                    name: fieldName,
                    quoted: true,
                    quotes: "double",
                    type: "Field",
                },
            };
            if (testValue(fieldAst, row[fieldName], resultFast, [...path, fieldName], highlights)) {
                // Early return if we don't need highlights
                if (resultFast || !highlights) {
                    return true;
                }
            }
        }
        return false;
    }
    if (ast.field.name in row) {
        return testValue(ast, row[ast.field.name], resultFast, path, highlights);
    }
    else if (ast.getValue && ast.field.path) {
        return testValue(ast, ast.getValue(row), resultFast, ast.field.path, highlights);
    }
    else if (ast.field.path) {
        let value = row;
        for (const key of ast.field.path) {
            if (typeof value !== "object" || value === null) {
                return false;
            }
            else if (key in value) {
                value = value[key];
            }
            else {
                return false;
            }
        }
        return testValue(ast, value, resultFast, ast.field.path, highlights);
    }
    else {
        return false;
    }
};
const shouldProcessRecord = (ast, row, options) => {
    var _a;
    // Only optimize string searches with case/accent sensitivity
    if (ast.type === "Tag" &&
        ast.field.type !== "ImplicitField" &&
        (options.caseSensitive || options.accentSensitive) &&
        ast.expression.type === "LiteralExpression" &&
        ast.expression.value !== null &&
        typeof ast.expression.value === "string") {
        const fieldValue = String((_a = row[ast.field.name]) !== null && _a !== void 0 ? _a : "").toLowerCase();
        const searchValue = ast.expression.value.toLowerCase();
        // Quick check - if the field doesn't contain any character from the search term
        // in any case, it can't possibly match
        const searchChars = new Set(searchValue.split(""));
        const fieldChars = new Set(fieldValue.split(""));
        let hasCommonChar = false;
        for (const char of searchChars) {
            if (fieldChars.has(char)) {
                hasCommonChar = true;
                break;
            }
        }
        if (!hasCommonChar) {
            return false;
        }
    }
    return true;
};
const internalFilter = (ast, rows, resultFast = true, path = [], highlights = [], options = {}) => {
    if (ast.type === "Tag") {
        return rows.filter((row) => {
            // Quick check if we should process this record
            if (!shouldProcessRecord(ast, row, options)) {
                return false;
            }
            return testField(row, ast, resultFast, ast.field.type === "ImplicitField" ? path : [...path, ast.field.name], highlights, options);
        });
    }
    if (ast.type === "UnaryOperator") {
        const removeRows = (0, exports.internalFilter)(ast.operand, rows, resultFast, path, [], options);
        return rows.filter((row) => {
            return !removeRows.includes(row);
        });
    }
    if (ast.type === "ParenthesizedExpression") {
        return (0, exports.internalFilter)(ast.expression, rows, resultFast, path, highlights, options);
    }
    if (!ast.left) {
        throw new Error("Expected left to be defined.");
    }
    const leftRows = (0, exports.internalFilter)(ast.left, rows, resultFast, path, highlights, options);
    if (!ast.right) {
        throw new Error("Expected right to be defined.");
    }
    if (ast.type !== "LogicalExpression") {
        throw new Error("Expected a tag expression.");
    }
    if (ast.operator.operator === "OR") {
        const rightRows = (0, exports.internalFilter)(ast.right, rows, resultFast, path, highlights, options);
        return Array.from(new Set([...leftRows, ...rightRows]));
    }
    else if (ast.operator.operator === "AND") {
        return (0, exports.internalFilter)(ast.right, leftRows, resultFast, path, highlights, options);
    }
    throw new Error("Unexpected state.");
};
exports.internalFilter = internalFilter;
