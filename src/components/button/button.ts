import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit-labs/context';
import { styleMap } from 'lit/directives/style-map.js';
import {
  token,
  tokenMap,
  themeContext,
  type Theme,
  getStyle,
} from '../../theme';

const TEST_TOKEN = token(['example'], 'green');

const tokens = tokenMap([TEST_TOKEN]);

@customElement('oui-button')
export class OuiButton extends LitElement {
  static styles = css`
    button {
      background-color: transparent;
      padding: 10px;
      border: 2px solid var(--borderColor);
      border-radius: 12px;
      font-size: 16px;
      color: ${tokens[TEST_TOKEN]};
    }
  `;

  @consume({ context: themeContext, subscribe: true })
  readonly theme: Theme;

  @property()
  color?: 'primary' | 'secondary' = 'primary';

  render() {
    console.log(this.theme);
    return html`
      <button
        style=${styleMap({
          ...getStyle(this.theme, tokens),
          '--borderColor': this.color === 'primary' ? 'blue' : 'red',
        })}
        role="button"
        tabindex="0"
      >
        <slot>Submit</slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'oui-button': OuiButton;
  }
}
