class UrlListFilterRadio extends BlazeComponent
  @register 'UrlListFilterRadio'

  isChecked: ->
    if @data().value is @data().selectedValue then 'checked' else ''

  events: -> [
    'change input:radio': (e) ->
      @data().handleFilterSelect $(e.target).val()
  ]
