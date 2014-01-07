Template.urlPage.helpers({
   canBeDisplayed: function() {
       console.log('Meteor.userId(): ' + Meteor.userId());
       console.log('this.userId: ' + this.userId);
       if (this.makePrivate) return ( Meteor.userId() === this.userId );
       else return true; // public URLs can always be displayed
   }
});