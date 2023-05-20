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
  const category = $.get(consts.new_category_id)?.value || 'others'
  const title = $.get(consts.new_title_id)?.value
  const url = $.get(consts.new_url_id)?.value
  const icon = $.get(consts.new_icon_id)?.value || null
  const icon_url = $.get(consts.new_icon_url_id)?.value || null

  if (title && url) storage.add(category, title, url, icon, icon_url)
  $.get(consts.new_pin_block_id)?.remove()
  // renderPins(storage.load())
}

const createNewPinForm = () => {
  document.body.appendChild(tpl.newPin())
  $.click(consts.new_pin_save_id, savePin)
  $.click(consts.new_pin_cancel_id, () =>
    $.get(consts.new_pin_block_id)?.remove()
  )
}
