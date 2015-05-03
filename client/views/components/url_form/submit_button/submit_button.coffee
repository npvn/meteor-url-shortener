component = FlowComponents.define 'SubmitButton', (props) ->
  @handleSubmit = props.handleSubmit

component.action.handleSubmit = ->
  @handleSubmit()


Template.SubmitButton.helpers

  label: ->
    if FlowRouter.current()?.route.name is 'home'
      'Shorten'
    else
      'Update'


Template.SubmitButton.events

  'click': (e) ->
    e.preventDefault()
    FlowComponents.callAction 'handleSubmit'
