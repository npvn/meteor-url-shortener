getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

getHostname = function() {
    var a = document.createElement('a');
    a.href = '/';
    return a.hostname;
};

getRoutePaths = function() {
    var paths = [ ];
    for (i = 0; i < Router.routes.length; i++) paths.push( Router.routes[i].originalPath.slice(1) );
    return paths;
};