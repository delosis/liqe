"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testComparisonRange = void 0;
const testComparisonRange = (query, value, operator) => {
    switch (operator) {
        case ':<':
            return value < query;
        case ':<=':
            return value <= query;
        case ':=':
            return value === query;
        case ':>':
            return value > query;
        case ':>=':
            return value >= query;
        default:
            throw new Error(`Unimplemented comparison operator: ${operator}`);
    }
};
exports.testComparisonRange = testComparisonRange;
