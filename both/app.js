App = {};

App.getReservedPaths = function() {
    var paths = [ ];
    for (i = 0; i < Router.routes.length; i++) paths.push( Router.routes[i].originalPath.slice(1) );
    paths = _.union(paths, ['undefined', 'admin', 'help', 'support', 'contact']);
    return paths;
};
