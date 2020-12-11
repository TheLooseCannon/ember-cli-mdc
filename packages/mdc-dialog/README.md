ember-cli-mdc-dialog
======================

ember-cli addon for [`@material/dialog`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------

    ember install ember-cli-mdc-dialog

Components
-----------

This package contains the following top-level components.

* [`{{mdc-dialog}}`](#mdc-dialog)

mdc-dialog
---------------------

### Description

Adds a dialog to the document.

### Usage

```handlebars
{{#mdc-dialog title="Use Google's location service?"
              show=[true|false]
              scrollable=[true|false]
              stackButtons=[true|false]
              positiveButton=(hash action="accept" label="Accept" default=[true|false] closed=(action "accept") closing=(action "accepting"))
              negativeButton=(hash action="close" label="Decline" default=[true|false] closed=(action "close") closing=(action "closing"))}}
  Let Google help apps determine location. This means sending anonymous
  location data to Google, even when no apps are running.
{{/mdc-dialog}}
```

### Attributes

* `title` - Optional title for the dialog.
* `show` - Show the dialog.
* `scrollable` - Optional mark the dialog content as scrollable.
* `stackButtons` - Stack the dialog buttons; default=`false`
* `positiveButton` - Positive button definition. No positive button if left off the table.
* `negativeButton` - Negative button definition. No negative button if left off the table.

### Button attributes

* `action` - Name of action
* `label` - Dialog button label
* `default` - Make the default action
* `closed` - Action triggered when dialog has closed
* `closing` - Action triggered when dialog is closing, but has not started the close sequence
