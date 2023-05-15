import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ContextProvider, createContext } from '@lit-labs/context';

type ThemeValue = string | number;

// TODO: allow extending themes an arbitrary number of levels (theme references theme by value (need to detect cyclical dependencies))
// TODO: allow using a function as a value given the current theme to calculate a value given other theme values
export interface Theme {
  [key: string]: ThemeValue | Theme;
}

export const themeContext = createContext<Theme | undefined>('oui-theme');
export const themeServiceContext =
  createContext<ThemeService>('oui-theme-service');

type ThemeSetter = (theme: Theme | undefined) => void;

export class ThemeService {
  private readonly _themeSetter: ThemeSetter;

  constructor(themeSetter: ThemeSetter) {
    this._themeSetter = themeSetter;
  }

  setTheme(theme: Theme | undefined) {
    this._themeSetter(theme);
  }
}

@customElement('oui-theme-provider')
export class OuiThemeProvider extends LitElement {
  themeProvider = new ContextProvider(this, themeContext, undefined);
  themeServiceProvider = new ContextProvider(
    this,
    themeServiceContext,
    new ThemeService((theme) => {
      this.themeProvider.setValue(theme);
    })
  );

  set theme(value: Theme | undefined) {
    const oldValue = this.themeProvider.value;
    this.themeProvider.setValue(value);
    this.requestUpdate('theme', oldValue);
  }

  @property()
  get theme(): Theme | undefined {
    return this.themeProvider.value;
  }

  render() {
    // it's possible to define styles here to propagate down, but I don't think that fits the component model _super_ well
    return html`<slot></slot>`;
  }
}
