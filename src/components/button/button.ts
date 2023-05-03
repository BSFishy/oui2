import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('oui-button')
export class OuiButton extends LitElement {
  @property()
  color?: 'primary' | 'secondary' = 'primary';

  render() {
    return html`
      <button
        style=${styleMap({
          backgroundColor: this.color === 'primary' ? 'lightgrey' : 'red',
        })}
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
