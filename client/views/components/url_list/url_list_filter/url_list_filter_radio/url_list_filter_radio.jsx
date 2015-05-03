/** @jsx React.DOM */

var cx = React.addons.classSet;

UrlListFilterRadio = ReactMeteor.createClass({
  templateName: 'UrlListFilterRadio',

  isChecked: function() {
    return this.props.value === this.props.selectedValue;
  },

  onChange: function(e) {
    this.props.handleFilterSelect( $(e.target).val() );
  },

  render: function() {
    // XXX React Comment 3
    // Fix the issue when the text node inside radio label is converted into
    // <span> by React, breaking the styling. This is not a legitimate fix, and
    // React will complain in the browser console.
    var self = this;
    setTimeout(function() {
      var radioLabelText = React.findDOMNode(self.refs.radioLabelText);
      $(radioLabelText).replaceWith(self.props.value);
    }, 300);

    return (
      <div className="col-md-2">
        <div className={cx('radio', 'radio-primary')}>
          <label>
            <input
              type="radio"
              name={this.props.name}
              value={this.props.value}
              onChange={this.onChange}
              checked={this.isChecked()}
            />

            <span ref='radioLabelText'>{this.props.value}</span>
          </label>
        </div>
      </div>
    );
  }
});
