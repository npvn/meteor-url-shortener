Meteor.publish('publicURLs', function(limit) {
    return URLs.find( {makePrivate: false}, {sort: {timeCreated:-1},limit: limit} );
});
