Template.PublicUrlIndex.helpers

  state: ->
    Template.instance().mediator.getState()

  hasPublicURL: ->
    Template.instance().mediator.getState()?.urls?.length > 0
