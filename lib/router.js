/*

router.js is put in /lib to satisfy a requirement of the fast-render package:
http://meteorhacks.com/fast-render/iron-router-support

*/


Router.configure({
   layoutTemplate: 'layout'
});


urlEditURLController = FastRender.RouteController.extend({
   data: function() { return URLs.findOne(); },
   waitOn: function() { return Meteor.subscribe('singleURL', this.params.shortURL); }
});


NonReactiveURLController = FastRender.RouteController.extend({
    data: function() { return URLs.findOne( {}, {reactive: false} ); },
    waitOn: function() {
        return Meteor.subscribe('singleURL', this.params.shortURL);
    }
});


PublicURLsController = FastRender.RouteController.extend({
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


Router.map(function() {

    this.route('home', {
       path: '/',
       fastRender: true
    });

    this.route('publicList', {
       path: '/publicList/:limit?',
       template: 'publicList',
       controller: PublicURLsController,
       fastRender: true
    });

    this.route('urlPage', {
       path: '/view/:shortURL',
       data: function() {
           return {
               urlData: URLs.findOne(),
               urlStatistics: Visits.find()
           }
       },
       waitOn: function() {
           return Meteor.subscribe('urlDataAndStatistics', this.params.shortURL);
       },
       fastRender: true
    });

    this.route('userPage', {
       path: '/manage',
       //userId: Meteor.userId(), // this is not possible, I can't user userId() here, so...
       data: function() { return URLs.find( {}, {sort:{timeModified: -1, timeCreated: -1}}); }, // user find() here since I have already filer the result set from publication code
       waitOn: function() { return Meteor.subscribe('userURLs' /*, this.userId*/ ); }, // ... I can't pass userId to publication this way (I must user 'this.userId' in the publication code
       fastRender: false
    });

    this.route('urlEdit', {
       path: '/edit/:shortURL',
       controller: urlEditURLController,
       fastRender: true
    });

    this.route('redirect', {
       path: '/:shortURL',
       controller: NonReactiveURLController, // Have to use a non-reactive data here, see !lessons.txt
       fastRender: true
    });

});


Router.before(function() {
   Errors.clearSeen();
});