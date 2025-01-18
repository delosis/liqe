"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../../src/parse");
const test_1 = require("../../src/test");
const ava_1 = __importDefault(require("ava"));
(0, ava_1.default)('returns true if subject matches the query', (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)('david'), {
        height: 180,
        name: 'david',
    }));
});
(0, ava_1.default)('returns false if subject does not match the query', (t) => {
    t.false((0, test_1.test)((0, parse_1.parse)('mike'), {
        height: 180,
        name: 'david',
    }));
});
