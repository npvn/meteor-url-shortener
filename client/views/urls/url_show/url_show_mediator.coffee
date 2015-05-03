class @UrlShowMediator extends Space.ui.Mediator

  @Template: 'UrlShow'

  Dependencies:
    store: 'UrlsStore'

  setInitialState: ->
    url: @store.get('url') or {}
