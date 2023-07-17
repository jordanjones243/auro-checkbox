/* eslint-disable max-statements */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

import '../index.js';

describe('auro-checkbox-group', () => {
  it('has the expected properties', async () => {
    const expectedError = "Expected error message";

    const el = await fixture(html`
      <auro-checkbox-group
        horizontal
        required
        error=${expectedError}
      >Checkbox option</auro-checkbox-group>
    `);

    const root = el.shadowRoot;
    const error = root.querySelector('p');

    expect(el.horizontal).to.be.true;
    expect(el.required).to.be.true;
    expect(error.textContent).to.contain(expectedError);

    expect(el).dom.to.equal(`
    <auro-checkbox-group horizontal required error="${expectedError}" validity="customError">
      Checkbox option
    </auro-checkbox-group>`);
  });

  it('should fire a input event with correct data', async () => {
    const el = await fixture(html`
      <auro-checkbox-group>
        <auro-checkbox
          id="alaska"
          name="states"
          value="alaska"
        ></auro-checkbox>

        <auro-checkbox
          id="washington"
          name="states"
          value="washington"
        ></auro-checkbox>
      </auro-checkbox-group>
    `),
    alaskaCheckbox = el.querySelector("auro-checkbox[id=alaska]"),
    alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

    let result = false;

    el.addEventListener('input', (event) => {
      result = event.target.checked;
    });

    alaskaCheckboxInput.click();

    expect(result).to.be.true;
  });

  it('can uncheck a checkbox after selection', async () => {
    const el = await fixture(html`
      <auro-checkbox
        id="alaska"
        name="states-unchecking"
        value="alaska"
      ></auro-checkbox>
    `),
    alaskaCheckbox = el,
    alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

    alaskaCheckboxInput.click();
    alaskaCheckboxInput.dispatchEvent(new Event('input'));
    await alaskaCheckbox.updateComplete;
    expect(alaskaCheckboxInput.checked).to.be.true;

    alaskaCheckbox.checked = false;
    await alaskaCheckbox.updateComplete;
    expect(alaskaCheckboxInput.checked, 'the shadow input was not unchecked').to.be.false;
  });

  it('can select multiple checkboxes', async () => {
    const el = await fixture(html`
      <auro-checkbox-group>
        <auro-checkbox
          id="alaska"
          name="states"
          value="alaska"
        ></auro-checkbox>

        <auro-checkbox
          id="washington"
          name="states"
          value="washington"
        ></auro-checkbox>
      </auro-checkbox-group>
    `),

     alaskaCheckbox = el.querySelector("auro-checkbox[id=alaska]"),
     alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input'),

     washingtonCheckbox = el.querySelector("auro-checkbox[id=washington]"),
     washingtonCheckboxInput = washingtonCheckbox.shadowRoot.querySelector('input');

    expect(alaskaCheckbox.checked).to.not.be.true;
    expect(washingtonCheckbox.checked).to.not.be.true;

    alaskaCheckboxInput.click();
    washingtonCheckboxInput.click();
    await elementUpdated(el);

    // Selecting the first radio button should make it `checked`
    expect(alaskaCheckbox.checked).to.be.true;
    expect(washingtonCheckbox.checked).to.be.true;
  });

  it('controls child state after slot change', async () => {
    const el = await fixture(html`
      <auro-checkbox-group disabled required error="Test message"></auro-checkbox-group>
    `);

    // render children after the group has connected
    await fixture(html`
      <auro-checkbox
        id="alaska"
        name="states"
        value="alaska"
      ></auro-checkbox>
      <auro-checkbox
        id="washington"
        name="states"
        value="washington"
      ></auro-checkbox>
    `, { parentNode: el });

    const checkbox = el.querySelector('auro-checkbox');

    expect(checkbox.disabled).to.be.true;
    expect(checkbox.error).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture(html`
      <auro-checkbox-group>
        <auro-checkbox
          id="alaska"
          name="states"
          value="alaska"
          checked
        ></auro-checkbox>

        <auro-checkbox
          id="washington"
          name="states"
          type="radio"
          value="washington"
        ></auro-checkbox>
      </auro-checkbox-group>
    `);

    expect(el).to.be.accessible();
  });

  it('updates states on children', async () => {
    const el = await fixture(html`
      <auro-checkbox-group>
        <auro-checkbox
          id="alaska"
          name="states"
          value="alaska"
          checked
        ></auro-checkbox>

        <auro-checkbox
          id="washington"
          name="states"
          type="radio"
          value="washington"
        ></auro-checkbox>
      </auro-checkbox-group>
    `);

    el.disabled = true;
    el.required = true;
    el.error = "This is an error";

    await elementUpdated(el);

    const checkbox = el.querySelector('auro-checkbox');

    expect(checkbox.disabled, "child disabled state was not updated").to.be.true;
    expect(checkbox.required, "child required state was not updated").to.be.true;
    expect(checkbox.error, "child error state was not updated").to.be.true;
  });
});

describe('auro-checkbox', () => {
  it('has the expected properties', async () => {
    const expectedId = "testId",
      expectedName = "testName",
      expectedValue = "testValue";

    const el = await fixture(html`
      <auro-checkbox
        id="${expectedId}"
        name="${expectedName}"
        value="${expectedValue}"
        checked
        disabled
        required
        error
      >Checkbox option</auro-checkbox>
    `);

    const root = el.shadowRoot;
    const input = root.querySelector('input');
    const errorBorder = root.querySelector('.errorBorder');

    expect(input.checked).to.be.true;
    expect(input.disabled).to.be.true;
    expect(input.value).to.equal(expectedValue);
    expect(input.name).to.equal(expectedName);
    expect(input.type).to.equal('checkbox');
    expect(input.getAttribute('aria-invalid')).to.equal('true');
    expect(input.getAttribute('aria-required')).to.equal('true');
    expect(errorBorder).to.not.be.undefined;
    expect(el).dom.to.equal(`
      <auro-checkbox id="${expectedId}" name="${expectedName}" value="${expectedValue}" error checked disabled required>
        Checkbox option
      </auro-checkbox>`);
  });
});
