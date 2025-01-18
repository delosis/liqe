"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetValueFunctionBody = void 0;
const isSafePath_1 = require("./isSafePath");
const createGetValueFunctionBody = (path) => {
    if (!(0, isSafePath_1.isSafePath)(path)) {
        throw new Error('Unsafe path.');
    }
    const body = 'return subject' + path;
    return body.replaceAll(/(\.(\d+))/g, '.[$2]').replaceAll('.', '?.');
};
exports.createGetValueFunctionBody = createGetValueFunctionBody;
