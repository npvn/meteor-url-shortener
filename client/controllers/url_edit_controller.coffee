class @UrlEditController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/edit/:shortURL',
      name: 'url.edit'
      title: 'URL Edit'
      waitOn: ->
        Meteor.subscribe 'url', @params.shortURL
