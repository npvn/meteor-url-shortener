class @UserUrlIndexController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/user/urls',
      name: 'user.url.index'
      title: 'Your URLs'

      waitOn: ->
        Meteor.subscribe 'userURLs'
