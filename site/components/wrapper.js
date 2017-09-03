var html = require('choo/html')
var ov = require('object-values')
var path = require('path')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <main>
        <div class="avenir">
          ${navigation({
            active: state.page ? state.page.path : '',
            links: state.content ? state.content.children : { },
            title: state.content ? state.content.title : ''
          })}
        </div>
        ${view(state, emit)}
        ${footer(state, emit)}
      </main>
    `
  }
}

function navigation (state, emit) {
  var active = state.active || ''
  var links = ov(state.links) || [ ]

  return html`
    <nav class="flex justify-between ph2 ph3-ns">
      <div class="flex items-center pa3">
        ${links.map(link)}
        <a class="dn dib-ns black f4 link dim mr3 mr4-ns" target="_blank" href="https://github.com/joehand">Github</a>
      </div>
      <div class="flex-grow pa3 flex items-center">
        <a class="black f4 tracked-tight link fw2 hover-dark-red no-underline" href="/">
        <span class="dn dib-ns">${state.title}</span>
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

  function link (link) {
    if (link.exclude_nav) return
    var activeClass = isActive(link.dirname) ? 'dark-red' : 'black'
    return html`
      <a class="${activeClass} black f4 link dib dim mr3 mr4-ns" href="${link.url}">${link.title || link.dirname}</a>
    `
  }

  function isActive (pathLink) {
    return active
      .split(path.sep)
      .filter(str => str)[0] ===
      path.basename(pathLink)
  }
}

function footer (state, emit) {
  return html`
    <footer class="flex avenir justify-between pa3">
      <div class="flex f4 fw2 items-center pa3">
        <span class="dn dib-ns">Joe Hand | </span><a class="pl2 blue link" href="mailto:joe@hand.email">joe@hand.email</a>
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
