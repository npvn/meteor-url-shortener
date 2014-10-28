App.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

App.processRootURL = function(rootURL) {
    if ( rootURL.substring(0,8) === 'https://' ) rootURL = rootURL.slice(8);
    else if ( rootURL.substring(0,7) === 'http://' ) rootURL = rootURL.slice(7);

    if ( rootURL.charAt(rootURL.length - 1) === '/' ) rootURL = rootURL.slice(0, rootURL.length - 1);

    return rootURL;
};
