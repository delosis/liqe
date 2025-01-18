"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createGetValueFunctionBody_1 = require("../../src/createGetValueFunctionBody");
const ava_1 = __importDefault(require("ava"));
const testPath = (t, expected) => {
    t.is((0, createGetValueFunctionBody_1.createGetValueFunctionBody)(t.title), expected);
};
const testThrows = (t) => {
    t.throws(() => {
        (0, createGetValueFunctionBody_1.createGetValueFunctionBody)(t.title);
    });
};
(0, ava_1.default)('.a', testPath, 'return subject?.a');
(0, ava_1.default)('.a.b', testPath, 'return subject?.a?.b');
(0, ava_1.default)('.foo', testPath, 'return subject?.foo');
(0, ava_1.default)('.foo.bar', testPath, 'return subject?.foo?.bar');
(0, ava_1.default)('._foo', testPath, 'return subject?._foo');
(0, ava_1.default)('._foo._bar', testPath, 'return subject?._foo?._bar');
(0, ava_1.default)('.foo0', testPath, 'return subject?.foo0');
(0, ava_1.default)('.foo0.bar1', testPath, 'return subject?.foo0?.bar1');
(0, ava_1.default)('.1', testPath, 'return subject?.[1]');
(0, ava_1.default)('.10', testPath, 'return subject?.[10]');
(0, ava_1.default)('foo', testThrows);
(0, ava_1.default)('.foo..bar', testThrows);
(0, ava_1.default)('.foo bar', testThrows);
(0, ava_1.default)('.foo[0]', testThrows);
(0, ava_1.default)('.00', testThrows);
(0, ava_1.default)('.01', testThrows);
