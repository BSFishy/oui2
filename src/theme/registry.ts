import { type Token, type TokenId } from './token';

class TokenRegistry {
  readonly tokens: Record<TokenId, Token> = {};

  register(key: TokenId, token: Token) {
    if (Object.keys(this.tokens).includes(key)) {
      throw new Error(
        `A token with the key "${key}" has already been registered`
      );
    }

    this.tokens[key] = token;
  }
}

export const REGISTRY = new TokenRegistry();
