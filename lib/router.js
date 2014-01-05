Router.configure({
   layoutTemplate: 'layout'
});


URLController = RouteController.extend({
   data: function() { return URLs.findOne({ shortURL: this.params.shortURL}); },
   waitOn: function() { return Meteor.subscribe('singleURL', this.params.shortURL); }
});


Router.map(function() {

    this.route('home', {
       path: '/'
    });

    this.route('urlPage', {
       path: '/view/:shortURL',
       controller: URLController
    });

    this.route('redirect', {
       path: '/:shortURL',
       controller: URLController
    });

});