import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { type Theme } from './index';

import './index';
import '../components/button';

const THEME1: Theme = {
  example: 'red',
};

const THEME2: Theme = {
  example: 'purple',
};

@customElement('oui-test')
export class OuiTest extends LitElement {
  static styles = css``;

  @state()
  protected _old = true;

  render() {
    return html`
      <oui-theme-provider .theme=${this._old ? THEME1 : THEME2}>
        <oui-button>Submit</oui-button>
      </oui-theme-provider>
      <br />
      <button @click=${this._switch}>Switch</button>
    `;
  }

  private _switch() {
    this._old = !this._old;
  }
}
