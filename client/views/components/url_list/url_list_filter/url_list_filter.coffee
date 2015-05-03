component = FlowComponents.define 'UrlListFilter', (props) ->
  @set 'selectedFilter', props.selectedFilter
  @handleFilterSelect = props.handleFilterSelect

  @onRendered ->
    $.material.init()

component.action.handleFilterSelect = (selectedFilter) ->
  @handleFilterSelect selectedFilter


Template.UrlListFilter.helpers

  filters: ->
    ['All', 'Private', 'Public']
