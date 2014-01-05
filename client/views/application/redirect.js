Template.redirect.helpers({
    startRedirect: function() {
        if (this.targetURL) window.location=this.targetURL;
    }
});