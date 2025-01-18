"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRegex_1 = require("../../src/parseRegex");
const ava_1 = __importDefault(require("ava"));
const EMAIL_REGEX = /[^.:@\\s](?:[^:@\\s]*[^.:@\\s])?@[^.@\\s]+(?:\\.[^.@\\s]+)*/;
const testRule = ava_1.default.macro((t, regex) => {
    t.deepEqual((0, parseRegex_1.parseRegex)(t.title), regex);
});
(0, ava_1.default)('/foo/', testRule, /foo/);
(0, ava_1.default)('/foo/u', testRule, /foo/u);
(0, ava_1.default)('/foo', testRule, /\/foo/);
(0, ava_1.default)('foo/bar', testRule, /foo\/bar/);
(0, ava_1.default)('/foo/bar/', testRule, /foo\/bar/);
(0, ava_1.default)(String(EMAIL_REGEX), testRule, EMAIL_REGEX);
