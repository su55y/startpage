/* global storage */ // storage.js
/* global renderPins */ // pins.js
/* global createEditForm */ // edit.js
/* global createNewPinForm */ // new-pin.js
/* global $ */ // dom.js
/* global consts */ // consts.js

const setupFormButtons = () => {
  $.click('add', createNewPinForm)
  $.click('edit', createEditForm)
}

const handleEscape = (e) => {
  if (e?.key !== 'Escape') return
  $.get(consts.new_pin_block_id)?.remove()
  $.get(consts.edit_pins_block_id)?.remove()
}

window.onload = () => {
  storage.init()
  // renderPins(storage.load())
  setupFormButtons()
  document.body.addEventListener('keyup', handleEscape)
}
