class @UrlShowMediator extends Space.ui.Mediator

  @Template: 'UrlShow'

  Dependencies:
    store: 'UrlsStore'

  setInitialState:
    url: @store.get('url')
    accessible: @store.get('url')?.targetURL? # targetURL is published only to authorized client
