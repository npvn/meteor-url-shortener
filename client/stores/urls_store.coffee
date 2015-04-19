class @UrlsStore extends Space.ui.Store

  setInitialState: ->

    url: URLs.findOne()

    urls: URLs.find {},
      sort:
        timeModified: -1
        timeCreated: -1

  @on UrlSubmitted, (e) ->
    # Updating an existing url
    if e.urlId
      _.extend e.url, _id: e.urlId

    # Creating a new url
    else
      date = new Date()
      _.extend e.url,
        userId: Meteor.userId()
        timeCreated: date
        timeModified: date # for better sorting order

    Meteor.call '/url/upsert', e.url, App.extractHost(e.url.targetURL), e.callback


