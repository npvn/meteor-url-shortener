Template.UrlList.helpers({
    onUserUrlIndexRoute: function() {
        return Router.current().route.getName() === 'user.url.index';
    }
    , visibility: function() {
        return this.isPrivate ? 'Private' : 'Public';
    }
});
