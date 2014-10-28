Meteor.publish('urlData', function(shortURL) {
    return [
        URLs.find({ shortURL: shortURL}),
        Visits.find({ shortURL: shortURL })
    ]
});
