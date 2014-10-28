Template.URLPublicIndex.helpers({
    publicURLsExist: function() {
        return this.publicURLs ? !!this.publicURLs.count() : false;
    },
    hasMorePublicURLs: function() {
        if (this.publicURLs) {
            this.publicURLs.rewind();
            if (Router.current().limit) return Router.current().limit() === this.publicURLs.count(); // guard this line by an 'if' to fix an exception when clicking '[num] visits' on homepage
        }
    }
});


Template.URLPublicIndex.rendered = function() {
    $('#publicList').removeClass('isHidden').hide().slideDown();
};

