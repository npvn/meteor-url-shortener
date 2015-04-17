class @NotFoundController

  Dependencies:
    router: 'Router'

  onDependenciesReady: ->
    @router.route '/url/not-found',
      name: 'not.found'
      title: 'Page Not Found'
