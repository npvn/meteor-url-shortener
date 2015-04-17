class @PublicUrlIndexController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/public/:limit?',
      name: 'public.url.index'
      title: 'Public URLs'
      increment: 15

      limit: ->
        console.log '* @params.limit', @params.limit
        parseInt(@params.limit) or @increment

      loadMorePath: ->
        Router.path 'public.url.index', limit: @limit() + @increment

      waitOn: ->
        Meteor.subscribe 'publicURLs', @limit()
