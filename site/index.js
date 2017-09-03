var choo = require('choo')
var config = require('./app')

// wrap choo in cms
var app = config(choo())

// create your app
app.use(require('./plugins/scroll'))
if (process.env.ANALYTICS) {
  app.use(require('./plugins/analytics'))
}
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-log')())
}

// error route
app.route('*', require('./views/notfound'))

// public
if (module.parent) {
  module.exports = app
} else {
  app.mount('main')
}
