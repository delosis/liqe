import { LiqeError, SyntaxError } from './errors';
import grammar from './grammar';
import { hydrateAst } from './hydrateAst';
import { type LiqeQuery, type ParserAst } from './types';
import nearley from 'nearley';

const rules = nearley.Grammar.fromCompiled(grammar);

const MESSAGE_RULE = /Syntax error at line (?<line>\d+) col (?<column>\d+)/;

export const parse = (query: string): LiqeQuery => {
  if (query.trim() === '') {
    return {
      location: {
        end: 0,
        start: 0,
      },
      type: 'EmptyExpression',
    };
  }

  const parser = new nearley.Parser(rules);

  let results;

  try {
    results = parser.feed(query).results as ParserAst;
  } catch (error: any) {
    if (
      typeof error?.message === 'string' &&
      typeof error?.offset === 'number'
    ) {
      const match = error.message.match(MESSAGE_RULE);

      if (!match) {
        throw error;
      }

      throw new SyntaxError(
        `Syntax error at line ${match.groups.line} column ${match.groups.column}`,
        error.offset,
        Number(match.groups.line),
        Number(match.groups.column),
      );
    }

    throw error;
  }

  if (results.length === 0) {
    throw new Error('Found no parsings.');
  }

  if (results.length > 1) {
    const firstResult = JSON.stringify(results[0]);

    for (const result of results) {
      // Only throw if the results are different.
      if (JSON.stringify(result) !== firstResult) {
        throw new LiqeError('Ambiguous results.');
      }
    }
  }

  const hydratedAst = hydrateAst(results[0]);

  return hydratedAst;
};
