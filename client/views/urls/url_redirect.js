Template.UrlRedirect.helpers({
    accessible: function() {
        // XXX If this link is private, targetURL and other properties are published
        // XXX only to link owner, thus it can be use to check user's access permission
        return this.targetURL;       
    }
    , redirect: function() {
        // Record statistical data and process redirection
        Meteor.call('/visit/insert', this.shortURL, function(error, result) {
            if (error) Notify.error(error.reason);
            else window.location = result;
        });
    }
});

Template.UrlRedirect.rendered = function() {
    // Trigger material design effects
    $.material.init();
};
