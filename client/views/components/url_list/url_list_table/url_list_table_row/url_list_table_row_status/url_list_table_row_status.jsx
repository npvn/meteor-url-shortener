/** @jsx React.DOM */

UrlListTableRowStatus = ReactMeteor.createClass({
  templateName: 'UrlListTableRowStatus',

  render: function() {
    if (FlowRouter.current().route.name !== 'user.url.index') return <span></span>;

    if (this.props.isPrivate)
      return <span className="status-private">Private</span>;
    else
      return <span>Public</span>;
  }
});
