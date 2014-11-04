Template.UserUrlIndex.helpers({
   hasURL: function() {
       return URLs.find({userId: Meteor.userId()}).count();
   }
});

Template.UserUrlIndex.rendered = function() {
    // Trigger material design effects
    $.material.init();
};
