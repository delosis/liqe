"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeRegexString = void 0;
const ESCAPE_RULE = /[$()*+.?[\\\]^{|}]/g;
const DASH_RULE = /-/g;
const escapeRegexString = (subject) => {
    return subject.replaceAll(ESCAPE_RULE, '\\$&').replaceAll(DASH_RULE, '\\x2d');
};
exports.escapeRegexString = escapeRegexString;
