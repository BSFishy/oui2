import { unsafeCSS, type CSSResult } from 'lit';
import { REGISTRY } from './registry';
import { v4 as uuidv4 } from 'uuid';

export type TokenId = string;

export class Token {
  readonly path: string[];
  readonly defaultValue?: string | number;

  constructor(path: string[], defaultValue?: string | number) {
    // Create a copy of the path so that builders can't modify it after we validate it
    this.path = [...path];
    this.defaultValue = defaultValue;

    // We can expand this regex later if we deem more inputs to be valid
    const regex = /^[a-zA-Z][a-zA-Z0-9-]*$/;
    for (const segment of this.path) {
      if (!regex.test(segment)) {
        throw new Error(`Token segment (${segment}) is invalid`);
      }
    }
  }

  get variableName(): string {
    return this.path.join('-');
  }
}

// TODO: allow using a function as a default value given the current theme to calculate a value given other theme values
export function token(path: string[], defaultValue?: string | number): TokenId {
  const key = uuidv4();
  const token = new Token(path, defaultValue);

  REGISTRY.register(key, token);

  return key;
}

export type TokenMap = Record<TokenId, CSSResult>;

export function tokenMap(tokens: TokenId[]): TokenMap {
  const mapping = {};

  for (const key of tokens) {
    const token = REGISTRY.tokens[key];

    // Using unsafe CSS is safe here because we validate the variable name isn't malicious when constructing the token
    mapping[key] = unsafeCSS(`var(--${token.variableName})`);
  }

  return mapping;
}
