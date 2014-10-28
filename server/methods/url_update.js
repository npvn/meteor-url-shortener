Meteor.methods({
    '/url/update': function(urlAttributes) {
        var shortURL;
        var currentShortURL = URLs.findOne(urlAttributes._id).shortURL;

        // targetURL can't be empty
        if ( ! urlAttributes.targetURL ) throw new Meteor.Error(422, 'The target URL cannot be empty.')

        // If user hasn't modified the shortURL
        if (urlAttributes.shortURL === currentShortURL) shortURL = currentShortURL;
        // If user choose another shortURL
        else if (urlAttributes.shortURL !== currentShortURL) {
            // Check if the chosen short url is unique
            if ( URLs.findOne({ shortURL: urlAttributes.shortURL }) || _.contains( getReservedPaths(), urlAttributes.shortURL ) ) throw new Meteor.Error(302, 'The chosen short URL is not available.')
            else shortURL = urlAttributes.shortURL;
            // If user leave the shortURL empty
        } else {
            var numberOfDigits = getRandomInt(3, 9);
            shortURL = Random.hexString(numberOfDigits);
            // Make sure it is unique
            while ( URLs.findOne({ shortURL: shortURL}) || _.contains( getReservedPaths(), shortURL ) ) shortURL = Random.hexString(numberOfDigits);
        }


        // Update in db
        URLs.update( {_id: urlAttributes._id}, {$set: {
            shortURL: shortURL,
            targetURL: urlAttributes.targetURL,
            makePrivate: urlAttributes.makePrivate,
            timeModified: (new Date()).getTime()
        }
        });

        // If everything is OK
        return shortURL;
    }
});
