"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isSafeUnquotedExpression_1 = require("../../src/isSafeUnquotedExpression");
const ava_1 = __importDefault(require("ava"));
const testExpression = (t, expected) => {
    t.is((0, isSafeUnquotedExpression_1.isSafeUnquotedExpression)(t.title), expected);
};
(0, ava_1.default)('foo', testExpression, true);
(0, ava_1.default)('.foo', testExpression, false);
