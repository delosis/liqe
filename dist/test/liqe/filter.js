"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("../../src/filter");
const parse_1 = require("../../src/parse");
const ava_1 = __importDefault(require("ava"));
const persons = [
    {
        height: 180,
        name: 'david',
    },
    {
        height: 175,
        name: 'john',
    },
    {
        height: 175,
        location: {
            city: 'London',
        },
        name: 'mike',
    },
    {
        height: 220,
        name: 'robert',
        tags: ['member'],
    },
    {
        attributes: {
            member: null,
        },
        balance: 6364917,
        email: 'noah@john.com',
        height: 225,
        membership: null,
        name: 'noah',
        nick: 'john',
        phoneNumber: '404-050-2611',
        subscribed: true,
    },
    {
        height: 150,
        name: 'foo bar',
        nick: 'old dog',
    },
    {
        height: 194,
        name: 'fox',
        nick: 'quick fox',
    },
];
const testQuery = ava_1.default.macro((t, expectedResultNames) => {
    const matchingPersonNames = (0, filter_1.filter)((0, parse_1.parse)(t.title), persons).map((person) => {
        return person.name;
    });
    t.deepEqual(matchingPersonNames, expectedResultNames);
});
(0, ava_1.default)('"david"', testQuery, ['david']);
(0, ava_1.default)('name:"da"', testQuery, ['david']);
(0, ava_1.default)('name:"david"', testQuery, ['david']);
(0, ava_1.default)('name:David', testQuery, ['david']);
(0, ava_1.default)('name:D*d', testQuery, ['david']);
(0, ava_1.default)('name:*avid', testQuery, ['david']);
(0, ava_1.default)('name:a*d', testQuery, ['david']);
(0, ava_1.default)('name:/(david)|(john)/', testQuery, ['david', 'john']);
(0, ava_1.default)('name:/(David)|(John)/', testQuery, []);
(0, ava_1.default)('name:/(David)|(John)/i', testQuery, ['david', 'john']);
(0, ava_1.default)('height:[200 TO 300]', testQuery, ['robert', 'noah']);
(0, ava_1.default)('height:[220 TO 300]', testQuery, ['robert', 'noah']);
(0, ava_1.default)('height:{220 TO 300]', testQuery, ['noah']);
(0, ava_1.default)('height:[200 TO 225]', testQuery, ['robert', 'noah']);
(0, ava_1.default)('height:[200 TO 225}', testQuery, ['robert']);
(0, ava_1.default)('height:{220 TO 225}', testQuery, []);
(0, ava_1.default)('NOT David', testQuery, [
    'john',
    'mike',
    'robert',
    'noah',
    'foo bar',
    'fox',
]);
(0, ava_1.default)('-David', testQuery, ['john', 'mike', 'robert', 'noah', 'foo bar', 'fox']);
(0, ava_1.default)('David OR John', testQuery, ['david', 'john', 'noah']);
(0, ava_1.default)('Noah AND John', testQuery, ['noah']);
(0, ava_1.default)('John AND NOT Noah', testQuery, ['john']);
(0, ava_1.default)('David OR NOT John', testQuery, [
    'david',
    'mike',
    'robert',
    'foo bar',
    'fox',
]);
(0, ava_1.default)('John AND -Noah', testQuery, ['john']);
(0, ava_1.default)('David OR -John', testQuery, [
    'david',
    'mike',
    'robert',
    'foo bar',
    'fox',
]);
(0, ava_1.default)('name:David OR John', testQuery, ['david', 'john', 'noah']);
(0, ava_1.default)('name:David OR name:John', testQuery, ['david', 'john']);
(0, ava_1.default)('name:"david" OR name:"john"', testQuery, ['david', 'john']);
(0, ava_1.default)('name:"David" OR name:"John"', testQuery, []);
(0, ava_1.default)('height:=175', testQuery, ['john', 'mike']);
(0, ava_1.default)('height:>200', testQuery, ['robert', 'noah']);
(0, ava_1.default)('height:>220', testQuery, ['noah']);
(0, ava_1.default)('height:>=220', testQuery, ['robert', 'noah']);
(0, ava_1.default)('height:=175 AND NOT name:mike', testQuery, ['john']);
(0, ava_1.default)('"member"', testQuery, ['robert']);
(0, ava_1.default)('tags:"member"', testQuery, ['robert']);
(0, ava_1.default)('"London"', testQuery, ['mike']);
(0, ava_1.default)('city:"London"', testQuery, []);
(0, ava_1.default)('location.city:"London"', testQuery, ['mike']);
(0, ava_1.default)('membership:null', testQuery, ['noah']);
(0, ava_1.default)('attributes.member:null', testQuery, ['noah']);
(0, ava_1.default)('subscribed:true', testQuery, ['noah']);
(0, ava_1.default)('email:/[^.:@\\s](?:[^:@\\s]*[^.:@\\s])?@[^.@\\s]+(?:\\.[^.@\\s]+)*/', testQuery, ['noah']);
(0, ava_1.default)('phoneNumber:"404-050-2611"', testQuery, ['noah']);
(0, ava_1.default)('phoneNumber:404', testQuery, ['noah']);
(0, ava_1.default)('balance:364', testQuery, ['noah']);
(0, ava_1.default)('(David)', testQuery, ['david']);
(0, ava_1.default)('(name:david OR name:john)', testQuery, ['david', 'john']);
(0, ava_1.default)('(name:"foo bar" AND nick:"quick fox") OR name:fox', testQuery, ['fox']);
(0, ava_1.default)('(name:fox OR name:"foo bar" AND nick:"old dog")', testQuery, ['foo bar']);
(0, ava_1.default)('(name:fox OR (name:"foo bar" AND nick:"old dog"))', testQuery, [
    'fox',
    'foo bar',
]);
