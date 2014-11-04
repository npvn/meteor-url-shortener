Meteor.methods({
    '/urls/count': function(type) {
        if ( type === 'public' ) return URLs.find({isPrivate: false}).count();
        else if ( type === 'own-url' ) return URLs.find({userId: this.userId}).count();
    }
});
