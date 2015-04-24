class @PublicUrlIndexController

  Dependencies:
    router: 'FlowRouter'
    layoutManager: 'FlowLayout'

  onDependenciesReady: ->
    @router.route '/public/urls',
      name: 'public.url.index'
      title: 'Public URLs'

      subscriptions: ->
        @register 'publicURLs', Meteor.subscribe 'publicURLs'

      action: =>
        @layoutManager.render 'MasterLayout', main: 'PublicUrlIndex'
