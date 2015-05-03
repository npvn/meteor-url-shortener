class UrlListFilter extends BlazeComponent
  @register 'UrlListFilter'

  handleFilterSelect: ->
    (selectedFilter) =>
      @data().handleFilterSelect selectedFilter

  filters: ->
    ['All', 'Private', 'Public']
