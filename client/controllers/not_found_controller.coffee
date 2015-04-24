class @NotFoundController

  Dependencies:
    router: 'FlowRouter'
    layoutManager: 'FlowLayout'

  onDependenciesReady: ->
    @router.route '/url/not-found',
      name: 'not.found'
      title: 'Page Not Found'
      action: =>
        @layoutManager.render 'MasterLayout', main: 'NotFound'
