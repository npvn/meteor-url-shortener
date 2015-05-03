/** @jsx React.DOM */

var cx = React.addons.classSet;

ShortUrlInput = ReactMeteor.createClass({
  templateName: 'ShortUrlInput',

  validateField: function(e) {
    var $container = $(e.target).closest('.form-group');

    var isValid = UrlValidationContext.validateOne(
      {shortURL: $(e.target).val()},
      'shortURL'
    );

    if (isValid) $container.removeClass('has-error');
    else $container.addClass('has-error');
  },

  onChange: function(e) {
    this.validateField(e);
    this.props.handleUserInput( 'shortURL', $(e.target).val().trim() );
  },

  render: function() {

    return (
      <div id="shortURL" className="form-group">

        <input
          type="text"
          className={cx('form-control', 'floating-label', 'active')}
          placeholder="Custom short link"
          value={this.props.shortURL}
          onChange={this.onChange}
        />

      </div>
    );
  }
});
