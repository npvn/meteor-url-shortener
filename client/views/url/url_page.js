Template.urlPage.helpers({
   urlExist: function() { return !! this.urlData },
   canBeDisplayed: function() {
       if (this.makePrivate) return ( Meteor.userId() === this.userId );
       else return true; // public URLs can always be displayed
   },

   isOwnURL: function() {
        return this.userId && this.userId === Meteor.userId();
   },

   getStatistics: function(category) {
       var result = aggregateStatistics( Visits.find(), category );
       return result;
   },

   printStatistics: function(item) {
       var numVisit = URLs.findOne({ shortURL: Router.current().params.shortURL }).numVisit;

       for (prop in item) // this one-time iteration is to get the prop name
           return prop + ': ' + item[prop] + ' (' + ( (item[prop]/numVisit)*100 ).toFixed(1) + '%)';

   },

   render404: function() {
       Router.current().render('notFound');
   }
});