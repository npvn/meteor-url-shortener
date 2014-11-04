Meteor.publish('userURLs', function(limit) {
    return URLs.find({userId: this.userId}, {limit: limit});
});
