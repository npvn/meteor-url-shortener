class @UrlFormMediator extends Space.ui.Mediator

  @Template: 'UrlForm'

  submitURL: (urlId, url) ->
    @publish new UrlSubmitted
      urlId: urlId

      url: url

      callback: (error, result) ->
        if error
          Notify.error error.reason
        else
          if Router.current()?.route.getName() is 'home'
            Router.go 'url.show', shortURL: result
          else
            Router.go 'user.url.index', shortURL: result
