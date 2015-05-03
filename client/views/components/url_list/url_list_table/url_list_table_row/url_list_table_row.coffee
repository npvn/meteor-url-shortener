FlowComponents.define 'UrlListTableRow', (props) ->
  @set 'url', props.url


Template.UrlListTableRow.helpers

  onUserUrlIndexRoute: ->
    FlowRouter.current().route.name is 'user.url.index'

