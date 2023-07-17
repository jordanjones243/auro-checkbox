<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../api.md) -->
<!-- The below content is automatically added from ./../api.md -->

# auro-checkbox

The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| [checked](#checked)  | `checked`  | `Boolean` | false   | If set to true, the checkbox will be filled with a checkmark. |
| [disabled](#disabled) | `disabled` | `Boolean` | false   | If set to true, the checkbox will be unclickable. |
| [error](#error)    | `error`    | `Boolean` | false   | If set to true, sets an error state on the checkbox. |
| [id](#id)       | `id`       | `String`  |         | Sets the individual `id` per element.            |
| [name](#name)     | `name`     | `String`  |         | Accepts any string, `DOMString` representing the value of the input. |
| [required](#required) | `required` | `Boolean` | false   | Populates the `required` attribute on the checkbox. Used for client-side validation. |
| [value](#value)    | `value`    | `String`  |         | Sets the element's input value.                  |

## Methods

| Method         | Type                                 |
|----------------|--------------------------------------|
| [handleChange](#handleChange) | `(event: any): void`                 |
| [handleInput](#handleInput)  | `(event: any): void`                 |
| [invalid](#invalid)      | `(error: any): "true" \| "false"`    |
| [isRequired](#isRequired)   | `(required: any): "true" \| "false"` |

## Events

| Event                   | Type               |
|-------------------------|--------------------|
| `auroCheckbox-focusin`  | `CustomEvent<any>` |
| `auroCheckbox-focusout` | `CustomEvent<any>` |
| `auroCheckbox-input`    | `CustomEvent<any>` |

## CSS Shadow Parts

| Part             | Description                               |
|------------------|-------------------------------------------|
| [checkbox](#checkbox)       | apply css to a specific checkbox.         |
| `checkbox-input` | apply css to a specifix checkbox's input. |
| `checkbox-label` | apply css to a specifix checkbox's label. |
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Basic

<div class="twoColDemoRow">
  <div>
    <div class="exampleWrapper">
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/basic.html) -->
      <!-- The below content is automatically added from ./../../apiExamples/basic.html -->
      <auro-checkbox-group>
        <span slot="legend">Form label goes here</span>
        <auro-checkbox value="checkbox option" name="example1" id="checkbox-basic1">Checkbox option</auro-checkbox>
        <auro-checkbox value="checkbox option" name="example2" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
        <auro-checkbox value="checkbox option" name="example3" id="checkbox-basic3">Checkbox option</auro-checkbox>
        <auro-checkbox value="checkbox option" name="example4" id="checkbox-basic4">Checkbox option</auro-checkbox>
      </auro-checkbox-group>
      <!-- AURO-GENERATED-CONTENT:END -->
    </div>
<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/basic.html -->

```html
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="checkbox option" name="example1" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox option" name="example2" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox option" name="example3" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox option" name="example4" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to disable individual `<auro-checkbox>` elements or the entire `<auro-checkbox-group>`.

#### Disabled Group

The `disabled` attribute used to disable the entire `<auro-checkbox-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/disabledGroup.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/disabledGroup.html -->
  <auro-checkbox-group disabled>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/disabledGroup.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/disabledGroup.html -->

```html
<auro-checkbox-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Disabled Checkbox within Group

The `disabled` attribute used to disable a single `<auro-checkbox>` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/disabled.html -->
  <auro-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabled1">Checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
    <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/disabled.html -->

```html
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled checkbox option" name="example1" id="checkbox-disabled1">Checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example2" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example3" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled checkbox option" name="example4" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

Use the `error` attribute to force an error state on the element.

#### Checkbox Group with Error

The `error` attribute used to set error state on the entire `<auro-checkbox-group>`. If using the `error` attribute on an `<auro-checkbox-group>`, a string with the error message needs to be passed along with the attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/errorGroup.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/errorGroup.html -->
  <auro-checkbox-group error="custom error">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="error checkbox option" name="example1" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error checkbox option" name="example2" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error checkbox option" name="example3" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
    <auro-checkbox value="error checkbox option" name="example4" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/errorGroup.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/errorGroup.html -->

```html
<auro-checkbox-group error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="error checkbox option" name="example1" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error checkbox option" name="example2" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error checkbox option" name="example3" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error checkbox option" name="example4" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Checkbox with Error Outside of Group

The `error` attribute used to set an error state on a single `<auro-checkbox>` element.

**Note**: Error messages are not supported outside of an `<auro-checkbox-group>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/error.html -->
  <auro-checkbox value="error checkbox option" name="example3" id="checkbox-error1" error>Error checkbox option</auro-checkbox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/error.html -->

```html
<auro-checkbox value="error checkbox option" name="example3" id="checkbox-error1" error>Error checkbox option</auro-checkbox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Required

When present, the `required` attribute specifies that at least one or more `<auro-checkbox>` elements within the `<auro-checkbox-group>` must be checked.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/required.html -->
  <auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
    <span slot="legend">Form label goes here</span>
    <auro-checkbox value="checked option" name="example1" id="checkbox-required1">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox Option" name="example2" id="checkbox-required2">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox Option" name="example3" id="checkbox-required3">Checkbox option</auro-checkbox>
    <auro-checkbox value="checkbox Option" name="example4" id="checkbox-required4">Checkbox option</auro-checkbox>
  </auro-checkbox-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/required.html -->

```html
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="checked option" name="example1" id="checkbox-required1">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox Option" name="example2" id="checkbox-required2">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox Option" name="example3" id="checkbox-required3">Checkbox option</auro-checkbox>
  <auro-checkbox value="checkbox Option" name="example4" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
