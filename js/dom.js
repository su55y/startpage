'use strict'
/* exported
  $
*/
const $ = {
  get: (id) => document.getElementById(id),
  click: (id, cb) => document.getElementById(id)?.addEventListener('click', cb),
}
