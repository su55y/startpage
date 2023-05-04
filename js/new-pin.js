'use strict'
/* global $ */ // dom.js
/* global renderPins */ // pins.js
/* global tpl */ // template.js
/* global storage */ // storage.js
/* global consts */ // consts.js

/* exported
  createNewPinForm
*/

const savePin = () => {
  const title = $.get(consts.new_title_id)?.value
  const url = $.get(consts.new_url_id)?.value
  if (title && url) storage.add(title, url)
  $.get(consts.new_pin_block_id)?.remove()
  renderPins(loadPins())
}

const createNewPinForm = () => {
  document.body.appendChild(tpl.newPin())
  $.click(consts.new_pin_save_id, savePin)
  $.click(consts.new_pin_cancel_id, () => formElm.remove())
}
