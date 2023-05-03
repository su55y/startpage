'use strict'
/* global $ */ // dom.js
/* global renderPins */ // pins.js
/* global tpl */ // template.js
/* global storage */ // storage.js

/* exported
  createNewPinForm
*/

const savePin = () => {
  const title = $.get('new-title')?.value
  const url = $.get('new-url')?.value
  if (title && url) storage.add(title, url)
  $.get('new-pin-block')?.remove()
  renderPins(loadPins())
}

const createNewPinForm = () => {
  const formElm = tpl.newPin()
  if (formElm) {
    document.body.appendChild(formElm)
    $.click('new-save', savePin)
    $.click('new-cancel', () => formElm.remove())
  }
}
