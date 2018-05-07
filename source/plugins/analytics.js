var fairAnalytics = require('fair-analytics-client-api')

module.exports = analytics

function analytics (state, emitter) {
  // create a fa instance
  var fa = fairAnalytics({
    url: process.env.ANALYTICS
  })
  var start = null
  var pgCount = 0

  emitter.on(state.events.DOMCONTENTLOADED, trackEvent)
  emitter.on(state.events.NAVIGATE, trackEvent)

  function trackEvent () {
    if (!start) start = new Date()
    var eventTime = new Date()

    fa.send({
      sessionDuration: eventTime.getTime() - start.getTime(),
      sessionPageCount: pgCount++,
      event: 'pageView',
      pathname: window.location.pathname
    })
    .then(res => {
      emitter.emit('log:info', 'analytics event successful')
    })
    .catch(err => {
      emitter.emit('log:error', err)
    })
  }
}
