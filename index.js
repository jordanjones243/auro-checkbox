import { AuroCheckbox } from './src/auro-checkbox';

/**
 * Register Custom Element.
 * @param {Object} name - Name to use for custom element.
 * @returns {void}
 */
 const registerComponent = (name = 'custom-checkbox') => {
  // alias definition
  if (!customElements.get(name)) {
    customElements.define(name, class extends AuroCheckbox {});
  }
}

export { registerComponent }
