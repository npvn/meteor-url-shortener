component = FlowComponents.define 'TargetUrlInput', (props) ->
  @setFn 'targetURL', props.targetURL
  @handleUserInput = props.handleUserInput

component.action.handleUserInput = (state, value) ->
  @handleUserInput state, value


Template.TargetUrlInput.events

  'input': (e) ->
    $container = $(e.target).closest '.form-group'
    if not UrlValidationContext.validateOne {targetURL: $(e.target).val()}, 'targetURL'
      $container.addClass 'has-error'
    else
      $container.removeClass 'has-error'

    FlowComponents.callAction 'handleUserInput', 'targetURL', $(e.target).val().trim()
