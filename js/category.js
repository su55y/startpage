'use strict'
/* global $ */ // dom.js
/* global tpl  */ // template.js
/* global storage hash */ // storage.js
/* global consts */ // consts.js

/* exported
  dropdownIds
  handleDropdownOpen
*/

const categories = () => Object.keys(storage.load())

const dropdownIds = (id) => ({
  category_id: id ? `category${id}` : consts.category_id,
  dd_block_id: id ? `dd_block${id}` : consts.dd_block_id,
  dd_list_id: id ? `dd_list${id}` : consts.dd_list_id,
})

const removeDropdown = (id) => {
  const { category_id, dd_list_id } = dropdownIds(id)
  const input = $.get(category_id)
  if (input) input.dataset.active = false
  $.get(dd_list_id)?.remove()
}

const handleBlur = (id) => () => {
  setTimeout(() => {
    removeDropdown(id)
  }, 150)
}

const handleDropdownOpen = (id = null) => {
  const { category_id, dd_block_id, dd_list_id } = dropdownIds(id)
  const input = $.get(category_id)
  if (!input || input.dataset?.active !== 'false') return
  input.dataset.active = true
  const list = tpl.dd_list({ dd_list_id })
  categories().forEach((category) => {
    const item = tpl.dd_item({ id, category })
    item.addEventListener('click', () => {
      input.removeEventListener('click', handleBlur(id))
      input.value = category
      removeDropdown(id)
    })
    list.appendChild(item)
  })
  $.get(dd_block_id).appendChild(list)
  input.focus()
  input.addEventListener('blur', handleBlur(id))
}
