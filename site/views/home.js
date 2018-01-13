var html = require('choo/html')
var ov = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(home)

function home (state, emit) {
  const blogEntries = ov(state.content.children.blog.children || { })
    .filter((entry) => { return !entry.draft })
    .reverse().slice(0, 4)
  return html`
    <main>
      <header class="avenir">
        <div class="washed-red bg-blue pa4 pt5-ns ph7-l">
          <div class="mw8 center">
            <div class="white f6 mb2 dib ttu tracked"><small>Welcome to</small></div>
            <h1 class="f2 f1-m f-headline-l measure-narrow lh-title mv0">
              <span class="tracked-tight">
              ${state.content.title}
              </span>
            </h1>
            <h4 class="f3-ns f4 fw2 avenir lh-copy">
             ${text()}
            </h4>
            <h5 class="white f6 fw3 small-caps tracked">Made By (Joe) Hand</h5>
          </div>
        </div>
      </header>
      <section class="pa4 pb2 baskerville ph7-l mw9-l center">
        ${sectionTitle('Latest Writing', 'writing')}
        ${linkList(blogEntries)}
      </section>
      <section id="projects" class="ph4 pt0 pb4 baskerville ph7-l mw9-l center">
        ${sectionTitle('Projects & Interesting Things')}
        ${linkList([
          {url: 'http://datproject.org', title: 'Dat Project'},
          {url: '/cookies/', title: 'Making the Best Chocolate Chip Cookies'},,
          {url: '/books/', title: 'Books I am Reading'},
          {url: 'http://joeahand.com', title: 'joeahand.com'},
          {url: 'https://github.com/joehand/neat-log', title: 'neat-log'}
        ])}
      </section>
    </main>
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
