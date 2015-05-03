Template.UrlShow.helpers

  state: ->
    Template.instance().mediator.getState()

  accessible: ->
    # targetURL is published only to authorized client
    Template.instance().mediator.getState()?.url?.targetURL?

  displayChart: (category) ->
    App.displayChart category


Template.UrlShow.rendered = ->
  $('h2').selectText()


Template.UrlShow.events
  'click h2': (e) ->
    $(e.target).selectText()

