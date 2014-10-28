URLPublicIndexController = RouteController.extend({
    // Looks like I need to define these properties inside a controller - if I define them in Router.map() below I can't access these properties via 'this.property'
    increment: 10,
    limit: function() { return parseInt(this.params.limit) || this.increment; }, // the parseInt line help avoid invalid limits, and and so avoid 0 (parseInt(0) = 0 which will evaluate to false)
    loadMore: function() {
        return Router.routes.publicList.path({limit: this.limit() + this.increment});
    },
    data: function() {
        return {
            publicURLs: URLs.find( {}, {sort:{timeCreated: -1}} ) ,
            loadMore: this.loadMore()
        };
    },
    waitOn: function() {
        var limit = this.limit ? this.limit() : this.params ? this.params.limit : 10;
        return Meteor.subscribe('publicURLs', limit); // for fast-render to not showing error in server console
    }
});
