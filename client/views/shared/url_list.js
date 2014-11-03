Template.UrlList.helpers({
    hasMoreURLs: function() {
        var limit = Router.current().limit
            , type = Router.current().route.getName() === 'public.url.index' ? 'public' : 'own-url';

        Meteor.call('/urls/count', type, function(error, result) {
            if (error) Notify.error(error.reason);
            else Session.set('totalURLs', result);
        });

        return limit && limit() < Session.get('totalURLs');
    }
    , onUserUrlIndexRoute: function() {
        return Router.current().route.getName() === 'user.url.index';
    }
    , visibility: function() {
        return this.isPrivate ? 'Private' : 'Public';
    }
});
