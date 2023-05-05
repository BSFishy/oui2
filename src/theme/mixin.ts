import { type LitElement } from 'lit';
import {
  type Theme,
  type ThemeService,
  themeContext,
  themeServiceContext,
} from './context';
import { consume } from '@lit-labs/context';
import { type TokenMap } from './token';
import { type StyleInfo } from 'lit/directives/style-map.js';
import { REGISTRY } from './registry';

export function getThemeValue(
  theme: Theme | undefined,
  path: string[]
): string | number | undefined {
  let currentLevel: string | number | Theme | undefined = theme;
  for (const segment of path) {
    if (typeof currentLevel === 'undefined') {
      // This most likely indicates that the full path isn't specified in the theme
      return undefined;
    }

    currentLevel = currentLevel[segment];
  }

  if (typeof currentLevel === 'object') {
    throw new Error(
      `Path ended into an object: ${path.join('.')} (${JSON.stringify(
        currentLevel
      )})`
    );
  }

  return currentLevel;
}

export function getStyle(
  theme: Theme | undefined,
  tokenMap: TokenMap
): StyleInfo {
  const styles = {};
  const keys = Object.keys(tokenMap);
  for (const key of keys) {
    const token = REGISTRY.tokens[key];
    let value = getThemeValue(theme, token.path);

    if (typeof value === 'undefined') {
      value = token.defaultValue;
    }

    styles[`--${token.variableName}`] = value;
  }

  return styles;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class ThemeableInterface {
  theme: Theme | undefined;
  getStyle(tokenMap: TokenMap): StyleInfo;
}

export const Themeable = <T extends Constructor<LitElement>>(superClass: T) => {
  class ThemeableClass extends superClass {
    @consume({ context: themeContext, subscribe: true })
    themeContext?: Theme;

    @consume({ context: themeServiceContext })
    themeServiceContext?: ThemeService;

    get theme(): Theme | undefined {
      return this.themeContext;
    }

    set theme(value: Theme | undefined) {
      if (typeof this.themeServiceContext !== 'undefined') {
        this.themeServiceContext.setTheme(value);
      }
    }

    getStyle(tokenMap: TokenMap): StyleInfo {
      return getStyle(this.theme, tokenMap);
    }
  }

  return ThemeableClass as Constructor<ThemeableInterface> & T;
};
