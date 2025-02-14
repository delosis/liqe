"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const filter_1 = require("./filter");
const test = (ast, subject, options) => {
    return (0, filter_1.filter)(ast, [subject], options).length === 1;
};
exports.test = test;
