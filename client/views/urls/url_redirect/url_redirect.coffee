Template.UrlRedirect.helpers

  state: ->
    Template.instance().mediator.getState()

  redirect: ->
    # Record statistical data and process redirection
    Meteor.call '/visit/insert', @shortURL, (error, result) ->
      if error then Notify.error error.reason
      else window.location = result
