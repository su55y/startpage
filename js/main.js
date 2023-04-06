STOR_SITES_KEY = 'sp_sites'
const defaultSites = () => [
  /*{ title: 'TITLE', url: 'URL' }*/
]

const loadSites = () => {
  if ((dict = window.localStorage.getItem(STOR_SITES_KEY)))
    return JSON.parse(dict)
  return defaultSites()
}
const updateSites = (sites) => {
  window.localStorage.setItem(STOR_SITES_KEY, JSON.stringify(sites))
}
const tplPin = (index, { title, url }) => {
  const div = document.createElement('div')
  div.dataset.id = index
  div.innerHTML = `<a href="${url}"><div>${title}</div></a>`
  return div
}
const fillSites = (sites) => {
  const sitesDiv = document.createElement('div')
  sites.map((site, index) => sitesDiv.appendChild(tplPin(index, site)))
  document.getElementById('sites').innerHTML = sitesDiv.innerHTML
}
const initStartPage = () => {
  fillSites(loadSites())
}
window.onload = () => {
  initStartPage()
}
