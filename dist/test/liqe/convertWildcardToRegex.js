"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convertWildcardToRegex_1 = require("../../src/convertWildcardToRegex");
const ava_1 = __importDefault(require("ava"));
const testRule = ava_1.default.macro((t, regex) => {
    t.deepEqual((0, convertWildcardToRegex_1.convertWildcardToRegex)(t.title), regex);
});
(0, ava_1.default)('*', testRule, /(.+?)/);
(0, ava_1.default)('?', testRule, /(.)/);
(0, ava_1.default)('foo*bar', testRule, /foo(.+?)bar/);
(0, ava_1.default)('foo***bar', testRule, /foo(.+?)bar/);
(0, ava_1.default)('foo*bar*', testRule, /foo(.+?)bar(.+?)/);
(0, ava_1.default)('foo?bar', testRule, /foo(.)bar/);
(0, ava_1.default)('foo???bar', testRule, /foo(.)(.)(.)bar/);
