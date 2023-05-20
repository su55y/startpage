'use strict'
/* global tpl  */ // template.js

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

const renderPins = (pins) => {
  const pinsDiv = document.getElementById('pins')
  if (!pins || !pinsDiv) return
  pinsDiv.innerHTML = ''
  pins.forEach((pin) => {
    pin.icon = chooseIcon(pin)
    if (!pin.title && !pin.icon) pin.title = grepDomain(pin)
    const pinElm = tpl.pin(pin)
    pinElm && pinsDiv.appendChild(pinElm)
  })
}
