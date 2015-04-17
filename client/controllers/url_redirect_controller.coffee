class @UrlRedirectController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/redirect/:shortURL',
      name: 'url.redirect'
      title: 'URL Redirect'
      waitOn: ->
        Meteor.subscribe 'url', @params.shortURL
