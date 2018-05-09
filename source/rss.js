var fs = require('fs')
var path = require('path')
var html = require('choo/html')
var ov = require('object-values')
var xtend = require('xtend')
var dateFormat = require('dateformat')
var Page = require('enoki/page')
var Enoki = require('enoki/lib/read/sync')
var choo = require('choo')

var app = choo()
app.route('feed.xml', view)

var enoki = new Enoki()
var state = {}

// content state
state.site = state.site || { loaded: false, p2p: false }
state.content = state.content || { }
state.page = new Page(state)

enoki.load('/feed.xml')
state.content = xtend(state.content, enoki.readContent())
state.site = xtend(state.site, enoki.readSite())

fs.writeFileSync(path.join(__dirname, '..', 'feed.xml'), app.toString('/feed.xml', state))

function view (state, emit) {
  var site =state.site
  var home = state.page('/').v()
  var pages = state.page('/blog')
    .pages()
    .toArray()
    .filter(page => page.visible !== false)
    .sort(function (a, b) {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date)
    })

  var url = site.url || 'https://jhand.space' // TODO, add dat support
  // TODO - how can I set these in site object ?
  var title = site.title || home.title || 'Enoki Site'
  var description = site.description || home.description || 'Built with Enoki'

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <channel>
        <title>${title}</title>
        <link>${url}</link>${descriptionEl(description)}
        <atom:link href="${url}/feed.xml" rel="self" type="application/rss+xml"/>
        <lastBuildDate>${new Date()}</lastBuildDate>
        <generator>Enoki v${require('enoki/package.json').version}</generator>
          ${pages.map(item).join('\n')}
      </channel>
    </rss>
  `.trim()

  function descriptionEl (text) {
    if (!text) return ''
    return `\n<description>${text}</description>`
  }

  function item (page) {
    return html`
      <item>
        <title>${page.title}</title>${descriptionEl(page.description)}
        <pubDate>${page.date}</pubDate>
        <link>${page.url}</link>
        <guid isPermaLink="true">${page.url}</guid>
      </item>
    `.trim()
  }
}

