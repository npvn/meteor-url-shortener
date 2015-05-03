/** @jsx React.DOM */

var cx = React.addons.classSet;

UrlListFilter = ReactMeteor.createClass({
  templateName: 'UrlListFilter',

  filters: function() {
    return ['All', 'Private', 'Public'];
  },

  render: function() {
    if (FlowRouter.current().route.name !== 'user.url.index') return <span></span>;

    var self = this;

    var radios = _.map(this.filters(), function(filter) {
      return <UrlListFilterRadio
               name='url-list-filter'
               value={filter}
               selectedValue={self.props.selectedFilter}
               handleFilterSelect={self.props.handleFilterSelect}
             />
    });

    return (
      <div className={cx('row', 'url-list-filter')}>
        <div className="col-md-2">Filter URLs:</div>
        {radios}
      </div>
    );
  }
});
