Template.redirect.helpers({
    urlExist: function() {
        return ( !! this.targetURL); // if the short URL does not exist, then the data context (queried by router) will not be a valid URL object
    },
    targetURLQuery: function() {
        // Have to use this helper instead of just {{targetURL}}. Meteor is getting
        // the 'previous' data context object and thus displaying 'Redirecting to [previous targetURL]'
        // Note that the query below is executed on the data of 'publicList' route, which is reactive,
        // a 'reactive loop' will appear and the redirect page is rendered again and again, I have set
        // {reactive: false} to fix this. Should report this unexpected behavior to the Iron-Router team
        return URLs.findOne({ shortURL: Router.current().params.shortURL }, {reactive: false}).targetURL;
    }
});


Template.redirect.rendered = function() {

    // Fire a JSONP request, this request will trigger the trackInfoAndRedirect() helper
    var script = document.createElement('script');
    script.setAttribute('src', 'http://smart-ip.net/geoip-json?callback=trackInfoAndRedirect');
    $('body').append(script);
    setTimeout(function() {$(script).remove(); }, 1000);
};