PublicUrlIndexController = RouteController.extend({    
    title: 'Public URLs'
    , increment: 15
    , limit: function() { 
        var currentRoute = Router.current();
        return currentRoute && currentRoute.params && parseInt(currentRoute.params.limit) 
                                                      || this.increment; 
    }
    , loadMorePath: function() {
        return Router.path('public.url.index', {limit: this.limit() + this.increment});
    }
    , data: function() {
        return {
            urls: URLs.find({isPrivate: false}, {sort: {timeModified: -1, timeCreated: -1}})
            , loadMorePath: this.loadMorePath()
        };
    }
    , waitOn: function() {
        return Meteor.subscribe('publicURLs', this.limit());
    }
});
