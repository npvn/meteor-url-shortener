class @UserUrlIndexController

  Dependencies:
    router: 'FlowRouter'
    layoutManager: 'FlowLayout'

  onDependenciesReady: ->
    @router.route '/user/urls',
      name: 'user.url.index'
      title: 'Your URLs'

      subscriptions: ->
        @register 'userURLs', Meteor.subscribe 'userURLs'

      action: =>
        @layoutManager.render 'MasterLayout', main: 'UserUrlIndex'
