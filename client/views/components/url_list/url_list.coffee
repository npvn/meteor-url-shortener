class UrlList extends BlazeComponent
  @register 'UrlList'

  onCreated: ->
    @selectedFilter = new ReactiveVar 'All'

  handleFilterSelect: ->
    (selectedFilter) ->
      @selectedFilter.set selectedFilter

  onUserUrlIndexRoute: ->
    FlowRouter.current().route.name is 'user.url.index'
