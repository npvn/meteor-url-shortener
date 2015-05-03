class TargetUrlInput extends BlazeComponent
  @register 'TargetUrlInput'

  events: -> [
    'input': (e) ->
      $container = $(e.target).closest '.form-group'
      if not UrlValidationContext.validateOne {targetURL: $(e.target).val()}, 'targetURL'
        $container.addClass 'has-error'
      else
        $container.removeClass 'has-error'

      @data().handleUserInput 'targetURL', $(e.target).val().trim()
  ]
