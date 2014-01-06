Template.userPage.helpers({
   hostname: getHostname(),
   hasURL: function() {
       return URLs.find({ userId: Meteor.userId() }).count();
   }
});