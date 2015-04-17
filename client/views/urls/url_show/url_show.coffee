Template.UrlShow.helpers

  state: ->
    Template.instance().mediator.getState()

  displayChart: (category) ->
    App.displayChart category

Template.UrlShow.rendered = ->
  $('h2').selectText()

Template.UrlShow.events
  'click h2': (e) ->
    $(e.target).selectText()

