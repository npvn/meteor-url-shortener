Template.redirect.helpers({
    urlExist: function() {
        return ( !! this.targetURL); // if the short URL does not exist, then the data context (queried by router) will not be a valid URL object
    }
});


Template.redirect.rendered = function() {
    // Fire a JSONP request, this request will trigger the trackInfoAndRedirect() helper
    var script = document.createElement('script');
    script.setAttribute('src', 'http://smart-ip.net/geoip-json?callback=trackInfoAndRedirect');
    $('body').append(script);
    setTimeout(function() {$(script).remove(); }, 1000);
};