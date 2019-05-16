var dateFormat = require('dateformat')
var html = require('choo/html')
var format = require('./format')

module.exports = entry

function entry (state, emit) {
  var date = state.date ? dateFormat(new Date(state.date), 'mmmm dS, yyyy') : ''
  return html`
    <article class="baskerville pb5">
      <header class="avenir tc-l ph3 ph4-m ph5-l pt4 pt5-ns">
        <h1 class="f3 f2-m f-subheadline-l measure lh-title fw1 mt0"> ${state.title}</h1>
        <time class="f5 f4-l db fw1 baskerville mb4"> ${date}</time>
        <h5 class="dark-red f6 i pl2 ${state.draft ? '' : 'dn'}">${state.draft ? ' Warning - This article is a draft that may contain unfinished thoughts and may never be finished.' : ''}</h5>
      </header>
      <div class="ph3 ph4-m ph5-l">
        <div class="measure db center f4 f3-l lh-copy">
          ${format(state.text)}
        </div>
      </div>
    </article>
  `
}
