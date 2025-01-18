"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const errors_1 = require("./errors");
const grammar_1 = __importDefault(require("./grammar"));
const hydrateAst_1 = require("./hydrateAst");
const nearley_1 = __importDefault(require("nearley"));
const rules = nearley_1.default.Grammar.fromCompiled(grammar_1.default);
const MESSAGE_RULE = /Syntax error at line (?<line>\d+) col (?<column>\d+)/;
const parse = (query) => {
    if (query.trim() === '') {
        return {
            location: {
                end: 0,
                start: 0,
            },
            type: 'EmptyExpression',
        };
    }
    const parser = new nearley_1.default.Parser(rules);
    let results;
    try {
        results = parser.feed(query).results;
    }
    catch (error) {
        if (typeof (error === null || error === void 0 ? void 0 : error.message) === 'string' &&
            typeof (error === null || error === void 0 ? void 0 : error.offset) === 'number') {
            const match = error.message.match(MESSAGE_RULE);
            if (!match) {
                throw error;
            }
            throw new errors_1.SyntaxError(`Syntax error at line ${match.groups.line} column ${match.groups.column}`, error.offset, Number(match.groups.line), Number(match.groups.column));
        }
        throw error;
    }
    if (results.length === 0) {
        throw new Error('Found no parsings.');
    }
    if (results.length > 1) {
        const firstResult = JSON.stringify(results[0]);
        for (const result of results) {
            // Only throw if the results are different.
            if (JSON.stringify(result) !== firstResult) {
                throw new errors_1.LiqeError('Ambiguous results.');
            }
        }
    }
    const hydratedAst = (0, hydrateAst_1.hydrateAst)(results[0]);
    return hydratedAst;
};
exports.parse = parse;
