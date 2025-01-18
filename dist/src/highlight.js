"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlight = void 0;
const escapeRegexString_1 = require("./escapeRegexString");
const internalFilter_1 = require("./internalFilter");
const highlight = (ast, data) => {
    const highlights = [];
    (0, internalFilter_1.internalFilter)(ast, [data], false, [], highlights);
    const aggregatedHighlights = [];
    for (const highlightNode of highlights) {
        let aggregatedHighlight = aggregatedHighlights.find((maybeTarget) => {
            return maybeTarget.path === highlightNode.path;
        });
        if (!aggregatedHighlight) {
            aggregatedHighlight = {
                keywords: [],
                path: highlightNode.path,
            };
            aggregatedHighlights.push(aggregatedHighlight);
        }
        if (highlightNode.keyword) {
            aggregatedHighlight.keywords.push(highlightNode.keyword);
        }
    }
    return aggregatedHighlights.map((aggregatedHighlight) => {
        if (aggregatedHighlight.keywords.length > 0) {
            return {
                path: aggregatedHighlight.path,
                query: new RegExp('(' +
                    aggregatedHighlight.keywords
                        .map((keyword) => {
                        return (0, escapeRegexString_1.escapeRegexString)(keyword.trim());
                    })
                        .join('|') +
                    ')'),
            };
        }
        return {
            path: aggregatedHighlight.path,
        };
    });
};
exports.highlight = highlight;
