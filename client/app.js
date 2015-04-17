


Meteor.startup(function() {
    Router.onAfterAction(function() {
        // Set page title for each route
        document.title = this.title + ' | URL Shortener';
        // Initiate Material Design
        Meteor.defer(function() {
            $.material.init();
        });
    });
});


App.subs = {
    userData: Meteor.subscribe('current_user_data')
};


App.login = function (email, password, cb) {

    onLogin = function (err) {
        cb && cb(err);
    };

    Meteor.loginWithPassword(email, password, onLogin);
};


App.logout = function (cb) {
    var onLogout = function (err) {
        if (cb){
            cb(err);
        }else{
            Router.go('home');
        }
    };

    Meteor.logout(onLogout);
};


App.displayChart = function(category) {    
    nv.addGraph(function() {        
        var width
            , height                        
            , statistics = App.aggregateData(Visits.find({
                               shortURL: Router.current().params.shortURL
                           }), category);
        
        // XXX TODO Make the charts responsive by automatically redraw them
        // XXX on viewport resize event
        width = height = $('.col-sm-4').width() * (95/100);

        var chart = nv.models.pieChart()
            .x(function(d) { return d.key; })
            .y(function(d) { return d.y; })
            .showLabels(true)
            .labelThreshold(.05)
            .labelType("key")
            .color( d3.scale.category10().range().slice().splice(2) )
            .width(width)
            .height(height)
            .showLegend(false)
            .donut(true)
            .donutRatio(0.35)
            .valueFormat(d3.format('d'));

        d3.select('#' + category + '-chart' + ' svg')
            .datum(statistics)
            .transition().duration(1000)
            .attr('width', width)
            .attr('height', height)
            .call(chart);
        
        // Reset previous chart title before inserting a new one
        $('#' + category + '-chart svg text').filter('[is-chart-title]').remove();
        d3.select('#' + category + '-chart' + ' svg')
            .append("text")
            .attr("x", width/2)
            .attr("y", _.isEmpty(statistics) ? height/3 : height/2 + 10)
            .attr("text-anchor", "middle")
            .attr("is-chart-title", true)                
            .style("font-weight", "bold")
            .text( 'By ' + (category === 'os' ? 'OS' : category.charAt(0).toUpperCase() + category.slice(1)) );
        
        return chart;
    });
};


// Generate an array of aggregated data for a given category
App.aggregateData = function(cursor, category) {
    var resultObj = { }; // e.g. {Firefox: 3, Chrome: 6, IE: 1}
    var resultArray = [ ]; // e.g. [ {Firefox: 3}, {Chrome: 6}, {IE: 1} ]

    // Populate resultObj
    cursor.forEach(function(doc) {
        var value = doc[category]; // e.g. category = 'browser', value = 'Firefox'
        if ( resultObj[value] ) resultObj[value]++;
        else resultObj[value] = 1;
    });

    // Populate resultArray
    for (var prop in resultObj) {
        var obj = { };
        obj.key = prop;
        obj.y = resultObj[prop];
        resultArray.push(obj);
    }

    return resultArray;
};


App.extractHost = function(targetURL) {
    var el = document.createElement('a');
    el.href = targetURL;
    setTimeout(function() { $(el).remove(); }, 1000);
    return el.host;
};


App.isKeyInvalid = function(keyName) {
    // Array of invalid keys - a reactive data-source
    var invalidKeys = AutoForm.getValidationContext('url-form').invalidKeys();
    
    return _.any(invalidKeys, function(key) {
        return key.name === keyName;
    });
};


//Global Template Helpers
Helpers = {};


Helpers.getHostName = function() {
    return window.location.host;
};


Helpers.pluralize = function(n, thing) {
    if (n === 0) return '0 ' + thing;
    else if (n === 1) return '1 ' + thing;
    else return n + ' ' + thing + 's'
};


_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper)
});
