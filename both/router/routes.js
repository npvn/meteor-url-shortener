Router.configure({
	notFoundTemplate: 'NotFound'
	, loadingTemplate: 'Loading'
	, templateNameConverter: 'upperCamelCase'
	, routeControllerNameConverter: 'upperCamelCase'
	, layoutTemplate: 'MasterLayout'
});

//Any function that is related to routes, are going to be in Router namespace.

Router.mustBeLoggedIn = function () {
	if(!Meteor.user()) {
		this.redirect("home");
	}
};

Router.mustNotBeLoggedIn = function () {
	if(Meteor.user()) {
		this.redirect("home");
	}
};

Router.mustBeAdmin = function() {
	if(!Users.isAdmin(Meteor.userId())){
		this.redirect("home");
	}
};

if (Meteor.isClient) {
	var publicRoutes = ['home'];
	Router.onBeforeAction(Router.mustBeLoggedIn, {except: publicRoutes});

	var loginAndRegistrationRoutes = [];
	Router.onBeforeAction(Router.mustNotBeLoggedIn, {only: loginAndRegistrationRoutes});

	var adminRoutes = [];
	Router.onBeforeAction(Router.ensureAccountIsAdmin, {only: adminRoutes});
}

// We want here to be a table of content for routes. All of the other stuff
// will be put into individual controller files.
Router.map(function () {
    
    /* XXX TODO: Change the list below into single-line list. Only path is enough,
       controller and template are automatically detected based on naming scheme
    */
    
    this.route('home', {path: '/'});

    this.route('publicList', {
        path: '/publicList/:limit?',
        template: 'publicList',
        controller: PublicURLsController
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
            return Meteor.subscribe('urlData', this.params.shortURL);
        }
    });

    this.route('userPage', {
        path: '/manage',
        //userId: Meteor.userId(), // this is not possible, I can't user userId() here, so...
        data: function() { return URLs.find( {}, {sort:{timeModified: -1, timeCreated: -1}}); }, // user find() here since I have already filer the result set from publication code
        waitOn: function() { return Meteor.subscribe('userURLs' /*, this.userId*/ ); } // ... I can't pass userId to publication this way (I must user 'this.userId' in the publication code
    });

    this.route('urlEdit', {
        path: '/edit/:shortURL',
        controller: urlEditURLController
    });

    this.route('redirect', {
        path: '/:shortURL',
        controller: URLRedirectController
    });
});


Router.before(function() {
    Errors.clearSeen();
});
