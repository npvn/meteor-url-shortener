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


// For URL redirect
Router.before(function() {
    //var thisRoute = this;
    var urlId;

    Meteor.call('getURLId', this.params.shortURL, function(error, result) {
     if (error) {
     Errors.throw(error.reason);
     thisRoute.stop();
     }
     else {
         URLs.update( {_id: result}, {$inc: {numVisit: 1}} );
     }
     });

    /*console.log('urlId ' + urlId);

    URLs.update( {_id: urlId}, {$inc: {numVisit: 1}} );
    /*Meteor.call('incrementVisitCount', this.params.shortURL, function(error, result) {
        if (error) {
            Errors.throw(error.reason);
            thisRoute.stop();
        }
        else console.log(result); //window.location = result;
    });*/ //*/
}, {only: 'redirect'});