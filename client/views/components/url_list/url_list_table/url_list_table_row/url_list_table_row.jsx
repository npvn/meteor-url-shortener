/** @jsx React.DOM */

var cx = React.addons.classSet;

UrlListTableRow = ReactMeteor.createClass({
  templateName: 'UrlListTableRow',

  pluralize: function(n, thing) {
    if(n === 0)
      return "0 " + thing;
    else if (n === 1)
      return "1 " + thing;
    else
      return n + " " + thing + "s";
  },

  getShortLink: function() {
    return 'http://' + window.location.host + '/go/' + this.props.url.shortURL;
  },

  getEditLink: function() {
    if (FlowRouter.current().route.name === 'user.url.index')
      return <a href={FlowRouter.path('url.edit', {shortURL: this.props.url.shortURL})}>Edit</a>;
    else
      return '';
  },

  render: function() {
    var url = this.props.url;

    return (
      <div className='row'>

        <div className={cx('col-sm-3', 'hide-overflow')}>
          <a href={this.getShortLink()}>
            {this.getShortLink()}
          </a>
        </div>

        <div className={cx('col-sm-5', 'hide-overflow')}>
          <a href={url.targetURL}>{url.targetURL}</a>
        </div>

        <div className="col-sm-1">
          <UrlListTableRowStatus isPrivate={url.isPrivate} />
        </div>

        <div className="col-sm-1">
          {this.getEditLink()}
        </div>

        <div className="col-sm-2">
          <a href={FlowRouter.path('url.show', {shortURL: url.shortURL})}>
            {this.pluralize(url.visitCount, 'visit') + '(view details)'}
          </a>
        </div>

        <hr className="url-divider" />
      </div>
    );
  }
});
