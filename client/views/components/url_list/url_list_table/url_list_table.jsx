/** @jsx React.DOM */

UrlListTable = ReactMeteor.createClass({
  templateName: 'UrlListTable',

  render: function() {
    var selectedFilter = this.props.selectedFilter;

    var urls = _.filter(this.props.urls, function(url) {
      if (selectedFilter === 'Private') return url.isPrivate
      else if (selectedFilter === 'Public') return !url.isPrivate
      else return true;
    });

    urls = _.map(urls, function(url) {
      return <UrlListTableRow url={url} />
    });

    return <div>{urls}</div>;
  }
});
