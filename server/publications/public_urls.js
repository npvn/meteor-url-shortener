Meteor.publish('publicURLs', function(limit) {
    return URLs.find({isPrivate: false}, {
        limit: limit
        , sort: {timeModified: -1, timeCreated: -1}
    });
});
