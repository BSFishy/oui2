import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { token, tokenMap, Themeable } from '../../theme';

const TEST_TOKEN = token(['example'], 'green');

const tokens = tokenMap([TEST_TOKEN]);

@customElement('oui-button')
export class OuiButton extends Themeable(LitElement) {
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

  @property()
  color?: 'primary' | 'secondary' = 'primary';

  render() {
    return html`
      <button
        style=${styleMap({
          ...this.getStyle(tokens),
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
