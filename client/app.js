
App.subs = {
  userData: Meteor.subscribe('current_user_data')
};

// App admin code like Meteor.startup or 
// Deps.autorun will stay in this file
Deps.autorun(function() {
  
});

App.login = function (email, password, cb) {

  onLogin = function (err) {
    cb && cb(err);
  };

  Meteor.loginWithPassword(email, password, onLogin);
};


App.logout = function (cb) {
  var onLogout = function (err) {
    if (cb){
      cb(err);
    }else{
      Router.go('home');
    }
  };

  Meteor.logout(onLogout);
};

// Will be fired as callback for a JSONP request (see Template.redirect.rendered event)
App.trackInfoAndRedirect = function(jsonpData) {
    var agent = navigator.userAgent;
    var currentData = URLs.findOne();

    // Very basic (and not totally accurate) browser info recording
    var browser;
    if ( agent.indexOf('Firefox') >= 0 ) browser = 'Firefox';
    else if ( agent.indexOf('Chrome') >= 0 ) browser = 'Chrome';
    else if ( agent.indexOf('Safari') >= 0 && agent.indexOf('Chrome') < 0 ) browser = 'Safari';
    else if ( agent.indexOf('Opera') >= 0 ) browser = 'Opera';
    else if ( agent.indexOf('Trident') >= 0 ) browser = 'IE';
    else browser = 'Others';

    var os;
    if ( agent.indexOf('Win') >= 0 ) os = 'Windows';
    else if ( agent.indexOf('Mac') >= 0 ) os = 'MacOS';
    else if ( agent.indexOf('X11') >= 0 ) os = 'Unix';
    else if ( agent.indexOf('Linux') >= 0 ) os = 'Linux';
    else os = 'Others';


    if ( currentData && (!_.contains(getReservedPaths(), currentData.shortURL)) ) { // if user trying to access a non-existent shortURL, currentData will be undefined

        // Add new tracking record Visits db
        Visits.insert( {
            shortURL: currentData.shortURL,
            browser: browser,
            os: os,
            country: jsonpData.countryCode ? jsonpData.countryCode : 'Unknown'
        } );

        // Update numVisit in URLs collection, then process redirection
        // Since I have set the current URLs data context to be reactive, I have to use a server-side method do this
        Meteor.call('/url/visitCount/update', currentData._id , function(error, result) {
            if (error) Errors.throw(error.reason);
            else window.location = currentData.targetURL;
        });
    }
};

App.aggregateStatistics = function(cursor, fieldName) {
    var resultObj = { }; // e.g. {Firefox: 3, Chrome: 6, IE: 1}
    var resultArray = [ ]; // e.g. [ {Firefox: 3}, {Chome: 6}, {IE: 1} ]

    cursor.forEach(function(doc) {
        var statisticsItem = doc[fieldName]; // e.g. for fieldName = 'browser', statisticsItem = 'Firefox'
        if ( resultObj[statisticsItem] ) resultObj[statisticsItem]++;
        else resultObj[statisticsItem] = 1;
    });


    for (prop in resultObj) {
        var tempObj = { };
        tempObj.key = prop; // have to do this, since I can't resultArray.push( {prop: resultObj[prop]} ) - the field name will end up being 'prop'
        tempObj.y = resultObj[prop];
        resultArray.push( tempObj );
    }

    return resultArray;

};

extractHost = function(targetURL) {
    var tempElement = document.createElement('a');
    tempElement.href = targetURL;
    setTimeout(function() { $(tempElement).remove(); }, 2000);
    return tempElement.host;
};


//Global Helpers are also in here!
Helpers = {};

Helpers.getHostName = function() {
    return window.location.host;
};

Helpers.pluralize = function(n, thing) {
    if (n === 0) return '0 ' + thing;
    else if (n === 1) return '1 ' + thing;
    else return n + ' ' + thing + 's'
};

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper)
});
