'use strict'
/* global $ */ // dom.js
/* global tpl  */ // template.js
/* global hash */ // storage.js

/* exported
  renderPins
*/
const rxDomain =
  /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+\.[^:\/\n?]+)/im
const grepDomain = ({ url }) => url.match(rxDomain)[1] || url

const chooseIcon = ({ title, url, icon, icon_url }) => {
  if (icon) return icon
  if (icon_url)
    return `<img src="${icon_url}" class="icon_img" title="${title || url}" />`
  return ''
}

const fetchCategories = (pins) => {
  const categories = []
  pins.forEach((pin) => {
    if (pin.category && !categories.includes(pin.category))
      categories.push(pin.category)
  })
  return categories
}

const renderPins = (stor) => {
  const pinsDiv = document.getElementById('pins') // placeholder
  if (!stor || !pinsDiv) return
  pinsDiv.innerHTML = ''
  for (const [category, pins] of Object.entries(stor)) {
    const category_id = hash()
    pinsDiv.appendChild(tpl.category({ category_id, title: category }))
    pins.forEach((pin) => {
      pin.icon = chooseIcon(pin)
      if (!pin.title && !pin.icon) pin.title = grepDomain(pin)
      $.get(category_id)?.appendChild(tpl.pin(pin))
    })
  }
}
