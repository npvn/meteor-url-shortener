URLs = new Meteor.Collection('urls');


URLs.allow({
   // Only the owning account can edit/update url details
   update: function(userId, doc) {
       return doc && doc.userId === userId;
   }
});


URLs.deny({
   update: function(userId, doc, fieldNames) {
        // Can only update the fields below
        return ( _.without(fieldNames, 'shortURL', 'targetURL', 'makePrivate', 'timeModified').length > 0 );
   }
});

