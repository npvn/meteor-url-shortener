Meteor.publish('singleURL', function(shortURL) {
   return URLs.find();
});