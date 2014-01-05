Router.configure({
   layoutTemplate: 'layout'
});


Router.map(function() {

    this.route('home', {
       path: '/'
    });

    this.route('redirect', {
       path: '/:shortURL',
       data: function() {
           return URLs.findOne({shortURL: this.params.shortURL});
       },
       waitOn: function() { return Meteor.subscribe('singleURL', this.params.shortURL); }
    });

});