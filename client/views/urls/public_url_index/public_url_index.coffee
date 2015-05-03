Template.PublicUrlIndex.helpers

  mediator: ->
    Template.instance().mediator

  hasPublicURL: ->
    Template.instance().mediator.getState()?.urls?.length > 0
