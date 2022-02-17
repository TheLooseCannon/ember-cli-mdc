/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/ripple', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-destroyable-polyfill'},
    {name: 'ember-cli-mdc-animation', target },
    {name: 'ember-cli-mdc-base', target },
    {name: 'ember-cli-mdc-theme', target }
  ]
});
