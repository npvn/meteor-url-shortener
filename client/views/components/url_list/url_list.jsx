/** @jsx React.DOM */

var UrlList = ReactMeteor.createClass({
  templateName: 'UrlList',

  getInitialState: function() {
    return {
      selectedFilter: 'All',
    };
  },

  getMeteorState: function() {
    return {
      urls: this.props.mediator.getState().urls
    };
  },

  handleFilterSelect: function(selectedFilter) {
    this.setState({selectedFilter: selectedFilter});
  },

  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>

        <UrlListFilter
          selectedFilter={this.state.selectedFilter}
          handleFilterSelect={this.handleFilterSelect}
        />

        <UrlListTable
          urls={this.state.urls}
          selectedFilter={this.state.selectedFilter}
        />
      </div>
    );
  }
});
