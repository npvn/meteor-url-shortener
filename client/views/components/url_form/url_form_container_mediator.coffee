class @UrlFormContainerMediator extends Space.ui.Mediator

  @Template: 'UrlFormContainer'

  Dependencies:
    store: 'UrlsStore'

  setInitialState: ->
    url: @store.get('url') or {}

  submitURL: (urlId, url) ->
    @publish new UrlSubmitted
      urlId: urlId

      url: url

      callback: (error, result) ->
        if error
          Notify.error error.reason
        else
          if FlowRouter.current()?.route.name is 'home'
            FlowRouter.go 'url.show', shortURL: result
          else
            FlowRouter.go 'user.url.index', shortURL: result
