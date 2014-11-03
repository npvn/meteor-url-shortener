Template.UrlEdit.helpers({
    accessible: function() {
        return this.userId && this.userId === Meteor.userId();
    }
});

Template.UrlEdit.rendered = function() {
    // Trigger material design effects
    $.material.init();
};
