/** @jsx React.DOM */

var UrlForm = ReactMeteor.createClass({
  templateName: 'UrlForm',

  url: function() {
    return this.props.mediator.getState().url || {};
  },

  getInitialState: function() {
    var url = this.url();

    return {
      targetURL: url.targetURL,
      shortURL: url.shortURL,
      isPrivate: url.isPrivate,
    };
  },

  handleUserInput: function(state, value) {
    var stateObject = {};
    stateObject[state] = value;
    this.setState(stateObject);
  },

  handleSubmit: function() {
    var url = {
      targetURL: this.state.targetURL,
      shortURL: this.state.shortURL,
      isPrivate: this.state.isPrivate
    };

    if ( !Match.test(url, Schemas.URL) ) {
      Notify.error('Please correct the highlighted field(s)');
      return;
    }

    this.props.mediator.submitURL(
      this.url() && this.url()._id,
      url
    );
  },

  render: function() {
    return (
      <form id="url-form">
        <TargetUrlInput
          targetURL={this.state.targetURL}
          handleUserInput={this.handleUserInput}
        />

        <div className="form-inline">

          <ShortUrlInput
            shortURL={this.state.shortURL}
            handleUserInput={this.handleUserInput}
          />

          <PrivateCheckbox
            isPrivate={this.state.isPrivate}
            handleUserInput={this.handleUserInput}
          />

        </div>

        <SubmitButton handleSubmit={this.handleSubmit} />
      </form>
    );
  }
});
