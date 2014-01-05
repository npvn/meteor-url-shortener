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

    this.route('userPage', {
       path: '/manage',
       //userId: Meteor.userId(), // this is not possible, I can't user userId() here, so...
       data: function() { return URLs.find(); }, // user find() here since I have already filer the result set from publication code
       waitOn: function() { return Meteor.subscribe('userURLs' /*, this.userId*/ ); } // ... I can't pass userId to publication this way (I must user 'this.userId' in the publication code
    });

    this.route('redirect', {
       path: '/:shortURL',
       controller: URLController
    });

});