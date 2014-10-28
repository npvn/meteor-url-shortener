URLRedirectController = RouteController.extend({
    data: function() { return URLs.findOne( {}, {reactive: false} ); },
    waitOn: function() {
        return Meteor.subscribe('url', this.params.shortURL);
    }
});
