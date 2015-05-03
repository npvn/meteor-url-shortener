# XXX React Comment 4
#
# When switching from UrlEdit to Home, the mediator of UrlFormContainer still
# maintains the old state, causing the previous URL to appear on Home.
#
# We fix this by manually resetting the mediator's state when template is destroyed.

Template.UrlFormContainer.onRendered ->
  @preservedMediator = @mediator
  Helpers.initMaterialDesign()


Template.UrlFormContainer.onDestroyed ->
  @preservedMediator.setState {}


Template.UrlFormContainer.helpers

  mediator: ->
    Template.instance().mediator
