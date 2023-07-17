// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// Import touch detection lib
import styleCss from "./auro-checkbox-css.js";
import checkLg from '../node_modules/@alaskaairux/icons/dist/icons/interface/check-lg_es6.js';

/**
 * The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.
 *
 * @attr {Boolean} checked - If set to true, the checkbox will be filled with a checkmark.
 * @attr {Boolean} disabled - If set to true, the checkbox will be unclickable.
 * @attr {Boolean} required - Populates the `required` attribute on the checkbox. Used for client-side validation.
 * @attr {Boolean} error - If set to true, sets an error state on the checkbox.
 * @attr {String} id - Sets the individual `id` per element.
 * @attr {String} name - Accepts any string, `DOMString` representing the value of the input.
 * @attr {String} value - Sets the element's input value.
 * @csspart checkbox - apply css to a specific checkbox.
 * @csspart checkbox-input - apply css to a specifix checkbox's input.
 * @csspart checkbox-label - apply css to a specifix checkbox's label.
 */

// build the component class
export class AuroCheckbox extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.required = false;
    this.error = false;
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  // function to define props used within the scope of thie component
  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      required: {
        type: Boolean,
        reflect: true
      },
      error: {
        type: Boolean,
        reflect: true
      },
      id:       { type: String },
      name:     { type: String },
      value:    { type: String }
    };
  }

  // This custom event is only for the purpose of supporting IE
  // .addEventListener('change', function() { })
  handleChange(event) {
    this.checked = event.target.checked;
    const customEvent = new CustomEvent(event.type, event);

    this.dispatchEvent(customEvent);
  }

  handleInput(event) {
    this.checked = event.target.checked;

    this.dispatchEvent(new CustomEvent('auroCheckbox-input', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  invalid(error) {
    if (error) {
      return 'true';
    }

    return 'false';
  }

  isRequired(required) {
    if (required) {
      return 'true';
    }

    return 'false';
  }

  /**
   * Function to support @focusin event.
   * @private
   * @returns {void}
   */
  handleFocusin() {
    this.dispatchEvent(new CustomEvent('auroCheckbox-focusin', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  /**
   * Function to generate checkmark svg.
   * @private
   * @returns {void}
   */
  generateIconHtml() {
    this.dom = new DOMParser().parseFromString(checkLg.svg, 'text/html');
    this.svg = this.dom.body.firstChild;

    this.svg.classList.add('svg--cbx');

    return this.svg;
  }

  firstUpdated() {
    this.addEventListener('click', () => {
      this.handleFocusin();
    });

    this.addEventListener('focusin', () => {
      this.handleFocusin();
    });

    this.addEventListener('focusout', () => {
      this.dispatchEvent(new CustomEvent('auroCheckbox-focusout', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    });
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const labelClasses = {
      'label': true,
      'label--cbx': true,
      'errorBorder': this.error
    };

    return html`
      <div class="cbxGroup" part="checkbox">
        <input
          class="util_displayHiddenVisually cbx--input"
          part="checkbox-input"
          @change=${this.handleChange}
          @input="${this.handleInput}"
          ?disabled="${this.disabled}"
          aria-invalid="${this.invalid(this.error)}"
          aria-required="${this.isRequired(this.required)}"
          .checked="${this.checked}"
          id="${ifDefined(this.id)}"
          name="${ifDefined(this.name)}"
          type="checkbox"
          .value="${this.value}"
        />

        <label for="${ifDefined(this.id)}" class="${classMap(labelClasses)}" part="checkbox-label">
          ${this.checked ? this.generateIconHtml() : undefined}
          <slot></slot>
        </label>
      </div>
    `;
  }
}

// default internal definition
if (!customElements.get("auro-checkbox")) {
  customElements.define("auro-checkbox", AuroCheckbox);
}
