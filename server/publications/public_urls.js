Meteor.publish('publicURLs', function(limit) {
    return URLs.find({isPrivate: false}, {limit: limit});
});
