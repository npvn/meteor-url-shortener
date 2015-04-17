class @UserUrlIndexController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/user/urls/:limit?',
      name: 'user.url.index'
      title: 'Your URLs'
      increment: 15

      limit: ->
        parseInt(@params.limit) or @increment

      loadMorePath: ->
        Router.path 'user.url.index', limit: @limit() + @increment

      waitOn: ->
        Meteor.subscribe 'userURLs', @limit()
