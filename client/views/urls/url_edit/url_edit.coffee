Template.UrlEdit.helpers

  state: ->
    Template.instance().mediator.getState()

  accessible: ->
    Template.instance().mediator.getState()?.url?.userId is Meteor.userId()
