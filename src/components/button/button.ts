import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { token, tokenMap, Themeable } from '../../theme';

// Generic tokens, like primary color, font, etc., would typically be defined in their own file to be used globally, then individual modules or components could define tokens like this for component-level themability
const TEST_TOKEN = token(['example'], 'green');

// Create a map of all the tokens that are referenced in this component
const tokens = tokenMap([TEST_TOKEN]);

// Note we extend the Themeable mixin to get a reference to the theme context and also access to `getStyle` function
@customElement('oui-button')
export class OuiButton extends Themeable(LitElement) {
  // Reference token map here, since we can't dynamically change styles since this is static
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
    // Use `getStyle` here for dynamic styles from the theme
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
