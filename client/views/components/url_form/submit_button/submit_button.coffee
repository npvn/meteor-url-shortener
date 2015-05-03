class SubmitButton extends BlazeComponent
  @register 'SubmitButton'

  label: ->
    if FlowRouter.current()?.route.name is 'home'
      'Shorten'
    else
      'Update'

  events: -> [
    'click': (e) ->
      e.preventDefault()
      @data().handleSubmit()
  ]
