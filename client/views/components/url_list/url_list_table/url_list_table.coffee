FlowComponents.define 'UrlListTable', (props) ->
  filteredURLs = _.filter props.urls, (url) ->
    switch props.selectedFilter
      when 'Private' then return url.isPrivate
      when 'Public' then return !url.isPrivate
      else return true

  @set 'urls', filteredURLs
