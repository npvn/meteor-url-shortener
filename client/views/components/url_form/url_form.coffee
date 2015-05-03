component = FlowComponents.define 'UrlForm', (props) ->
  @set 'urlId', props.url?._id
  @set 'targetURL', props.url?.targetURL
  @set 'shortURL', props.url?.shortURL
  @set 'isPrivate', props.url?.isPrivate

component.action.handleUserInput = (state, value) ->
  @set state, value

component.action.handleIsPrivateInput = (isPrivate) ->
  @set 'isPrivate', isPrivate

component.action.handleSubmit = ->
  url =
    targetURL: @get 'targetURL'
    shortURL: @get('shortURL') or null
    isPrivate: @get 'isPrivate'

  if not Match.test url, Schemas.URL
    Notify.error 'Please correct the highlighted field(s)'
    return

  mediator = App.getMediatorFromView Blaze.getView @$('#url-form')[0]
  mediator.submitURL @get('urlId'), url
