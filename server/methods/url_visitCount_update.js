Meteor.methods({
    '/url/visitCount/update': function(id) {
        URLs.update( {_id: id}, {$inc: {numVisit: 1}} );
    }
});
