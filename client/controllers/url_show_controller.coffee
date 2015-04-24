class @UrlShowController

  Dependencies:
    router: 'FlowRouter'
    layoutManager: 'FlowLayout'

  onDependenciesReady: ->
    @router.route '/show/:shortURL',
      name: 'url.show'
      title: 'URL Details'

      subscriptions: ->
        @register 'url', Meteor.subscribe('url', @params.shortURL)
        @register 'urlVisits', Meteor.subscribe('urlVisits', @params.shortURL)

      action: =>
        @layoutManager.render 'MasterLayout', main: 'UrlShow'
