'use strict'

/* exported
  hash
  storage
*/

const PINS_STORAGE_KEY = 'sp_pins'
const DEFAULT_STORAGE = JSON.stringify({})

const hash = () =>
  Math.random().toString(16).slice(2).slice(-8) +
  Math.random().toString(16).slice(2).slice(-8)

const init = () => {
  window.localStorage.getItem(PINS_STORAGE_KEY) ||
    window.localStorage.setItem(PINS_STORAGE_KEY, DEFAULT_STORAGE)
}

const load = () =>
  JSON.parse(window.localStorage.getItem(PINS_STORAGE_KEY) || DEFAULT_STORAGE)

const updateStorage = (pins) =>
  window.localStorage.setItem(PINS_STORAGE_KEY, JSON.stringify(pins))

const add = (category, title, url, icon, icon_url) => {
  const pins = load()
  const newPin = { id: hash(), title, url, icon, icon_url }
  pins[category] = pins[category] ? [...pins[category], newPin] : [newPin]
  updateStorage(pins)
}

const collectToArray = () => {
  const stor = load(),
    pins = []
  Object.keys(stor).map((category) => {
    pins.push(...stor[category].map((pin) => ({ ...pin, category })))
  })
  return pins
}

const collectToObject = (pins) => {
  const stor = {}
  pins.map((pin) => {
    const category = pin.category
    delete pin.category
    stor[category] = stor[category] ? [...stor[category], pin] : [pin]
  })
  return stor
}

const update = (newPin, category) => {
  updateStorage(
    collectToObject(
      collectToArray().map((pin) => {
        if (pin.id === newPin.id) {
          return { ...newPin, category }
        }
        return pin
      })
    )
  )
}

const remove = (id) => {
  updateStorage(
    collectToObject(collectToArray().filter((pin) => pin.id !== id))
  )
}

const storage = {
  add,
  init,
  list: collectToArray,
  load,
  remove,
  update,
}
