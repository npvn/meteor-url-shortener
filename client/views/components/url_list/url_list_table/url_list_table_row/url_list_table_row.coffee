class UrlListTableRow extends BlazeComponent
  @register 'UrlListTableRow'

  onUserUrlIndexRoute: ->
    FlowRouter.current().route.name is 'user.url.index'

