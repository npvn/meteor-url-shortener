class @HomeController

  Dependencies:
    router: 'FlowRouter'
    layoutManager: 'FlowLayout'

  onDependenciesReady: ->
    @router.route '/',
      name: 'home'
      title: 'Home'
      action: =>
        @layoutManager.render 'MasterLayout', main: 'Home'
