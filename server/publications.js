Meteor.publish('singleURL', function(shortURL) {
   return URLs.find({ shortURL: shortURL}); /* NOTE: can't user findOne here */
});


Meteor.publish('userURLs', function() {
   return URLs.find({ userId: this.userId });
});


Meteor.publish('publicURLs', function(limit) {
   return URLs.find( {makePrivate: false}, {sort: {timeCreated:-1},limit: limit} );
});


Meteor.publish('urlStatistics', function(shortURL) {
   return Visits.find({ shortURL: shortURL });
});