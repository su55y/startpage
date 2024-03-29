'use strict'
/* global storage */ // storage.js
/* global tpl */ // storage.js
/* global consts */ // consts.js
/* global handleModalAreaClick */ // common.js

/* exported
  openStylesForm
*/

const updateStyles = () => {
  // read styles from form
  // update them
}

const openStylesForm = () => {
  const styles = storage.loadStyles()
  document.body.appendChild(tpl.editStyles(styles))
  handleModalAreaClick()
  $.click(consts.edit_styles_cancel_id, () =>
    $.get(consts.edit_styles_block_id)?.remove()
  )
}
