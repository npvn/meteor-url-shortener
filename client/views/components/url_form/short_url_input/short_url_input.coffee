class ShortUrlInput extends BlazeComponent
  @register 'ShortUrlInput'

  events: -> [
    'input': (e) ->
      $container = $(e.target).closest '.form-group'
      if not UrlValidationContext.validateOne {shortURL: $(e.target).val()}, 'shortURL'
        $container.addClass 'has-error'
      else
        $container.removeClass 'has-error'

      @data().handleUserInput 'shortURL', $(e.target).val().trim()
  ]
