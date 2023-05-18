'use strict'
/* global tpl  */ // template.js

/* exported
  renderPins
*/

const chooseIcon = ({ icon, icon_url }) => {
  if (icon) return icon
  if (icon_url) return `<img src="${icon_url}" class="icon_img" />`
  return ''
}
const renderPins = (pins) => {
  const pinsDiv = document.getElementById('pins')
  if (!pins || !pinsDiv) return
  pinsDiv.innerHTML = ''
  pins.forEach((pin) => {
    pin.icon = chooseIcon(pin)
    const pinElm = tpl.pin(pin)
    pinElm && pinsDiv.appendChild(pinElm)
  })
}
