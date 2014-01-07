Template.publicList.helpers({
    hasMorePublicURLs: function() {
        if (this.publicURLs) {
            this.publicURLs.rewind();
            return Router.current().limit() === this.publicURLs.count();
        }
    }
});


Template.publicList.rendered = function() {
    $('#publicList').removeClass('isHidden').hide().slideDown();
};

