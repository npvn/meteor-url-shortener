Template.UserUrlIndex.helpers

  mediator: ->
    Template.instance().mediator

  hasURL: ->
    Template.instance().mediator.getState()?.urls?.length > 0
