class @UrlRedirectMediator extends Space.ui.Mediator

  @Template: 'UrlRedirect'

  Dependencies:
    store: 'UrlsStore'

  setInitialState: ->
    url: @store.get('url') or {}
