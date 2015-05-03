/** @jsx React.DOM */

PrivateCheckbox = ReactMeteor.createClass({
  templateName: 'PrivateCheckbox',

  getMeteorState: function() {
    return {
      isDisabled: !Meteor.user(),
      tooltip: Meteor.user() ? 'Make this link private' : 'Please login to make this link private'
    };
  },

  onChange: function(e) {
    this.props.handleUserInput( 'isPrivate', $(e.target).is(':checked') );
  },

  render: function() {
    // XXX React Comment 5
    //
    // Fix the issue when the text node next to checkbox is converted into
    // <span> by React, breaking the styling. This is not a legitimate fix, and
    // React will complain in the browser console.
    var self = this;
    setTimeout(function() {
      var checkboxLabelText = React.findDOMNode(self.refs.checkboxLabelText);
      $(checkboxLabelText).replaceWith('Private');
    }, 300);

    return (
      <div id="isPrivate" className="form-group" data-toggle="tooltip" data-placement="right" data-original-title={this.state.tooltip}>

        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value="true"
              name="isPrivate"
              disabled={this.state.isDisabled}
              checked={this.props.isPrivate}
              onChange={this.onChange}
            />
            <span ref='checkboxLabelText'>Private</span>
          </label>
        </div>

      </div>
    );
  }
});
