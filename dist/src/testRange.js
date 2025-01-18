"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRange = void 0;
const testRange = (value, range) => {
    if (typeof value === 'number') {
        if (value < range.min) {
            return false;
        }
        if (value === range.min && !range.minInclusive) {
            return false;
        }
        if (value > range.max) {
            return false;
        }
        if (value === range.max && !range.maxInclusive) {
            return false;
        }
        return true;
    }
    // @todo handle non-numeric ranges -- https://github.com/gajus/liqe/issues/3
    return false;
};
exports.testRange = testRange;
