/** @jsx React.DOM */

var cx = React.addons.classSet;

SubmitButton = ReactMeteor.createClass({
  templateName: 'SubmitButton',

  label: function() {
    if ( FlowRouter.current().route.name === 'home' )
      return 'Shorten';
    else
      return 'Update';
  },

  onClick: function(e) {
    e.preventDefault();
    this.props.handleSubmit();
  },

  render: function() {
    return (
      <button type="submit" className={cx('btn', 'btn-primary', 'btn-raised')} onClick={this.onClick}>
        {this.label()}
      </button>
    );
  }
});
