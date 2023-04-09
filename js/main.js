/* global GRUVBOX_LIGHT GRUVBOX_DARK */ // themes.js
const getHash = () => Math.random().toString(16).slice(2).slice(-8)

const applyTheme = (theme) => {
  for (const [key, val] of Object.entries(theme))
    document.documentElement.style.setProperty(key, val)
}
let iter = 0
let direction = 1
const deg = (n) => ((n % 360) + 360) % 360
const rdeg = () => Math.floor(Math.random() * 360)
window.onload = () => {
  setInterval(() => {
    iter += 15 * direction
    if (iter >= 360 || iter <= 0) direction *= -1
    document.body.style.filter = `hue-rotate(${iter}deg)`
  }, 500)
}
