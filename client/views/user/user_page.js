Template.userPage.helpers({
   hasURL: function() {
       return URLs.find({ userId: Meteor.userId() }).count();
   }
});