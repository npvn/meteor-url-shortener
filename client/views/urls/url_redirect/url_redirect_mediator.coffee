class @UrlRedirectMediator extends Space.ui.Mediator

  @Template: 'UrlRedirect'

  Dependencies:
    store: 'UrlsStore'

  setInitialState: ->
    url: @store.get('url')
    accessible: @store.get('url')?.targetURL? # targetURL is published only to authorized client

