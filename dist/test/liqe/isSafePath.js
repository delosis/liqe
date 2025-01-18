"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isSafePath_1 = require("../../src/isSafePath");
const ava_1 = __importDefault(require("ava"));
const testPath = (t, expected) => {
    t.is((0, isSafePath_1.isSafePath)(t.title), expected);
};
(0, ava_1.default)('.a', testPath, true);
(0, ava_1.default)('.a.b', testPath, true);
(0, ava_1.default)('.foo', testPath, true);
(0, ava_1.default)('.foo.bar', testPath, true);
(0, ava_1.default)('._foo', testPath, true);
(0, ava_1.default)('._foo._bar', testPath, true);
(0, ava_1.default)('.foo0', testPath, true);
(0, ava_1.default)('.foo0.bar1', testPath, true);
(0, ava_1.default)('.1', testPath, true);
(0, ava_1.default)('.10', testPath, true);
(0, ava_1.default)('foo', testPath, false);
(0, ava_1.default)('.foo..bar', testPath, false);
(0, ava_1.default)('.foo bar', testPath, false);
(0, ava_1.default)('.foo[0]', testPath, false);
(0, ava_1.default)('.00', testPath, false);
(0, ava_1.default)('.01', testPath, false);
