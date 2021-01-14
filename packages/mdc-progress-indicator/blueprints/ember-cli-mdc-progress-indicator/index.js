/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/progress-indicator', target: '^6.0.0'}
  ],

  addons: [
    { name: 'ember-cli-mdc-base', target: `^${version}` },
    { name: '@ember/render-modifiers' }
  ]
});