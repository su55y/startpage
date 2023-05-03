/* global storage */ // storage.js
/* global renderPins */ // pins.js
/* global createEditForm */ // edit.js
/* global createNewPinForm */ // new-pin.js
/* global $ */ // dom.js

const setupFormButtons = () => {
  $.click('add', createNewPinForm)
  $.click('edit', createEditForm)
}

window.onload = () => {
  storage.init()
  renderPins(storage.load())
  setupFormButtons()
}
