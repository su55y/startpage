/* global $ */ // dom.js
/* global consts */ // consts.js

/* exported
  handleModalAreaClick
*/

const handleModalAreaClick = () => {
  document.querySelector('.modal-area')?.addEventListener('click', (e) => {
    if (e.target.className !== 'modal-area') return
    $.get(consts.new_pin_block_id)?.remove()
    $.get(consts.edit_pins_block_id)?.remove()
    $.get(consts.edit_styles_block_id)?.remove()
  })
}
