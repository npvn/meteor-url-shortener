// Server side routing (for faster URL redirection)
// If :shortURL is a private link, we'll switch to client-side redirection
// since user authorization is needed
Picker.route('/:shortURL', function (params, request, response, next) {
    if (params.shortURL === 'favicon.ico') next();

    var location
        , url = URLs.findOne({shortURL: params.shortURL});

    // Not found
    if (!url) location = Meteor.absoluteUrl() + 'url/not-found';

    // For private links, go to client side to authorize the requester
    else if (url.isPrivate) {
      location = Meteor.absoluteUrl() + 'redirect/' + url.shortURL;
    }

    // For public links, record statistical data and process redirection
    else {
        var clientIP = (request.headers['x-forwarded-for'] || '').split(',')[0]
                       || request.connection.remoteAddress
                       || request.socket.remoteAddress
                       || request.connection.socket.remoteAddress

            , userAgent = request.headers['user-agent'];

        // Record statistical data
        Meteor.call('/visit/insert', url.shortURL, clientIP, userAgent);

        location = url.targetURL;
    }

    response.writeHead(302, {'Location': location});
    response.end();
});
