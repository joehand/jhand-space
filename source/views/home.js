var html = require('choo/html')
var objectValues = require('object-values')
var xtend = require('xtend')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  var blog = state.content['/blog'] || { }
  var entries = objectValues(blog.pages)
    .map(page => state.content[page.url])
    .map(page => xtend(page, { visible: page.visible }))
    .filter((page) => { return page.visible })
    .reverse().slice(0, 4)
  var links = objectValues(state.page.links)

  return html`
    <div>
      <header class="avenir">
        <div class="washed-red bg-blue pa4 pt5-ns ph7-l">
          <div class="mw8 center">
            <div class="white f6 mb2 dib ttu tracked"><small>Welcome to</small></div>
            <h1 class="f2 f1-m f-headline-l measure-narrow lh-title mv0">
              <span class="tracked-tight">
              ${state.page.title}
              </span>
            </h1>
            <h4 class="f3-ns f4 fw2 avenir lh-copy">
             ${text()}
            </h4>
            <h5 class="white f6 fw3 small-caps tracked">Made By Hand</h5>
          </div>
        </div>
      </header>
      <section class="pa4 pb2 baskerville ph7-l mw9-l center">
        ${sectionTitle('Latest Writing', 'writing')}
        ${linkList(entries)}
      </section>
      <section id="projects" class="ph4 pt0 pb4 baskerville ph7-l mw9-l center">
        ${sectionTitle('Projects & Interesting Things')}
        ${linkList(links)}
      </section>
    </div>
  `

  function sectionTitle (title) {
    return html`
      <header>
        <h5 class="mb3 f3 avenir ttu tracked black-80">
          ${title}
        </h5>
      </header>
    `
  }

  function linkList (links) {
    return html`
      <ul class="list pl0 measure-wide">
        ${links.map(link)}
      </ul>
    `

    function link (entry) {
      return html`
        <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--washed-red">
        <a class="db dim mv2 f3-ns f4 fw4 avenir lh-copy blue link" href="${entry.url}">
          ${entry.title}
        </a>
        </li>
      `
    }
  }

  function text () {
    return html`
      <div class="white measure-wide">
        ${format(state.page.text)}
      </div>
    `
  }
}
