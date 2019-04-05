var objectValues = Object.values
var objectKeys = Object.keys
var html = require('choo/html')

var views = require('./')

module.exports = view

function view (state, emit) {
  state.page = state.content[state.href || '/']

  // loading
  if (!state.site.loaded) return renderLoading(state, emit)
  // 404
  if (!state.page) return renderNotFound(state, emit)
  // view
  var view = views[state.page.view] || views.default

  // title
  var title = getTitle(state)
  if (state.title !== title) emit(state.events.DOMTITLECHANGE, title)

  // template
  return html`
    <body>
      ${renderStyles(state, emit)}
      <main>
        ${renderNavigation(state, emit)}
        ${view(state, emit)}
        ${renderFooter(state, emit)}
      </main>
    </body>
  `
}

function renderLoading (state, emit) {
  return html`
    <body>
      <div class="loading"></div>
    </body>
  `
}

function renderNotFound (state, emit) {
  return html`
    <body>
      ${renderStyles(state, emit)}
      <main>
        ${renderNavigation(state, emit)}
        <section>
          <header class="avenir">
            <div class="washed-red vh-75 w-100 mb2 dt bg-blue pa4 pt5-ns ph7-l">
              <div class="dtc v-mid mw8 center">
                <div class="f6 mb2 dib ttu tracked"><small>The page was</small></div>
                <h1 class="f2 f1-m f-headline-l measure-narrow lh-title mv0">
                  <span class="lh-copy tracked-tight">
                  Not Found
                  </span>
                </h1>
                <h4 class="f3-ns f4 fw2 avenir lh-copy">
                 Oh no! Did you check if it was plugged in?
                </h4>
                <h5 class="f6 fw3 small-caps tracked"><a class="dim washed-red link" href="/">Go Home</a></h5>
              </div>
            </div>
          </header>
        </section>
        ${renderFooter(state, emit)}
      </main>
    </body>
  `
}

function renderStyles (state, emit) {
  return ''
  // var page = state.content['/']
  // return html`
  //   <style>
  //     :root {
  //       --background: ${page.background};
  //       --foreground: ${page.foreground};
  //     }
  //   </style>
  // `
}

function renderNavigation (state, emit) {
  var home = state.content['/']
  var pages = objectValues(home.pages)
    .map(page => state.content[page.url])
    .filter(page => page.visible !== false)
    .filter(page => page.nav !== false)
    .reverse()

  return html`
    <nav class="avenir flex justify-between ph2 ph3-ns">
      <div class="flex items-center pa3">
        ${pages.map(renderLink)}
      </div>
      <div class="flex-grow pa3 flex items-center">
        <a class="black f4 tracked-tight link fw2 hover-dark-red no-underline" href="${home.url}">
          <span class="dn dib-l">${home.title}</span>
          <svg
            class="dib h2 w2 mb1 pl3 v-mid"
            data-icon="grid"
            viewBox="0 0 32 32"
            style="fill:currentcolor">
            <title>hand</title>
            <path d="M20.903 24.014l2.959-3.984 3.475-3.32c0 0-1.158-1.381-2.59-1.381-0.643 0-1.232 0.184-1.77 0.552-0.535 0.367-1.023 0.918-1.463 1.655-0.615 0.215-1.094 0.42-1.438 0.615-0.076-0.766-0.168-1.333-0.275-1.7l1.996-7.748c0.473-1.868 0.586-2.812-0.539-3.312s-2.275 0.879-2.867 2.637l-1.893 5.983 0.057-7.694c0-1.889-0.596-2.833-1.788-2.833-1.204 0-1.805 0.837-1.805 2.51v7.692l-1.936-6.738c-0.48-1.192-1.325-2.366-2.45-1.991s-1.072 2.226-0.76 3.411l1.725 6.569-2.782-4.595c-0.851-1.475-2.319-1.76-2.651-1.416-0.529 0.549-0.883 1.717 0.077 3.394l3.069 5.343 2.74 9.492v1.845h8v-2.379c0.929-0.637 1.732-1.506 2.909-2.607v0z"/>
          </svg>
        </a>
      </div>
    </nav>
  `

  function renderLink (props) {
    var activeClass = state.href && props.url.indexOf(state.href) >= 0 ? 'dark-red' : 'black'
    return html`
      <a class="${activeClass} black f4 link dib dim mr3 mr4-ns" href="${props.url}">${props.title}</a>
    `
  }
}

function renderFooter (state, emit) {
  return html`
    <footer class="flex avenir justify-between pa3">
      <div class="flex f4 fw2 items-center pa3">
        <span class="dn dib-ns">Joe Hand | </span><a class="pl2 blue link" href="mailto:joe@hand.email" rel="me">joe@hand.email</a>
        <a class="dn" href="https://twitter.com/joeahand" rel="me">twitter.com/joeahand</a>
      </div>
      <div class="flex-grow pa3 flex items-center">
        <a class="black tracked-tight link f4 fw2 hover-dark-red no-underline" href="#">
        Back to Top
        <svg
          class="dib h2 w2 mb1 ph3 v-mid"
          data-icon="grid"
          viewBox="0 0 32 32"
          style="fill:currentcolor">
          <title>hand</title>
          <path d="M20.903 24.014l2.959-3.984 3.475-3.32c0 0-1.158-1.381-2.59-1.381-0.643 0-1.232 0.184-1.77 0.552-0.535 0.367-1.023 0.918-1.463 1.655-0.615 0.215-1.094 0.42-1.438 0.615-0.076-0.766-0.168-1.333-0.275-1.7l1.996-7.748c0.473-1.868 0.586-2.812-0.539-3.312s-2.275 0.879-2.867 2.637l-1.893 5.983 0.057-7.694c0-1.889-0.596-2.833-1.788-2.833-1.204 0-1.805 0.837-1.805 2.51v7.692l-1.936-6.738c-0.48-1.192-1.325-2.366-2.45-1.991s-1.072 2.226-0.76 3.411l1.725 6.569-2.782-4.595c-0.851-1.475-2.319-1.76-2.651-1.416-0.529 0.549-0.883 1.717 0.077 3.394l3.069 5.343 2.74 9.492v1.845h8v-2.379c0.929-0.637 1.732-1.506 2.909-2.607v0z"/>
        </svg>
        </a>
      </div>
    </footer>
  `
}


function getTitle (state) {
  var siteTitle = state.content['/'].title
  var pageTitle = state.page.title

  return siteTitle !== pageTitle
    ? siteTitle + ' | ' + pageTitle
    : siteTitle
}
