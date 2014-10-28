URLEditController = RouteController.extend({
    data: function() { return URLs.findOne(); },
    waitOn: function() { return Meteor.subscribe('url', this.params.shortURL); }
});
