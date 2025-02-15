/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/list', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-ripple', target },
    {name: 'ember-cli-mdc-rtl', target },
    {name: 'ember-cli-mdc-typography', target },
    {name: 'ember-cli-mdc-icon', target },
    {name: '@ember/render-modifiers', target: '^1.0.0' }
  ]
});
