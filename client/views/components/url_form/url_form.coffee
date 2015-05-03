class UrlForm extends BlazeComponent
  @register 'UrlForm'

  onCreated: ->
    data = @data()?.url
    @targetURL = new ReactiveVar data?.targetURL
    @shortURL = new ReactiveVar data?.shortURL
    @isPrivate = new ReactiveVar data?.isPrivate

  handleUserInput: ->
    (state, value) =>
      @[state].set value

  handleSubmit: ->
    =>
      url =
        targetURL: @targetURL.get()
        shortURL: @shortURL.get() or null
        isPrivate: @isPrivate.get()

      if not Match.test url, Schemas.URL
        Notify.error 'Please correct the highlighted field(s)'
        return

      mediator = App.getMediatorFromView Blaze.getView @$('#url-form')[0]
      mediator.submitURL @data()?.url?._id, url
