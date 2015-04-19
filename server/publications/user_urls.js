Meteor.publish('userURLs', function() {
    return URLs.find({userId: this.userId}, {
        sort: {timeModified: -1, timeCreated: -1}
    });
});
