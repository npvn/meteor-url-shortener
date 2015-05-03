/** @jsx React.DOM */

var cx = React.addons.classSet;

TargetUrlInput = ReactMeteor.createClass({
  templateName: 'TargetUrlInput',

  validateField: function(e) {
    var $container = $(e.target).closest('.form-group');

    var isValid = UrlValidationContext.validateOne(
      {targetURL: $(e.target).val()},
      'targetURL'
    );

    if (isValid) $container.removeClass('has-error');
    else $container.addClass('has-error');
  },

  onChange: function(e) {
    this.validateField(e);
    this.props.handleUserInput( 'targetURL', $(e.target).val().trim() );
  },

  render: function() {
    return (
      <div id="targetURL" className="form-group">

        <input
          type="text"
          className={cx('form-control', 'floating-label', 'active')}
          placeholder="Paste your long URL here"
          value={this.props.targetURL}
          onChange={this.onChange}
          required
        />

      </div>
    );
  }
});
