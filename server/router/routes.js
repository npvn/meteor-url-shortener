// Server side routing (for faster URL redirection)
// If :shortURL is a private link, we'll switch to client-side redirection
// since user authorization is needed
Router.route('/:shortURL', function () {
    if (this.params.shortURL === 'favicon.ico') return;

    var request = this.request
        , response = this.response
        , url = URLs.findOne({shortURL: this.params.shortURL})
        , location;

    // Not found
    if (!url) location = Router.path('not.found');

    // For private links, go to client side to authorize the requester
    else if (url.isPrivate) {
      // XXX TODO Have 'url.redirect' route defined on server, so Router.path can be used
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
}, {where: 'server'});
