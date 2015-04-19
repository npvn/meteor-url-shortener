class @PublicUrlIndexMediator extends Space.ui.Mediator

  @Template: 'PublicUrlIndex'

  Dependencies:
    store: 'UrlsStore'

  setInitialState: ->
    urls: @store.get 'urls'
    hasPublicURL: @store.get('count') > 0
