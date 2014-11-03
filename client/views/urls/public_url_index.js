Template.PublicUrlIndex.helpers({
    hasPublicURLs: function() {
        return this.urls.count();
    }
});

Template.PublicUrlIndex.rendered = function() {
    // Trigger material design effects
    $.material.init();
};
