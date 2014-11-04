UrlShowController = RouteController.extend({
    title: 'URL Details'
    , data: function() {
        return URLs.findOne({shortURL: this.params.shortURL});
    }
    , waitOn: function() {
        return [
            Meteor.subscribe('url', this.params.shortURL)
            , Meteor.subscribe('urlVisits', this.params.shortURL)
        ]              
    }
});
