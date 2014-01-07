Template.urlPage.helpers({
   canBeDisplayed: function() {
       if (this.makePrivate) return ( Meteor.userId() === this.userId );
       else return true; // public URLs can always be displayed
   }
});