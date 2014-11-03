/*
    Record information about browser, os and country.
    This method can be called on both client-side and server-side redirection.
    
    When called by server, clientIP and userAgent are retrieved via the this.request
    object inside the route function.
    
    When called by client these information are provided by the headers package.
    
    This method uses a very basic technique to determine browser and OS, 
    thus the result may not be 100% accurate.
    
    For country, we use the geoip package, which makes use of the database
    provided by MaxMind to lookup country from IP.
*/

Meteor.methods({
    '/visit/insert': function(shortURL, clientIP, userAgent) {        
        var url = URLs.findOne({shortURL: shortURL})
            , userId = this.userId;

        // Check if this visit is qualified to be recorded
        
        if (!url) {
            throw new Meteor.Error('link-not-found', "The short link '" + shortURL + "' does not exist.");
        }
        
        if ( url.isPrivate && (!userId || userId !== url.userId) ) {
            throw new Meteor.Error('not-authorized', 'This link is private and you are not its owner.');
        }
                
        // Start generating statistical data
        
        clientIP = clientIP || headers.methodClientIP(this);        
        userAgent = userAgent || headers.get(this)['user-agent'];

        var browser;
        if ( userAgent.indexOf('Firefox') >= 0 ) browser = 'Firefox';
        else if ( userAgent.indexOf('Chrome') >= 0 ) browser = 'Chrome';
        else if ( userAgent.indexOf('Safari') >= 0 && userAgent.indexOf('Chrome') < 0 ) browser = 'Safari';
        else if ( userAgent.indexOf('Opera') >= 0 ) browser = 'Opera';
        else if ( userAgent.indexOf('Trident') >= 0 ) browser = 'IE';
        else browser = 'Others';

        var os;
        if ( userAgent.indexOf('Win') >= 0 ) os = 'Windows';
        else if ( userAgent.indexOf('Mac') >= 0 ) os = 'MacOS';
        else if ( userAgent.indexOf('X11') >= 0 ) os = 'Unix';
        else if ( userAgent.indexOf('Linux') >= 0 ) os = 'Linux';
        else os = 'Others';
                
        var geoData = GeoIP.lookup(clientIP)
            , country = geoData ? App.getCountryName(geoData.country) : 'Unknown';

        Visits.insert({
            shortURL: shortURL,
            browser: browser,
            os: os,
            country: country
        });

        // XXX Denormalization
        URLs.update({shortURL: shortURL}, {$inc: {visitCount: 1}});

        return url.targetURL;
    }
});
