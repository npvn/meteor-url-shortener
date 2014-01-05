Template.userPage.helpers({
   hostname: getHostname(),
   hasURL: function() {
       console.log(this.data);
       return URLs.find({ userId: Meteor.userId() }).count();
   }
});