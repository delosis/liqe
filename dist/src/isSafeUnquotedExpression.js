"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSafeUnquotedExpression = void 0;
const isSafeUnquotedExpression = (expression) => {
    return /^[#$*@A-Z_a-z][#$*.@A-Z_a-z-]*$/.test(expression);
};
exports.isSafeUnquotedExpression = isSafeUnquotedExpression;
