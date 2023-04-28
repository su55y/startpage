'use strict'

/* exported
  storage
*/

const PINS_STORE_KEY = 'sp_pins'

const hash = () =>
  Math.random().toString(16).slice(2).slice(-8) +
  Math.random().toString(16).slice(2).slice(-8)

const newPin = (title, url) => ({
  id: hash(),
  title,
  url,
})

const initStorage = () => {
  window.localStorage.getItem(PINS_STORE_KEY) ||
    window.localStorage.setItem(PINS_STORE_KEY, '[]')
}

const loadPins = () => {
  const raw_pins = window.localStorage.getItem(PINS_STORE_KEY) || '[]'
  return JSON.parse(raw_pins)
}

const updatePins = (pins) => {
  window.localStorage.setItem(PINS_STORE_KEY, JSON.stringify(pins))
}

const addPin = (title, url) => {
  updatePins([...loadPins(), newPin(title, url)])
}

const removePin = (id) => {
  updatePins(loadPins().filter((pin) => pin.id !== id))
}

const storage = {
  load: loadPins,
  add: addPin,
  remove: removePin,
  init: initStorage,
}
