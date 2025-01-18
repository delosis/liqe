"use strict";
/* eslint-disable no-new-func */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hydrateAst = void 0;
const createGetValueFunctionBody_1 = require("./createGetValueFunctionBody");
const isSafePath_1 = require("./isSafePath");
const hydrateAst = (subject) => {
    const newSubject = {
        ...subject,
    };
    if (subject.type === 'Tag' &&
        subject.field.type === 'Field' &&
        'field' in subject &&
        (0, isSafePath_1.isSafePath)(subject.field.name)) {
        newSubject.getValue = new Function('subject', (0, createGetValueFunctionBody_1.createGetValueFunctionBody)(subject.field.name));
    }
    if ('left' in subject) {
        newSubject.left = (0, exports.hydrateAst)(subject.left);
    }
    if ('right' in subject) {
        newSubject.right = (0, exports.hydrateAst)(subject.right);
    }
    if ('operand' in subject) {
        newSubject.operand = (0, exports.hydrateAst)(subject.operand);
    }
    return newSubject;
};
exports.hydrateAst = hydrateAst;
