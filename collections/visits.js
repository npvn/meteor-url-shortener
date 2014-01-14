Visits = new Meteor.Collection('visits');

Visits.allow({
    insert: function(userId, doc) {
        console.log(doc);
        var allowedFields = ['_id', 'shortURL', 'browser', 'os', 'country'];

        for (var prop in doc) {
            if ( ! _.contains(allowedFields, prop) ) return false;
        }

        return true;
    }
});