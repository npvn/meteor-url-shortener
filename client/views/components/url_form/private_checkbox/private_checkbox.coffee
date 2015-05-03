component = FlowComponents.define 'PrivateCheckbox', (props) ->
  @setFn 'isPrivate', props.isPrivate
  @set 'isChecked', if @get('isPrivate') then 'checked' else ''
  @handleUserInput = props.handleUserInput

  @onRendered ->
    @$('#isPrivate').tooltip()

component.action.handleUserInput = (state, value) ->
  @handleUserInput state, value


Template.PrivateCheckbox.helpers

  isDisabled: ->
    if Meteor.user() then false else 'disabled'

  tooltip: ->
    if Meteor.user()
      'Make this link private'
    else
      'Please login to make this link private'


Template.PrivateCheckbox.events

  'change input': (e) ->
    FlowComponents.callAction 'handleUserInput', 'isPrivate', $(e.target).is ':checked'
