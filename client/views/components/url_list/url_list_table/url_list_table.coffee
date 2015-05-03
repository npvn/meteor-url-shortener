class UrlListTable extends BlazeComponent
  @register 'UrlListTable'

  filteredURLs: ->
    _.filter @data().urls, (url) =>
      switch @data().selectedFilter.get()
        when 'Private' then return url.isPrivate
        when 'Public' then return !url.isPrivate
        else return true
