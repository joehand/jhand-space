var html = require('choo/html')
var ov = Object.values
var xtend = Object.assign
var dateFormat = require('dateformat')

module.exports = view

function view (state, emit) {
  var page = state.content['/blog'] || { }
  var entries = ov(page.pages)
    .map(page => state.content[page.url])
    .filter(page => page.visible)
    // .map(page => xtend(page, { text: formatText(page.text) }))
    //
  // reverse chronological sort
  entries = entries.sort(function (a, b) {
    if (a.date && b.date) return new Date(b.date) - new Date(a.date)
  })

  return html`
    <main>
      <header class="avenir">
        <div class="washed-red bg-blue pa4 ph7-l">
          <div class="mw8 center">
          <h1 class="f2 measure-narrow lh-title mv0">
            <span class="lh-copy tracked-tight">
            jhand.space/blog
            </span>
          </h1>
        </div>
        </div>
      </header>
      <section class="pa4 baskerville ph7-l mw9-l center">
        ${linkList(entries)}
      </section>
    </main>
  `
}

function linkList (links) {
  return html`
    <ul class="list pl0 measure-wide">
      ${links.map(link)}
    </ul>
  `

  function link (entry) {
    if (!entry.visible) return
    return html`
      <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--washed-red">
      <a class="db dim mv2 f3-ns f4 fw4 avenir lh-copy blue link" href="${entry.url}">
        ${entry.title}
        <span class="dark-red f6 i pl2 ${entry.draft ? '' : 'dn'}">${entry.draft ? ' [Draft]' : ''}</span>
        <time class="f6 fw5 ttu tracked db black-60">${dateFormat(new Date(entry.date), 'mmmm yyyy')}</time>
      </a>
      </li>
    `
  }
}