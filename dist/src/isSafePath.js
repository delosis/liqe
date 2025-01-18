"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSafePath = void 0;
const SAFE_PATH_RULE = /^(\.(?:[_a-zA-Z]\w*|\0|[1-9]\d*))+$/u;
const isSafePath = (path) => {
    return SAFE_PATH_RULE.test(path);
};
exports.isSafePath = isSafePath;
