'use strict'
/* global storage */ // storage.js
/* global tpl  */ // template.js
/* renderPins */ // pins.js
/* $ */ // dom.js
/* consts */ // consts.js
/* global dropdownIds handleDropdownOpen */ // category.js

/* exported
  createEditForm
*/

const EditAction = {
  Edit: '0',
  Delete: '1',
  Cancel: '2',
  Update: '3',
}

const ID = {
  entry_id: ({ id }) => `entry${id}`,
  title_id: ({ id }) => `title${id}`,
  url_id: ({ id }) => `url${id}`,
  category_id: ({ id }) => `category${id}`,
  icon_id: ({ id }) => `icon${id}`,
  icon_url_id: ({ id }) => `icon_url_id${id}`,
  controls_id: ({ id }) => `controls${id}`,
  edit_id: ({ id }) => `edit${id}`,
  confirm_id: ({ id }) => `confirm${id}`,
  cancel_id: ({ id }) => `cancel${id}`,
  delete_id: ({ id }) => `delete${id}`,
}

const editables = [
  ID.title_id,
  ID.url_id,
  ID.category_id,
  ID.icon_id,
  ID.icon_url_id,
]

const parseIds = (pin) =>
  Object.entries(ID).reduce((ids, [k, v]) => ({ ...ids, [k]: v(pin) }), {})

const applyAction = (pin, editAction, entry, confirmAction) => {
  switch (editAction) {
    case EditAction.Edit:
    case EditAction.Delete:
      entry.appendChild(
        tpl.editPinControlsEdit({
          ...pin,
          ...parseIds(pin),
          confirm_action: editAction,
        })
      )
      editables.forEach(
        (input_id) =>
          ($.get(input_id(pin)).disabled = editAction !== EditAction.Edit)
      )
      $.click(ID.category_id(pin), () => handleDropdownOpen(pin.id))
      $.click(ID.confirm_id(pin), () => setEditState(pin, EditAction.Update))
      $.click(ID.cancel_id(pin), () => setEditState(pin, EditAction.Cancel))

      break
    case EditAction.Update:
      switch (confirmAction) {
        case EditAction.Edit:
          const title = $.get(ID.title_id(pin)).value || ''
          const url = $.get(ID.url_id(pin)).value || pin.url
          const category =
            $.get(ID.category_id(pin)).value || cosnts.default_category
          const icon = $.get(ID.icon_id(pin)).value || ''
          const icon_url = $.get(ID.icon_url_id(pin)).value || ''
          if (
            title !== pin.title ||
            url !== pin.url ||
            category !== pin.category ||
            icon !== pin.icon ||
            icon_url !== pin.icon_url
          ) {
            storage.update({ ...pin, title, url, icon, icon_url }, category)
          }
          break
        case EditAction.Delete:
          storage.remove(pin.id)
          break
      }
      renderPins(storage.load())
    // intentionally skip break
    case EditAction.Cancel:
      createEditForm()
      break
  }
}

const setEditState = (pin, editAction) => {
  const entry = $.get(ID.entry_id(pin))
  const oldControls = $.get(ID.controls_id(pin))
  const { action } = oldControls.dataset || ''
  if (pin && entry && oldControls) {
    oldControls.remove()
    applyAction(pin, editAction, entry, action)
  }
}

const createEditForm = () => {
  $.get(consts.edit_pins_block_id)?.remove()
  const formElm = tpl.editPins()
  document.body.appendChild(formElm)
  $.click(consts.edit_pins_cancel_id, () => formElm.remove())
  storage.list().forEach((pin) => {
    const { dd_block_id, category_id } = dropdownIds(pin.id)
    const pinWithIds = { ...pin, ...parseIds(pin), dd_block_id, category_id }
    const pinElm = tpl.editPin(pinWithIds)
    if (pinElm) {
      pinElm.appendChild(tpl.editPinControlsIdle(pinWithIds))
      $.get(consts.edit_pins_list_id).appendChild(pinElm)
      $.click(ID.edit_id(pin), () => setEditState(pin, EditAction.Edit))
      $.click(ID.delete_id(pin), () => setEditState(pin, EditAction.Delete))
    }
  })
}
