import { css, html, LitElement } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { type Theme } from './index';

import './index';
import '../components/button';

const THEME1: Theme = {
  example: 'red',
  test: {
    example2: 'green',
    test2: {
      example3: 'blue',
    },
  },
};

const THEME2: Theme = {
  example: 'purple',
};

@customElement('oui-test')
export class OuiTest extends LitElement {
  static styles = css``;

  @state()
  protected theme: 'one' | 'two' | undefined = 'one';

  @property()
  useDefault: boolean = false;

  render() {
    return html`
      <oui-theme-provider .theme=${this.getTheme()}>
        <oui-button>Submit</oui-button>
      </oui-theme-provider>
      <br />
      <button @click=${this._switch}>Switch</button>
    `;
  }

  private getTheme(): Theme | undefined {
    switch (this.theme) {
      case 'one':
        return THEME1;
      case 'two':
        return THEME2;
      case undefined:
        return undefined;
    }
  }

  private _switch() {
    if (this.useDefault) {
      switch (this.theme) {
        case 'one':
          this.theme = 'two';
          break;
        case 'two':
          this.theme = undefined;
          break;
        case undefined:
          this.theme = 'one';
          break;
      }
    } else {
      switch (this.theme) {
        case 'one':
          this.theme = 'two';
          break;
        case 'two':
        case undefined:
          this.theme = 'one';
          break;
      }
    }
  }
}
