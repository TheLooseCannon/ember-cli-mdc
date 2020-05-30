/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/select', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-floating-label', target: '^1.0.0'},
    {name: 'ember-cli-mdc-line-ripple', target: '^1.0.0'},
    {name: 'ember-cli-mdc-notched-outline', target: '^1.0.0'},
    {name: 'ember-cli-mdc-ripple', target: '^1.0.0'},
    {name: 'ember-cli-mdc-rtl', target: '^1.0.0'},
    {name: 'ember-cli-mdc-typography', target: '^1.0.0'}
  ]
});
