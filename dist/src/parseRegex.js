"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRegex = void 0;
const RegExpRule = /(\/?)(.+)\1([a-z]*)/;
const FlagRule = /^(?!.*?(.).*?\1)[AJUXgimsux]+$/;
const parseRegex = (subject) => {
    const match = RegExpRule.exec(subject);
    if (!match) {
        throw new Error('Invalid RegExp.');
    }
    if (match[3] && !FlagRule.test(match[3])) {
        return new RegExp(subject);
    }
    return new RegExp(match[2], match[3]);
};
exports.parseRegex = parseRegex;
