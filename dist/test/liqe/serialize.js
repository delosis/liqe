"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../../src/parse");
const serialize_1 = require("../../src/serialize");
const ava_1 = __importDefault(require("ava"));
const testQuery = (t) => {
    t.is((0, serialize_1.serialize)((0, parse_1.parse)(t.title)), t.title);
};
(0, ava_1.default)('empty query', (t) => {
    t.is((0, serialize_1.serialize)((0, parse_1.parse)('')), '');
});
(0, ava_1.default)('foo', testQuery);
(0, ava_1.default)('()', testQuery);
(0, ava_1.default)('( )', testQuery);
(0, ava_1.default)('foo:', testQuery);
(0, ava_1.default)('foo bar', testQuery);
(0, ava_1.default)('foo AND bar [multiple spaces]', (t) => {
    t.is((0, serialize_1.serialize)((0, parse_1.parse)('foo   AND   bar')), 'foo   AND   bar');
});
(0, ava_1.default)('foo bar [multiple spaces]', (t) => {
    t.is((0, serialize_1.serialize)((0, parse_1.parse)('foo   bar')), 'foo   bar');
});
(0, ava_1.default)('foo_bar', testQuery);
(0, ava_1.default)('"foo"', testQuery);
(0, ava_1.default)("'foo'", testQuery);
(0, ava_1.default)('/foo/', testQuery);
(0, ava_1.default)('/foo/ui', testQuery);
(0, ava_1.default)('/\\s/', testQuery);
(0, ava_1.default)('/[^.:@\\s](?:[^:@\\s]*[^.:@\\s])?@[^.@\\s]+(?:\\.[^.@\\s]+)*/', testQuery);
(0, ava_1.default)('foo:bar', testQuery);
// https://github.com/gajus/liqe/issues/18
// https://github.com/gajus/liqe/issues/19
ava_1.default.skip('foo: bar', testQuery);
(0, ava_1.default)('foo:123', testQuery);
(0, ava_1.default)('foo:=123', testQuery);
// https://github.com/gajus/liqe/issues/18
// https://github.com/gajus/liqe/issues/19
ava_1.default.skip('foo:= 123', testQuery);
(0, ava_1.default)('foo:=-123', testQuery);
(0, ava_1.default)('foo:=123.4', testQuery);
(0, ava_1.default)('foo:>=123', testQuery);
(0, ava_1.default)('foo:true', testQuery);
(0, ava_1.default)('foo:false', testQuery);
(0, ava_1.default)('foo:null', testQuery);
(0, ava_1.default)('foo.bar:baz', testQuery);
(0, ava_1.default)('foo_bar:baz', testQuery);
(0, ava_1.default)('$foo:baz', testQuery);
(0, ava_1.default)('"foo bar":baz', testQuery);
(0, ava_1.default)("'foo bar':baz", testQuery);
(0, ava_1.default)('foo:"bar"', testQuery);
(0, ava_1.default)("foo:'bar'", testQuery);
(0, ava_1.default)('foo:bar baz:qux', testQuery);
(0, ava_1.default)('foo:bar AND baz:qux', testQuery);
(0, ava_1.default)('(foo:bar AND baz:qux)', testQuery);
(0, ava_1.default)('(foo:bar) AND (baz:qux)', testQuery);
(0, ava_1.default)('NOT (foo:bar AND baz:qux)', testQuery);
(0, ava_1.default)('NOT foo:bar', testQuery);
(0, ava_1.default)('-foo:bar', testQuery);
(0, ava_1.default)('NOT (foo:bar)', testQuery);
(0, ava_1.default)('(foo:bar AND NOT baz:qux)', testQuery);
(0, ava_1.default)('foo:bar AND baz:qux AND quuz:corge', testQuery);
(0, ava_1.default)('((foo:bar AND baz:qux) AND quuz:corge)', testQuery);
(0, ava_1.default)('(foo:bar)', testQuery);
(0, ava_1.default)('((foo:bar))', testQuery);
(0, ava_1.default)('( foo:bar )', testQuery);
(0, ava_1.default)('( foo:bar ) [multiple spaces]', (t) => {
    t.is((0, serialize_1.serialize)((0, parse_1.parse)('(   foo:bar   )')), '(   foo:bar   )');
});
(0, ava_1.default)('(foo:bar OR baz:qux)', testQuery);
(0, ava_1.default)('(foo:bar OR (baz:qux OR quuz:corge))', testQuery);
(0, ava_1.default)('((foo:bar OR baz:qux) OR quuz:corge)', testQuery);
(0, ava_1.default)('[1 TO 2]', testQuery);
(0, ava_1.default)('{1 TO 2]', testQuery);
(0, ava_1.default)('[1 TO 2}', testQuery);
(0, ava_1.default)('{1 TO 2}', testQuery);
