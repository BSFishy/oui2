import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ContextProvider, createContext } from '@lit-labs/context';
import { type StyleInfo } from 'lit/directives/style-map.js';
import { type TokenMap } from './token';
import { REGISTRY } from './registry';

export interface Theme {
  [key: string]: string | number | Theme;
}

export const themeContext = createContext<Theme>('oui-theme');

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

@customElement('oui-theme-provider')
export class OuiThemeProvider extends LitElement {
  provider = new ContextProvider(this, themeContext, {
    test: {
      value: 'green',
    },
    example: 'purple',
  });

  render() {
    console.log(this.provider.value);
    return html`<slot></slot>`;
  }
}
