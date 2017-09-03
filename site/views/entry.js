var html = require('choo/html')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
  <article class="baskerville pb5">
  <header class="avenir tc-l ph3 ph5-ns pt4 pt5-ns">
    <h1 class="f3 f2-m f-subheadline-l measure lh-title fw1 mt0"> ${state.page.title}</h1>
    <time class="f5 f4-l db fw1 baskerville mb4"> ${state.page.date}</time>
  </header>
  <div class="ph3 ph4-m ph5-l">
    <div class="measure db center f4 f3-l lh-copy">
      ${format(state.page.text)}
    </div>
  </div>
</article>
  `
}
