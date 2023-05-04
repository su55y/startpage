'use strict'
/* global storage */ // storage.js
/* global tpl  */ // template.js
/* renderPins */ // pins.js
/* $ */ // dom.js
/* consts */ // consts.js

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
  controls_id: ({ id }) => `controls${id}`,
  edit_id: ({ id }) => `edit${id}`,
  confirm_id: ({ id }) => `confirm${id}`,
  cancel_id: ({ id }) => `cancel${id}`,
  delete_id: ({ id }) => `delete${id}`,
}

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
      $.click(ID.confirm_id(pin), () => setEditState(pin, EditAction.Update))
      $.click(ID.cancel_id(pin), () => setEditState(pin, EditAction.Cancel))
      $.get(ID.title_id(pin)).disabled = editAction !== EditAction.Edit
      $.get(ID.url_id(pin)).disabled = editAction !== EditAction.Edit
      break
    case EditAction.Update:
      switch (confirmAction) {
        case EditAction.Edit:
          const title = $.get(ID.title_id(pin)).value || pin.title
          const url = $.get(ID.url_id(pin)).value || pin.url
          if (title !== pin.title || url !== pin.url) {
            storage.update({ ...pin, title, url })
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
  storage.load().forEach((pin) => {
    const pinWithIds = { ...pin, ...parseIds(pin) }
    const pinElm = tpl.editPin(pinWithIds)
    if (pinElm) {
      pinElm.appendChild(tpl.editPinControlsIdle(pinWithIds))
      $.get(consts.edit_pins_list_id).appendChild(pinElm)
      $.click(ID.edit_id(pin), () => setEditState(pin, EditAction.Edit))
      $.click(ID.delete_id(pin), () => setEditState(pin, EditAction.Delete))
    }
  })
}
