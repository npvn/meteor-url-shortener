Meteor.publish('userURLs', function() {
    return URLs.find({ userId: this.userId });
});
