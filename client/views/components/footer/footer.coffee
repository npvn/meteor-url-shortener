class Footer extends BlazeComponent
  @register 'Footer'

  year: ->
    new Date().getFullYear()
