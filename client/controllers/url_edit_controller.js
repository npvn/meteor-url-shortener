UrlEditController = RouteController.extend({
    title: 'URL Edit'
    , data: function() { 
        return URLs.findOne({shortURL: this.params.shortURL}); 
    },
    waitOn: function() { 
        return Meteor.subscribe('url', this.params.shortURL); 
    }
});
