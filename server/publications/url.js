Meteor.publish('url', function(shortURL) {
    return URLs.find({ shortURL: shortURL});
});
