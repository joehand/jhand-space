var html = require('choo/html')
var ov = require('object-values')
var wrapper = require('../components/wrapper')

module.exports = wrapper(blog)

function blog (state, emit) {
  var entries = ov(state.page.children)
  console.log('state', state)
  return html`
    <main>
      <header class="avenir">
        <div class="washed-red bg-blue pa4 ph7-l">
          <div class="mw8 center">
          <h1 class="f2 f1-m measure-narrow lh-title mv0">
            <span class="lh-copy tracked-tight">
            jhand.space/blog
            </span>
          </h1>
        </div>
        </div>
      </header>
      <section class="pa4 baskerville ph7-l mw9-l center">
        ${linkList(entries.reverse())}
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
    if (entry.draft) return
    return html`
      <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--washed-red">
      <a class="db dim mv2 f3-ns f4 fw4 avenir lh-copy blue link" href="${entry.url}">
        ${entry.title}
        <time class="f6 fw5 ttu tracked db black-60">${entry.date}</time>
      </a>
      </li>
    `
  }
}

