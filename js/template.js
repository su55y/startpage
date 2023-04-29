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
  pin: (obj) => loadTpl('pin', obj),
  editPin: (obj) => loadTpl('new-pin', obj),
}
