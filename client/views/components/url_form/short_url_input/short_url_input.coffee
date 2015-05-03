component = FlowComponents.define 'ShortUrlInput', (props) ->
  @setFn 'shortURL', props.shortURL
  @handleUserInput = props.handleUserInput

component.action.handleUserInput = (state, value) ->
  @handleUserInput state, value


Template.ShortUrlInput.events

  'keyup, paste': (e) ->
    $container = $(e.target).closest '.form-group'
    if not UrlValidationContext.validateOne {shortURL: $(e.target).val()}, 'shortURL'
      $container.addClass 'has-error'
    else
      $container.removeClass 'has-error'

    FlowComponents.callAction 'handleUserInput', 'shortURL', $(e.target).val().trim()
