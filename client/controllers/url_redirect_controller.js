UrlRedirectController = RouteController.extend({
    data: function() { 
        Meteor.user(); // reactive trigger: re-run when user's login state changes       
        return URLs.findOne({}, {reactive: false});
    }
    , waitOn: function() {
        return Meteor.subscribe('url', this.params.shortURL);
    }
});
