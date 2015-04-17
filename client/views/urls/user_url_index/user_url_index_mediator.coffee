class @UserUrlIndexMediator extends Space.ui.Mediator

  @Template: 'UserUrlIndex'

  Dependencies:
    store: 'UrlsStore'

  setInitialStates:
    urls: @store.get 'urls'
    hasURL: @store.count() > 0
