'use strict'

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
  pin: (pin) => loadTpl('pin', pin),
  newPin: () => loadTpl('new-pin'),
  editPins: () => loadTpl('edit-pins'),
  editPin: (pin) => loadTpl('edit-pin-entry', pin),
  editPinControls: (pin, state = 'idle') => {
    switch (state) {
      case 'edit':
        return loadTpl('edit-pin-controls-edit', pin)
      default:
        return loadTpl('edit-pin-controls-idle', pin)
    }
  },
}
