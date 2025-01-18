"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWildcardToRegex = void 0;
const WILDCARD_RULE = /(\*+)|(\?)/g;
const convertWildcardToRegex = (pattern) => {
    return new RegExp(pattern.replaceAll(WILDCARD_RULE, (_match, p1) => {
        return p1 ? '(.+?)' : '(.)';
    }));
};
exports.convertWildcardToRegex = convertWildcardToRegex;
