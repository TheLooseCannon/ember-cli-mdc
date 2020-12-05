/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-snackbar';

import { isPresent } from '@ember/utils';
import { alias, or } from '@ember/object/computed';

const MDCSnackbar = mdc.snackbar.MDCSnackbar;

export default Component.extend({
  layout,

  classNames: ['mdc-snackbar'],

  classNameBindings: ['stacked:mdc-snackbar--stacked', 'leading:mdc-snackbar--leading'],

  /// Message to show in the snackbar. Setting the message will show
  /// the snackbar to the user.
  message: null,

  label: alias ('message'),

  stacked: false,

  leading: false,

  /// Timeout value for the snackbar.
  timeout: 5000,

  /// Close the snackbar when ESC pressed.
  closeOnEscape: true,

  /// Reference to the MDC instance.
  _snackbar: null,

  _didOpenListener: null,
  _didCloseListener: null,

  dismissIcon: 'close',

  actions: or ('action', 'dismissible'),

  _currMessage: null,

  init () {
    this._super (...arguments);

    this._didOpenListener = this.didOpen.bind (this);
    this._didCloseListener = this.didClose.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);
    this._createComponent ();
  },

  didUpdate () {
    this._super (...arguments);
    this._createComponent ();
  },

  didRender () {
    this._super (...arguments);

    // We are always going to recreate the component just in case the structure of
    // the component has changed.

    const message = this.message;

    if (isPresent (message) && this._currMessage !== message) {
      this.show ();
    }
    else {
      this._currMessage = null;
    }
  },

  _createComponent () {
    this._snackbar = new MDCSnackbar (this.element);
    this._snackbar.listen ('MDCSnackbar:opened', this._didOpenListener);
    this._snackbar.listen ('MDCSnackbar:closed', this._didCloseListener);
  },

  _destroyComponent () {
    this._snackbar.unlisten ('MDCSnackbar:opened', this._didOpenListener);
    this._snackbar.unlisten ('MDCSnackbar:closed', this._didCloseListener);
    this._snackbar.destroy ();
  },

  willDestroyElement () {
    this._super (...arguments);
    this._destroyComponent ();
  },

  show () {
    const {
      timeout,
      closeOnEscape,
      message,
      action
    } = this;

    const { text: actionButtonText } = (action || {});

    // Cache the current message so we do not show it again if the component updates
    // before the snackbar closes.
    this._currMessage = message;

    this._snackbar.closeOnEscape = closeOnEscape;
    this._snackbar.timeoutMs = timeout;
    this._snackbar.labelText = message;

    if (isPresent (actionButtonText)) {
      this._snackbar.actionButtonText = actionButtonText;
    }

    this._snackbar.open ();
  },

  /**
   * The snackbar is showing to the user.
   */
  didOpen () {

  },

  /**
   * The snackbar is hidden from the user.
   */
  didClose () {
    // Erase the message so we can show the snackbar again.
    this.set ('message');
  }
});
