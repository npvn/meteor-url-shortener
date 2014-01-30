Template.userPage.helpers({
   hasURL: function() {
       return URLs.find({ userId: Meteor.userId() }).count();
   },

   privateOrPublic: function() {
       return this.makePrivate ? 'private' : 'public';
   }
});