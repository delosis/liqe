type Grammar = {
    Lexer: NearleyLexer | undefined;
    ParserRules: NearleyRule[];
    ParserStart: string;
};
type NearleyLexer = {
    formatError: (token: never) => string;
    has: (tokenType: string) => boolean;
    next: () => NearleyToken | undefined;
    reset: (chunk: string, info: any) => void;
    save: () => any;
};
type NearleyRule = {
    name: string;
    postprocess?: (d: any[], loc: number, reject?: {}) => any;
    symbols: NearleySymbol[];
};
type NearleySymbol = string | {
    literal: any;
} | {
    test: (token: any) => boolean;
};
type NearleyToken = {
    [key: string]: any;
    value: any;
};
declare const grammar: Grammar;
export default grammar;
