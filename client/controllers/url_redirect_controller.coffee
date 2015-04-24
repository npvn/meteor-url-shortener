class @UrlRedirectController

  Dependencies:
    router: 'FlowRouter'
    layoutManager: 'FlowLayout'

  onDependenciesReady: ->
    @router.route '/redirect/:shortURL',
      name: 'url.redirect'
      title: 'URL Redirect'

      subscriptions: ->
        @register 'url', Meteor.subscribe('url', @params.shortURL)

      action: =>
        @layoutManager.render 'MasterLayout', main: 'UrlRedirect'
