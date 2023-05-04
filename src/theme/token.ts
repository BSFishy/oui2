import { unsafeCSS, type CSSResult } from 'lit';
import { REGISTRY } from './registry';
import { v4 as uuidv4 } from 'uuid';

export class Token {
  readonly path: string[];
  readonly defaultValue?: string | number;

  constructor(path: string[], defaultValue?: string | number) {
    this.path = path;
    this.defaultValue = defaultValue;

    // TODO: validate path doesn't contain any bad characters, i.e. [a-zA-Z0-9] (but with tighter restrictions because variable names blah blah blah
  }

  get variableName(): string {
    return this.path.join('-');
  }
}

export function token(path: string[], defaultValue?: string | number): string {
  const key = uuidv4();
  const token = new Token(path, defaultValue);

  REGISTRY.register(key, token);

  return key;
}

export type TokenMap = Record<string, CSSResult>;

export function tokenMap(tokens: string[]): TokenMap {
  const mapping = {};

  for (const key of tokens) {
    const token = REGISTRY.tokens[key];

    mapping[key] = unsafeCSS(`var(--${token.variableName})`);
  }

  return mapping;
}
