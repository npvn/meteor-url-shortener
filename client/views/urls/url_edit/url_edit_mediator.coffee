class @UrlEditMediator extends Space.ui.Mediator

  @Template: 'UrlEdit'

  Dependencies:
    store: 'UrlsStore'

  setInitialState: ->
    url: @store.get('url')
    accessible: @store.get('url')?.userId is Meteor.userId()
