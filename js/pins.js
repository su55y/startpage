'use strict'
/* global tpl  */ // template.js

/* exported
  renderPins
*/

const renderPins = (pins) => {
  const pinsDiv = document.getElementById('pins')
  if (!pins || !pinsDiv) return
  pinsDiv.innerHTML = ''
  pins.forEach((pin) => {
    const pinElm = tpl.pin(pin)
    pinElm && pinsDiv.appendChild(pinElm)
  })
}
