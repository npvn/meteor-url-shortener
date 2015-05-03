Template.UserUrlIndex.helpers

  state: ->
    Template.instance().mediator.getState()

  hasURL: ->
    Template.instance().mediator.getState()?.urls?.length > 0
