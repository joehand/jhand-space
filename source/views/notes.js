var html = require('choo/html')
var ov = require('object-values')
var xtend = require('xtend')
var dateFormat = require('dateformat')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  var page = state.content['/notes'] || { }
  var entries = ov(page.pages)
    .map(page => state.content[page.url])
    .filter(page => page.visible)
    .sort(function (a, b) {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date)
    })
  var themes = groupBy(entries, 'theme')

  return html`
    <main>
      <header class="avenir">
        <div class="washed-red bg-blue pa4 ph7-l">
          <div class="mw8 center">
            <h1 class="f2 measure-narrow lh-title mv0">
              <span class="lh-copy tracked-tight">
              jhand.space/notes
              </span>
            </h1>
          </div>
        </div>
      </header>
      <section class="pa4 baskerville ph7-l mw9-l center">
        <div class="f6 measure-narrow lh-title mb5">
          ${format(page.text)}
        </div>
        ${Object.keys(themes).map(theme => linkList(themes[theme], theme))}
      </section>
    </main>
  `

  function groupBy (list, prop) {
    return list.reduce(function (memo, x) {
      if (!memo[x[prop]]) { memo[x[prop]] = [] }
      memo[x[prop]].push(x)
      return memo
    }, {})
  }
}

function linkList (links, theme) {
  return html`
    <ul class="list pl0 measure-wide">
      <h5 class="mb3 f3 avenir ttu tracked black-80">
        ${theme}
      </h5>
      ${links.map(link)}
    </ul>
  `

  function link (entry) {
    if (!entry.visible) return
    var date = entry.date ? dateFormat(new Date(entry.date), 'dd mmmm yyyy') : ''
    return html`
      <li class="lh-copy pv2 pb4-ns ba bl-0 bt-0 br-0 b--dotted b--washed-red">
        <span class="db mv2 avenir lh-copy">
          <time class="f6 fw5 ttu tracked db black-60">${date}</time>
        </span>
        ${format(entry.text)}
      </li>
    `
  }
}