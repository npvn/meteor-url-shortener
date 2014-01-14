getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};


getReservedPaths = function() {
    var paths = [ ];
    for (i = 0; i < Router.routes.length; i++) paths.push( Router.routes[i].originalPath.slice(1) );
    paths = _.union(paths, ['undefined', 'admin', 'help', 'support', 'contact']);
    return paths;
};

extractHost = function(targetURL) {
    var tempElement = document.createElement('a');
    tempElement.href = targetURL;
    setTimeout(function() { $(tempElement).remove(); }, 2000);
    return tempElement.host;
};

processRootURL = function(rootURL) {
    if ( rootURL.substring(0,8) === 'https://' ) rootURL = rootURL.slice(8);
    else if ( rootURL.substring(0,7) === 'http://' ) rootURL = rootURL.slice(7);

    if ( rootURL.charAt(rootURL.length - 1) === '/' ) rootURL = rootURL.slice(0, rootURL.length - 1);

    return rootURL;
};
