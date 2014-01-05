URLs = new Meteor.Collection('urls');

Meteor.methods({
   submitURL: function(urlAttributes) {
       /* I WILL THINK OF AN ALGORITHM FOR RANDOM URL GENERATION LATER */

       // Check if the chosen short url is unique
       if (URLs.findOne({ shortURL: urlAttributes.shortURL })) throw new Meteor.Error(302, 'The chosen URL is not available.')

       // Build the new url
       var url = _.extend(_.pick(urlAttributes, 'targetURL', 'shortURL', 'makePrivate'), {
           userId: Meteor.userId(),
           timeCreated: (new Date()).getTime(),
           timeModified: undefined,
           numVisit: 0
       });

       // Insert into db
       return URLs.insert(url);
   }
});