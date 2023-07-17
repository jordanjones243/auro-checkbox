// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines */

/**
 * The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.
 *
 * @attr {String} validity - Specifies the `validityState` this element is in.
 * @attr {String} setCustomValidity - Sets a custom help text message to display for all validityStates.
 * @attr {String} setCustomValidityCustomError - Custom help text message to display when validity = `customError`.
 * @attr {String} setCustomValidityValueMissing - Custom help text message to display when validity = `valueMissing`.
 * @attr {String} error - When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value.
 * @attr {Boolean} noValidate - If set, disables auto-validation on blur.
 * @attr {Boolean} required - Populates the `required` attribute on the element. Used for client-side validation.
 * @attr {Boolean} horizontal - If set, checkboxes will be aligned horizontally.
 */

import { LitElement, html, css } from "lit";
import { classMap } from 'lit/directives/class-map.js';

// Import the processed CSS file into the scope of the component
import styleCss from "./auro-checkbox-group-css.js";

export class AuroCheckboxGroup extends LitElement {
  constructor() {
    super();

    this.validity = undefined;
    this.value = undefined;
    this.disabled = false;
    this.required = false;
    this.horizontal = false;

    /**
     * @private
     */
    this.index = 0;

    /**
     * @private
     */
    this.maxNumber = 3;
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  static get properties() {
    return {
      disabled: {
        type: Boolean,
        reflect: true
      },
      horizontal: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: Array
      },
      noValidate: {
        type: Boolean,
        reflect: true
      },
      required: {
        type: Boolean,
        reflect: true
      },
      error: {
        type: String,
        reflect: true
      },
      setCustomValidity: {
        type: String
      },
      setCustomValidityCustomError: {
        type: String
      },
      setCustomValidityValueMissing: {
        type: String
      },
      validity: {
        type: String,
        reflect: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleItems();
  }

  /**
   * Determines the validity state of the element.
   * @private
   * @returns {void}
   */
  /* eslint-disable max-statements */
  validate() {
    // Validate only if noValidate is not true and the input does not have focus
    if (this.hasAttribute('error')) {
      this.validity = 'customError';
      this.setCustomValidity = this.error;
    } else if (this.value !== undefined && !this.noValidate) {
      this.validity = 'valid';
      this.setCustomValidity = '';

      /**
       * Only validate once we interact with the datepicker
       * this.value === undefined is the initial state pre-interaction.
       *
       * The validityState definitions are located at https://developer.mozilla.org/en-US/docs/Web/API/ValidityState.
       */
      if ((!this.value || this.value.length === 0) && this.required) { // eslint-disable-line no-magic-numbers
        this.validity = 'valueMissing';
        this.setCustomValidity = this.setCustomValidityValueMissing;
      }
    } else {
      this.validity = undefined;
      this.removeAttribute('validity');
    }

    if (this.validity && this.validity !== 'valid') {
      this.isValid = false;

      // Use the validity message override if it is declared
      if (this.ValidityMessageOverride) {
        this.setCustomValidity = this.ValidityMessageOverride;
      }
    } else {
      this.isValid = true;
    }

    if (this.error || (this.validity && this.validity !== 'valid')) { // eslint-disable-line  no-extra-parens
      this.items.forEach((el) => {
        el.setAttribute('error', '');
      });
    } else {
      this.items.forEach((el) => {
        el.removeAttribute('error');
      });
    }
  }
  /* eslint-disable max-statements */

  handleValueUpdate(value, selected) {
    if (selected) {
      // add if it isn't already in the value list
      if (!this.value.includes(value)) {
        this.value.push(value);
      }
    } else if (this.value.indexOf(value) > -1) { // eslint-disable-line no-magic-numbers
      // remove if it is in the value list
      const index = this.value.indexOf(value);

      this.value.splice(index, 1); // eslint-disable-line no-magic-numbers
    }

    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));

    this.validate();
  }

  firstUpdated() {
    // must declare this function as a variable to correctly pass the reference to the removeEventListener
    const checkFocusWithin = function(evt) {
      if (document.auroCheckboxGroupActive && !document.auroCheckboxGroupActive.contains(evt.target)) {
        // if focus has left the group, cleanup and validate
        document.auroCheckboxGroupActive.focusWithin = false;
        window.removeEventListener('focusin', checkFocusWithin);
        document.removeEventListener('click', checkFocusWithin);
        // execute the validation
        document.auroCheckboxGroupActive.validate();
      }
    };

    this.addEventListener('auroCheckbox-focusin', () => {
      if (!this.value) {
        this.value = [];
      }

      // handle click outside the group
      if (!this.focusWithin) {
        document.addEventListener('click', checkFocusWithin);
      }

      this.focusWithin = true;
    });

    this.addEventListener('auroCheckbox-focusout', () => {
      document.auroCheckboxGroupActive = this;

      // Only add the focusWithin check event listener once as you move focus through the options
      if (this.focusWithin) {
        window.addEventListener('focusin', checkFocusWithin);
      } else {
        this.focusWithin = true;
      }
    });

    this.addEventListener('auroCheckbox-input', (evt) => {
      this.handleValueUpdate(evt.target.value, evt.target.checked);
    });
  }

  handlePreselectedItems() {
    let preSelectedValues = false;

    this.items.forEach((item) => {
      if (item.hasAttribute('checked') && this.value === undefined) {
        preSelectedValues = true;
      }
    });

    if (preSelectedValues) {
      if (!this.value) {
        this.value = [];
      }

      this.items.forEach((item) => {
        this.handleValueUpdate(item.getAttribute('value'), Boolean(item.hasAttribute('checked')));
      });
    }
  }

  handleItems() {
    this.items = Array.from(this.querySelectorAll('auro-checkbox'));

    this.handlePreselectedItems();

    if (this.disabled) {
      this.items.forEach((el) => {
        el.disabled = Boolean(this.disabled);
      });
    }

    this.validate();
  }

  /**
   * LitElement lifecycle method. Called after the DOM has been updated.
   * @param {Map<string, any>} changedProperties - Keys are the names of changed properties, values are the corresponding previous values.
   * @returns {void}
   */
  updated(changedProperties) {
    if (this.disabled && changedProperties.has('disabled')) {
      this.items.forEach((el) => {
        el.disabled = this.disabled;
      });
    }

    if (changedProperties.has('required')) {
      this.items.forEach((el) => {
        el.required = this.required;
      });
    }

    if (changedProperties.has('error')) {
      this.validate();
    }
  }

  render() {
    const groupClasses = {
      'displayFlex': this.horizontal && this.items.length <= this.maxNumber
    };

    return html`
      <fieldset class="${classMap(groupClasses)}">
        ${this.required
          ? html`<legend><slot name="legend"></slot></legend>`
          : html`<legend><slot name="legend"></slot> (optional)</legend>`
        }
        <slot @slotchange=${this.handleItems}></slot>
      </fieldset>

      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <p class="checkboxGroupElement-helpText" part="helpText">
            <slot name="helpText"></slot>
          </p>`
        : html`
          <p class="checkboxGroupElement-helpText" role="alert" aria-live="assertive" part="helpText">
            ${this.setCustomValidity}
          </p>`
      }
    `;
  }
}

// default internal definition
if (!customElements.get("auro-checkbox-group")) {
  customElements.define("auro-checkbox-group", AuroCheckboxGroup);
}
