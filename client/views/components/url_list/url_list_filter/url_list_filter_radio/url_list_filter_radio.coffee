# XXX Flow Components Comment 2
#
# The 'isChecked' state inside this component is redundant, because we can
# calculate it using props.value and props.selectedValue.
#
# However, we still need this redundant state, because we can't implement
# 'isChecked' using a template helper - There's no way to access component's
# states from template helpers.
#
# In larger, more sophisticated templates, we may end up with a mess of
# redundant states because of this limitation.


component = FlowComponents.define 'UrlListFilterRadio', (props) ->
  @set 'name', props.name
  @set 'value', props.value
  @set 'isChecked', if props.value is props.selectedValue then 'checked' else ''
  @handleFilterSelect = props.handleFilterSelect

component.action.handleFilterSelect = (selectedFilter) ->
  # XXX Flow Components Comment 3
  #
  # Passing a callback from parent component (UrlList) to this child component
  # is very cumbersome.
  #
  # (You can trace how the handler is passed by searching for 'handleFilterSelect')
  @handleFilterSelect selectedFilter


Template.UrlListFilterRadio.events

  'change input:radio': (e) ->
    FlowComponents.callAction 'handleFilterSelect', $(e.target).val()
