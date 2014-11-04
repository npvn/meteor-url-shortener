Meteor.publish('urlVisits', function(shortURL) {
    var url = URLs.findOne({shortURL: shortURL});

    if (!url) return this.ready();
    if ( url.isPrivate && url.userId !== this.userId ) return this.ready();
    
    return Visits.find({shortURL: shortURL});       
});
