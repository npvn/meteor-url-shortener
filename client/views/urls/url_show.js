Template.URLShow.helpers({
   urlExist: function() { return !! this.urlData },
   canBeDisplayed: function() {
       if (this.makePrivate) return ( Meteor.userId() === this.userId );
       else return true; // public URLs can always be displayed
   },

   isOwnURL: function() {
        return this.userId && this.userId === Meteor.userId();
   },

   displayChart: function(category) {
        nv.addGraph(function() {
            var width = 270,
                height = 270;

            var chart = nv.models.pieChart()
                .x(function(d) { return d.key; })
                .y(function(d) { return d.y; })
                .color(d3.scale.category10().range())
                .width(width)
                .height(height)
                .showLegend(false)
                .valueFormat(d3.format('d'));

            d3.select('#' + category + 'Stats' + ' svg')
                .datum(aggregateStatistics(Visits.find(), category))
                .transition().duration(1200)
                .attr('width', width)
                .attr('height', height)
                .call(chart);

            //chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

            return chart;
        });
   },

   render404: function() {
       Router.current().render('notFound');
   }
});


Template.URLShow.rendered = function() {
    $('.clippy').clippy();
};
