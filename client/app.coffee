class @MeteorURLShortener extends Space.ui.Application

  RequiredModules: ['Space.ui']

  Stores: ['UrlsStore']

  Mediators: ['UrlFormMediator', 'PublicUrlIndexMediator', 'UrlEditMediator',
              'UrlRedirectMediator', 'UrlShowMediator', 'UserUrlIndexMediator']

  Controllers: ['HomeController', 'PublicUrlIndexController', 'UrlEditController',
                'UrlRedirectController', 'UrlShowController', 'UserUrlIndexController',
                'NotFoundController']

  configure: ->
    super
    @injector.map('Router').to Router


Meteor.startup ->

  Router.onAfterAction ->
    # Set page title for each route
    document.title = @title + " | URL Shortener"
    # Initiate Material Design
    Meteor.defer ->
      $.material.init()

  new MeteorURLShortener().run()


App.subs =
  userData: Meteor.subscribe("current_user_data")


App.login = (email, password, cb) ->
  onLogin = (err) ->
    cb and cb(err)
  Meteor.loginWithPassword email, password, onLogin


App.logout = (cb) ->
  onLogout = (err) ->
    if cb then cb err
    else Router.go "home"
  Meteor.logout onLogout


App.displayChart = (category) ->
  nv.addGraph ->
    visits = Visits.find(shortURL: Router.current().params.shortURL)
    statistics = App.aggregateData(visits, category)

    # XXX TODO Make the charts responsive by automatically redraw them
    # XXX on viewport resize event
    width = height = $(".col-sm-4").width() * (95 / 100)

    chart = nv.models.pieChart()
      .x (d) -> d.key
      .y (d) -> d.y
      .showLabels true
      .labelThreshold .05
      .labelType "key"
      .color d3.scale.category10().range().slice().splice(2)
      .width width
      .height height
      .showLegend false
      .donut true
      .donutRatio 0.35
      .valueFormat d3.format("d")

    d3.select("#" + category + "-chart" + " svg")
      .datum statistics
      .transition()
      .duration 1000
      .attr "width", width
      .attr "height", height
      .call chart

    # Reset previous chart title before inserting a new one
    $("#" + category + "-chart svg text").filter("[is-chart-title]").remove()
    d3.select("#" + category + "-chart" + " svg")
      .append "text"
      .attr "x", width / 2
      .attr "y", (if _.isEmpty(statistics) then height / 3 else height / 2 + 10)
      .attr "text-anchor", "middle"
      .attr "is-chart-title", true
      .style "font-weight", "bold"
      .text "By " + (if category is "os" then "OS" else category.charAt(0).toUpperCase() + category.slice 1)

    return chart


# Generate an array of aggregated data for a given category
App.aggregateData = (cursor, category) ->
  resultObj = {} # e.g. {Firefox: 3, Chrome: 6, IE: 1}
  resultArray = [] # e.g. [ {Firefox: 3}, {Chrome: 6}, {IE: 1} ]

  # Populate resultObj
  cursor.forEach (doc) ->
    value = doc[category] # e.g. category = 'browser', value = 'Firefox'
    if resultObj[value]
      resultObj[value]++
    else
      resultObj[value] = 1

  # Populate resultArray
  for prop of resultObj
    obj = {}
    obj.key = prop
    obj.y = resultObj[prop]
    resultArray.push obj

  return resultArray


App.extractHost = (targetURL) ->
  el = document.createElement "a"
  el.href = targetURL
  setTimeout ->
    $(el).remove()
  , 1000
  return el.host


App.isKeyInvalid = (keyName) ->
  # Array of invalid keys - a reactive data-source
  invalidKeys = AutoForm.getValidationContext("url-form").invalidKeys()
  return _.any invalidKeys, (key) ->
    key.name is keyName


#Global Template Helpers


Helpers = {}


Helpers.getHostName = ->
  window.location.host


Helpers.pluralize = (n, thing) ->
  if n is 0
    "0 " + thing
  else if n is 1
    "1 " + thing
  else
    n + " " + thing + "s"


_.each Helpers, (helper, key) ->
  Handlebars.registerHelper key, helper
