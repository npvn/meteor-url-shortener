Template.UrlRedirect.helpers

  state: ->
    Tracker.nonreactive ->
      Template.instance().mediator.getState()

  accessible: ->
    Tracker.nonreactive ->
      # targetURL is published only to authorized client
      Template.instance().mediator.getState()?.url?.targetURL?

  redirect: ->
    # Record statistical data and process redirection
    Meteor.call '/visit/insert', @shortURL, (error, result) ->
      if error then Notify.error error.reason
      else window.location = result
