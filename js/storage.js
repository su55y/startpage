'use strict'

/* exported
  hash
  storage
*/

const PINS_STORAGE_KEY = 'sp_pins',
  STYLES_STORAGE_KEY = 'sp_styles'
const DEFAULT_PINS_STORAGE = JSON.stringify({}),
  DEFAULT_STYLES_STORAGE = JSON.stringify({
    background: {
      image: null,
      styles: {},
      classname: null,
    },
    colorscheme: {
      bg: '#282828',
      bg_alt: '#3c3836',
      fg: '#ebdbb2',
      cyan: '#689d6a',
      cyan_alt: '#8ec07c',
      yellow: '#d79921',
      yellow_alt: '#fabd2f',
      red: '#cc241d',
      gray: '#928374',
    },
    custom_theme: {},
  })

const hash = () =>
  Math.random().toString(16).slice(2).slice(-8) +
  Math.random().toString(16).slice(2).slice(-8)

const init = () => {
  window.localStorage.getItem(PINS_STORAGE_KEY) ||
    window.localStorage.setItem(PINS_STORAGE_KEY, DEFAULT_PINS_STORAGE)
}

const load = () =>
  JSON.parse(
    window.localStorage.getItem(PINS_STORAGE_KEY) || DEFAULT_PINS_STORAGE
  )

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

const loadStyles = () =>
  JSON.parse(
    window.localStorage.getItem(STYLES_STORAGE_KEY) || DEFAULT_STYLES_STORAGE
  )

const megreStyles = (newStyles = {}) => {
  const oldStyles = JSON.parse(
    window.localStorage.getItem(STYLES_STORAGE_KEY) || DEFAULT_STYLES_STORAGE
  )
  window.localStorage.setItem(JSON.stringify({ ...oldStyles, ...newStyles }))
}

const storage = {
  add,
  init,
  list: collectToArray,
  load,
  remove,
  update,
  loadStyles,
  megreStyles,
}
