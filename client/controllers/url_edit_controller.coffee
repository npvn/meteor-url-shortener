class @UrlEditController

  Dependencies:
    router: 'FlowRouter'
    layoutManager: 'FlowLayout'

  onDependenciesReady: ->
    @router.route '/edit/:shortURL',
      name: 'url.edit'
      title: 'URL Edit'

      subscriptions: (params) ->
        @register 'url', Meteor.subscribe('url', params.shortURL)

      action: =>
        @layoutManager.render 'MasterLayout', main: 'UrlEdit'
