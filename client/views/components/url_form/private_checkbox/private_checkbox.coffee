class PrivateCheckbox extends BlazeComponent
  @register 'PrivateCheckbox'

  onRendered: ->
    @$('#isPrivate').tooltip()

  isChecked: ->
    if @data().isPrivate then 'checked' else ''

  isDisabled: ->
    if Meteor.user() then false else 'disabled'

  tooltip: ->
    if Meteor.user()
      'Make this link private'
    else
      'Please login to make this link private'

  events: -> [
    'change input': (e) ->
      @data().handleUserInput 'isPrivate', $(e.target).is(':checked')
  ]
