Template.UrlList.helpers({
    onUserUrlIndexRoute: function() {
        return FlowRouter.current().route.name === 'user.url.index';
    }
    , visibility: function() {
        return this.isPrivate ? 'Private' : 'Public';
    }
});
