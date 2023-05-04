import { type Token } from './token';

class TokenRegistry {
  readonly tokens: Record<string, Token> = {};

  register(key: string, token: Token) {
    if (Object.keys(this.tokens).includes(key)) {
      throw new Error(
        `A token with the key "${key}" has already been registered`
      );
    }

    this.tokens[key] = token;
  }
}

export const REGISTRY = new TokenRegistry();
