"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxError = exports.LiqeError = void 0;
const ts_error_1 = require("ts-error");
class LiqeError extends ts_error_1.ExtendableError {
}
exports.LiqeError = LiqeError;
class SyntaxError extends LiqeError {
    constructor(message, offset, line, column) {
        super(message);
        this.message = message;
        this.offset = offset;
        this.line = line;
        this.column = column;
    }
}
exports.SyntaxError = SyntaxError;
