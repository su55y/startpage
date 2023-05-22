'use strict'
/* global consts */ // consts.js
/* exported
  tpl
*/

const parseTpl = (tpl, obj) => {
  const rawElm = tpl.replace(/\{\{(\w+)\}\}/g, (_, key) => obj[key] || '')
  return new DOMParser().parseFromString(rawElm, 'text/html').body.firstChild
}

const loadTpl = (id, obj = {}) => {
  const tpl = document.getElementById(id)?.innerHTML
  if (tpl) return parseTpl(tpl, obj)
}

const tpl = {
  category: (stor) => loadTpl('category', stor),
  pin: (pin) => loadTpl('pin', pin),
  newPin: () => loadTpl('new-pin', consts),
  editPins: () => loadTpl('edit-pins', consts),
  editPin: (pin) => loadTpl('edit-pin-entry', pin),
  editPinControlsEdit: (pin) => loadTpl('edit-pin-controls-edit', pin),
  editPinControlsIdle: (pin) => loadTpl('edit-pin-controls-idle', pin),
}
