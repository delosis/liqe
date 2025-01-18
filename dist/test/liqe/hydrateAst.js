"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hydrateAst_1 = require("../../src/hydrateAst");
const ava_1 = __importDefault(require("ava"));
(0, ava_1.default)('adds getValue when field is a safe path', (t) => {
    const parserAst = {
        field: {
            name: '.foo',
            type: 'Field',
        },
        type: 'Tag',
    };
    const hydratedAst = (0, hydrateAst_1.hydrateAst)(parserAst);
    t.true('getValue' in hydratedAst);
});
(0, ava_1.default)('adds getValue when field is a safe path (recursive)', (t) => {
    var _a, _b, _c;
    const parserAst = {
        field: {
            type: 'ImplicitField',
        },
        left: {
            field: {
                type: 'ImplicitField',
            },
            right: {
                field: {
                    type: 'ImplicitField',
                },
                operand: {
                    field: {
                        name: '.foo',
                        type: 'Field',
                    },
                    type: 'Tag',
                },
            },
        },
    };
    const hydratedAst = (0, hydrateAst_1.hydrateAst)(parserAst);
    t.true('getValue' in ((_c = (_b = (_a = hydratedAst === null || hydratedAst === void 0 ? void 0 : hydratedAst.left) === null || _a === void 0 ? void 0 : _a.right) === null || _b === void 0 ? void 0 : _b.operand) !== null && _c !== void 0 ? _c : {}));
});
(0, ava_1.default)('does not add getValue if path is unsafe', (t) => {
    const parserAst = {
        field: {
            name: 'foo',
            type: 'Field',
        },
    };
    const hydratedAst = (0, hydrateAst_1.hydrateAst)(parserAst);
    t.false('getValue' in hydratedAst);
});
(0, ava_1.default)('getValue accesses existing value', (t) => {
    var _a;
    const parserAst = {
        field: {
            name: '.foo',
            type: 'Field',
        },
        type: 'Tag',
    };
    const hydratedAst = (0, hydrateAst_1.hydrateAst)(parserAst);
    t.is((_a = hydratedAst.getValue) === null || _a === void 0 ? void 0 : _a.call(hydratedAst, { foo: 'bar' }), 'bar');
});
(0, ava_1.default)('getValue accesses existing value (deep)', (t) => {
    var _a;
    const parserAst = {
        field: {
            name: '.foo.bar.baz',
            type: 'Field',
        },
        type: 'Tag',
    };
    const hydratedAst = (0, hydrateAst_1.hydrateAst)(parserAst);
    t.is((_a = hydratedAst.getValue) === null || _a === void 0 ? void 0 : _a.call(hydratedAst, { foo: { bar: { baz: 'qux' } } }), 'qux');
});
(0, ava_1.default)('returns undefined if path does not resolve', (t) => {
    var _a;
    const parserAst = {
        field: {
            name: '.foo.bar.baz',
            type: 'Field',
        },
    };
    const hydratedAst = (0, hydrateAst_1.hydrateAst)(parserAst);
    t.is((_a = hydratedAst.getValue) === null || _a === void 0 ? void 0 : _a.call(hydratedAst, {}), undefined);
});
