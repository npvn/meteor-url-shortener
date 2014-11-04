Meteor.publish('url', function(shortURL) {
    var url = URLs.findOne({shortURL: shortURL});
    
    if (!url) return this.ready();        
    
    // Hide private data if the subscriber doesn't have permission to access this link
    if ( url.isPrivate && url.userId !== this.userId ) {
        return URLs.find({shortURL: shortURL}, {fields: {shortURL: 1}});
    }

    return URLs.find({shortURL: shortURL});
});
