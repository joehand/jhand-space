var html = require('choo/html')

module.exports = view

function view (state, emit) {
  return html`
    <div>
      ${state.page.title}
    </div>
  `
}
