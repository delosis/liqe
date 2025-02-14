"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
const internalFilter_1 = require("./internalFilter");
const filter = (ast, data, options = {}) => {
    return (0, internalFilter_1.internalFilter)(ast, data, true, [], [], options);
};
exports.filter = filter;
