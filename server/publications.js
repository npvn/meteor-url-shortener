Meteor.publish('singleURL', function(shortURL) {
   return URLs.find({ shortURL: shortURL}); /* NOTE: can't user findOne here */
});

Meteor.publish('userURLs', function() {
   return URLs.find({ userId: this.userId });
});