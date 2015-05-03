# XXX Flow Components Comment 1
#
# We have to set the 'title' state, so that the template can access it with
# {{state$title}}. There's no way to access props directly from template.
#
# This means, technically, we cannot create truly stateless components with
# Flow Components.


component = FlowComponents.define 'UrlList', (props) ->
  @set 'title', props.title
  @set 'urls', props.urls
  @set 'selectedFilter', 'All'

component.action.handleFilterSelect = (selectedFilter) ->
  @set 'selectedFilter', selectedFilter


Template.UrlList.helpers

  onUserUrlIndexRoute: ->
    FlowRouter.current().route.name is 'user.url.index'
