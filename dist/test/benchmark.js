"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Liqe_1 = require("../src/Liqe");
const benny_1 = require("benny");
const faker_1 = __importDefault(require("faker"));
const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1) + min);
};
const persons = [];
let size = 10000;
while (size--) {
    persons.push({
        email: faker_1.default.internet.email(),
        foo: {
            bar: {
                baz: faker_1.default.name.findName(),
            },
        },
        height: randomInRange(160, 220),
        name: faker_1.default.name.findName(),
    });
}
void (0, benny_1.suite)('liqe', (0, benny_1.add)('filters list by the "name" field using simple strict equality check', () => {
    const query = (0, Liqe_1.parse)('name:"Gajus"');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by the "name" field using regex check', () => {
    const query = (0, Liqe_1.parse)('name:/Gajus/ui');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by the "name" field using loose inclusion check', () => {
    const query = (0, Liqe_1.parse)('name:Gajus');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by the "name" field using star (*) wildcard check', () => {
    const query = (0, Liqe_1.parse)('name:Ga*');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by the "name" field using question mark (?) wildcard check', () => {
    const query = (0, Liqe_1.parse)('name:Gaju?');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by any field using loose inclusion check', () => {
    const query = (0, Liqe_1.parse)('Gajus');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by the "height" field using strict equality check', () => {
    const query = (0, Liqe_1.parse)('height:180');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by the "height" field using range check', () => {
    const query = (0, Liqe_1.parse)('height:[160 TO 180]');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.add)('filters list by the "foo.bar.baz" field using simple strict equality check', () => {
    const query = (0, Liqe_1.parse)('foo.bar.baz:"Gajus"');
    return () => {
        (0, Liqe_1.filter)(query, persons);
    };
}), (0, benny_1.cycle)(), (0, benny_1.complete)());
