class @HomeController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/',
      name: 'home'
      title: 'Home'
