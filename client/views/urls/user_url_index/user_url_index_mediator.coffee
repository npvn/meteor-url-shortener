class @UserUrlIndexMediator extends Space.ui.Mediator

  @Template: 'UserUrlIndex'

  Dependencies:
    store: 'UrlsStore'

  setInitialState: ->
    urls: @store.get 'urls'
    hasURL: @store.get('count') > 0
