"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../../src/parse");
const test_1 = require("../../src/test");
const ava_1 = __importDefault(require("ava"));
(0, ava_1.default)("returns true if subject matches the query", (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)("david"), {
        height: 180,
        name: "david",
    }));
});
(0, ava_1.default)("returns false if subject does not match the query", (t) => {
    t.false((0, test_1.test)((0, parse_1.parse)("mike"), {
        height: 180,
        name: "david",
    }));
});
// Case sensitivity tests
(0, ava_1.default)("matches case-insensitive by default", (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)("DAVID"), {
        name: "david",
    }));
});
(0, ava_1.default)("respects case sensitivity when enabled", (t) => {
    t.false((0, test_1.test)((0, parse_1.parse)("DAVID"), {
        name: "david",
    }, { caseSensitive: true }));
});
(0, ava_1.default)("matches exact case when case sensitive", (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)("David"), {
        name: "David",
    }, { caseSensitive: true }));
});
// Accent sensitivity tests
(0, ava_1.default)("matches accent-sensitive by default", (t) => {
    t.false((0, test_1.test)((0, parse_1.parse)("Jose"), {
        name: "José",
    }));
});
(0, ava_1.default)("matches accent-insensitive when enabled", (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)("Jose"), {
        name: "José",
    }, { accentSensitive: false }));
});
(0, ava_1.default)("matches accents both ways when accent-insensitive", (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)("José"), {
        name: "Jose",
    }, { accentSensitive: false }));
});
// Combined case and accent sensitivity tests
(0, ava_1.default)("handles both case and accent sensitivity options", (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)("jose"), {
        name: "JOSÉ",
    }, { caseSensitive: false, accentSensitive: false }));
});
(0, ava_1.default)("respects both case and accent sensitivity when enabled", (t) => {
    t.false((0, test_1.test)((0, parse_1.parse)("jose"), {
        name: "JOSÉ",
    }, { caseSensitive: true, accentSensitive: true }));
});
(0, ava_1.default)("matches exact case and accents when both sensitive", (t) => {
    t.true((0, test_1.test)((0, parse_1.parse)("José"), {
        name: "José",
    }, { caseSensitive: true, accentSensitive: true }));
});
