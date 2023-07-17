import { AuroCheckbox } from './src/auro-checkbox';
import { AuroCheckboxGroup } from './src/auro-checkbox-group';

/**
 * Register Custom Element.
 * @param {Object} name - Name to use for custom element.
 * @returns {void}
 */
 const registerComponent = (name = 'custom-checkbox') => {
  const groupName = name + '-group';
  
  // alias definition
  if (!customElements.get(name)) {
    customElements.define(name, class extends AuroCheckbox {});
  }

  if (!customElements.get(groupName)) {
    customElements.define(groupName, class extends AuroCheckboxGroup {});
  }
}

export { registerComponent }
