import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  visible: false,
  value: null,

  errorMessage: null,
  validationMessages: null,

  init () {
    this._super (...arguments);

    this.set ('validationMessages', {
      valueMissing: 'You must provide a value here.',
      rangeUnderflow: 'This number is too small!',
      rangeOverflow: 'This number is too big!'
    })
  },

  type: computed ('visible', function () {
    return this.visible ? 'text' : 'password';
  }),

  icon: computed ('visible', function () {
    return this.visible ? 'visibility' : 'visibility_off';
  }),

  actions: {
    toggleVisibility () {
      this.toggleProperty ('visible');
    },

    setErrorMessage () {
      this.set ('errorMessage', 'This is a custom error message.')
    },

    clearErrorMessage () {
      this.set ('errorMessage');
    }
  }
});
