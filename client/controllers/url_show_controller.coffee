class @UrlShowController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/show/:shortURL',
      name: 'url.show'
      title: 'URL Details'
      waitOn: ->
        [
          Meteor.subscribe 'url', @params.shortURL
          Meteor.subscribe 'urlVisits', @params.shortURL
        ]
