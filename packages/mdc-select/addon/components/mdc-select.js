/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { tracked } from '@glimmer/tracking';

import { A } from '@ember/array';
import { isEmpty, isPresent, isNone } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { action, get } from '@ember/object';
import { isObjectLike } from 'lodash-es';

const { MDCSelect } = mdc.select;

function noOp () { }

export default class MdcSelectComponent extends Component {
  _input;

  doPrepareElement (element) {
    const { value: option } = this.args;

    this.labelId = guidFor (this);
    this.helperId = `${guidFor (this)}__helper-text`;

    if (isPresent (option)) {
      // We need to pre-select the option.
      let value = this.valueOf (option);
      let text = this.textOf (option);

      if (isPresent (value) && isPresent (text)) {
        const listItem = element.querySelector (`.mdc-list-item[data-value="${value}"]`);

        if (isPresent (listItem)) {
          listItem.classList.add ('mdc-list-item--selected');
        }

        const textElement = element.querySelector ('.mdc-select__selected-text');
        textElement.value = text;
      }
    }
  }

  doCreateComponent (element) {
    return new MDCSelect (element);
  }

  doInitComponent (component) {
    const { required = false, value: initial } = this.args;
    component.required = required;

    const value = this.valueOf (initial);

    if (isPresent (value) && this.isOutlined) {
      // We also need to notch the selection since the initial state of text select
      // component has the text over the initial selection.


      const notchedOutline = component.root_.querySelector ('.mdc-notched-outline');
      notchedOutline.classList.add ('mdc-notched-outline--notched');

      if (isPresent (this.args.label)) {
        const floatingLabel = component.root_.querySelector ('.mdc-floating-label');
        floatingLabel.classList.add ('mdc-floating-label--float-above');
      }
    }
  }

  valueOf (option) {
    if (isObjectLike (option)) {
      const value = get (option, this.valueKey);
      return isPresent (value) ? `${value}` : undefined;
    }
    else {
      return `${option}`;
    }
  }

  textOf (option) {
    if (isObjectLike (option)) {
      return get (option, this.textKey);
    }
    else {
      // We have to assume the string text is a value.
      let value = `${option}`;
      let found = (this.options || []).find (option => this.valueOf (option) === value);

      return isPresent (found) ? get (found, this.textKey) : value;
    }
  }

  get isOutlined () {
    return this.args.style === 'outlined';
  }

  @tracked
  labelId;

  @tracked
  helperId;

  @listener ('MDCSelect:change')
  change (ev) {
    // Notify the client the value has changed.
    const { detail: { value } } = ev;

    // Validate the control.
    this._validate ();

    // Pass control to the subclass.
    this.didChange (ev);

    if (isEmpty (value)) {
      // There is no value selected. This means we are clearing the selection.
      (this.args.change || noOp) (null);
    }
    else {
      let selected = this.options.find (option => this.valueOf (option) === value);
      (this.args.change || noOp) (selected);
    }
  }

  didChange (ev) {

  }

  @action
  select (element, [option]) {
    if (isPresent (option)) {
      let value = this.valueOf (option);

      if (this.component.value !== value) {
        this.component.value = value;
      }
    }
    else if (this.component.value !== null) {
      this.component.value = null;
    }

    // Validate the control.
    this._validate ();
  }

  _validate () {
    if (this.component.valid) {
      this.validationMessage = null;
    }
    else {
      if (this.component.required) {
        this.validationMessage = this.requiredMessage;
      }
    }
  }

  get required () {
    return this.args.required;
  }

  get options () {
    return this.args.options || A ();
  }

  get leadingIconClick () {
    return this.args.leadingIconClick || noOp;
  }

  get trailingIconClick () {
    return this.args.trailingIconClick || noOp;
  }

  @tracked
  validationMessage;

  get helperLine () {
    return isPresent (this.helperText);
  }

  get helperText () {
    let { errorMessage, helperText } = this.args;
    return errorMessage || this.validationMessage || helperText;
  }

  get persistentHelperText () {
    let { persistentHelperText, errorMessage } = this.args;
    return isPresent (errorMessage) || isPresent (this.validationMessage) || persistentHelperText;
  }

  get requiredMessage () {
    return this.args.requiredMessage || 'This field is required.';
  }

  /// Adapter attributes

  get valueKey () {
    return this.args.valueKey || 'value';
  }

  get textKey () {
    return this.args.textKey || 'text';
  }

  get disabledKey () {
    return this.args.disabledKey || 'disabled';
  }
}
