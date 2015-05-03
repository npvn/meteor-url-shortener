App = {};


App.getReservedPaths = function() {
    return [ 'public', 'show', 'edit', 'user', 'undefined', 'admin', 'help',
             'support', 'contact' ];
};


App.processRootURL = function(rootURL) {
    if ( rootURL.substring(0,8) === 'https://' ) rootURL = rootURL.slice(8);
    else if ( rootURL.substring(0,7) === 'http://' ) rootURL = rootURL.slice(7);

    if ( rootURL.charAt(rootURL.length - 1) === '/' ) rootURL = rootURL.slice(0, rootURL.length - 1);

    return rootURL;
};


App.getCountryName = function(countryCode) {
    var country = _.find(Countries, function(country) {
        return country['alpha-2'] === countryCode;
    });
    
    return country ? country.name : 'Unknown';
};
