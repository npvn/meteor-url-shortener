class @PublicUrlIndexController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/public/urls',
      name: 'public.url.index'
      title: 'Public URLs'

      waitOn: =>
        Meteor.subscribe 'publicURLs'
