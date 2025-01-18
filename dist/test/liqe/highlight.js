"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_1 = require("../../src/highlight");
const parse_1 = require("../../src/parse");
const ava_1 = __importDefault(require("ava"));
const testQuery = ava_1.default.macro((t, query, subject, highlights) => {
    t.deepEqual((0, highlight_1.highlight)((0, parse_1.parse)(query), subject), highlights);
});
ava_1.default.skip('matches every property', testQuery, '*', {
    email: 'foo@bar.com',
    name: 'foo bar',
}, [
    {
        path: 'email',
        query: /(foo@bar.com)/,
    },
    {
        keyword: /(foo bar)/,
        path: 'name',
    },
]);
(0, ava_1.default)('matches any property', testQuery, 'foo', {
    email: 'foo@bar.com',
    name: 'foo bar',
}, [
    {
        path: 'email',
        query: /(foo)/,
    },
    {
        path: 'name',
        query: /(foo)/,
    },
]);
(0, ava_1.default)('matches property', testQuery, 'name:foo', {
    name: 'foo bar',
}, [
    {
        path: 'name',
        query: /(foo)/,
    },
]);
(0, ava_1.default)('matches property (correctly handles case mismatch)', testQuery, 'name:foo', {
    name: 'Foo Bar',
}, [
    {
        path: 'name',
        query: /(Foo)/,
    },
]);
(0, ava_1.default)('matches or', testQuery, 'name:foo OR name:bar OR height:=180', {
    height: 180,
    name: 'bar',
}, [
    {
        path: 'name',
        query: /(bar)/,
    },
    {
        path: 'height',
    },
]);
(0, ava_1.default)('matches star (*) wildcard', testQuery, 'name:f*o', {
    name: 'foo bar baz',
}, [
    {
        path: 'name',
        query: /(foo)/,
    },
]);
(0, ava_1.default)('matches star (*) wildcard (lazy)', testQuery, 'name:f*o', {
    name: 'foo bar o baz',
}, [
    {
        path: 'name',
        query: /(foo)/,
    },
]);
(0, ava_1.default)('matches question mark (?) wildcard', testQuery, 'name:f?o', {
    name: 'foo bar baz',
}, [
    {
        path: 'name',
        query: /(foo)/,
    },
]);
(0, ava_1.default)('matches regex', testQuery, 'name:/foo/', {
    name: 'foo bar baz',
}, [
    {
        path: 'name',
        query: /(foo)/,
    },
]);
ava_1.default.skip('matches regex (multiple)', testQuery, 'name:/(foo|bar)/g', {
    name: 'foo bar baz',
}, [
    {
        path: 'name',
        query: /(foo)/,
    },
    {
        keyword: /(bar)/,
        path: 'name',
    },
]);
(0, ava_1.default)('matches number', testQuery, 'height:=180', {
    height: 180,
}, [
    {
        path: 'height',
    },
]);
(0, ava_1.default)('matches range', testQuery, 'height:[100 TO 200]', {
    height: 180,
}, [
    {
        path: 'height',
    },
]);
(0, ava_1.default)('matches boolean', testQuery, 'member:false', {
    member: false,
}, [
    {
        path: 'member',
    },
]);
(0, ava_1.default)('matches array member', testQuery, 'tags:bar', {
    tags: ['foo', 'bar', 'baz qux'],
}, [
    {
        path: 'tags.1',
        query: /(bar)/,
    },
]);
(0, ava_1.default)('matches multiple array members', testQuery, 'tags:ba', {
    tags: ['foo', 'bar', 'baz qux'],
}, [
    {
        path: 'tags.1',
        query: /(ba)/,
    },
    {
        path: 'tags.2',
        query: /(ba)/,
    },
]);
ava_1.default.skip('does not include highlights from non-matching branches (and)', testQuery, 'name:foo AND NOT name:foo', {
    name: 'foo',
}, []);
(0, ava_1.default)('does not include highlights from non-matching branches (or)', testQuery, 'name:bar OR NOT name:foo', {
    name: 'foo',
}, []);
(0, ava_1.default)('does not highlight the same term multiple times', testQuery, 'foo', {
    name: 'foo foo foo',
}, [
    {
        path: 'name',
        query: /(foo)/,
    },
]);
(0, ava_1.default)('aggregates multiple highlights', testQuery, 'foo AND bar AND baz', {
    name: 'foo bar baz',
}, [
    {
        path: 'name',
        query: /(foo|bar|baz)/,
    },
]);
(0, ava_1.default)('aggregates multiple highlights (phrases)', testQuery, '"foo bar" AND baz', {
    name: 'foo bar baz',
}, [
    {
        path: 'name',
        query: /(foo bar|baz)/,
    },
]);
(0, ava_1.default)('aggregates multiple highlights (escaping)', testQuery, '"(foo bar)" AND baz', {
    name: '(foo bar) baz',
}, [
    {
        path: 'name',
        query: /(\(foo bar\)|baz)/,
    },
]);
