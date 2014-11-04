Template.UrlShow.helpers({
    accessible: function() {
        // XXX If this link is private, targetURL and other properties are published
        // XXX only to link owner, thus it can be use to check client access permission
        return this.targetURL;
    }
    , displayChart: function(category) {
        App.displayChart(category);
    }
});

Template.UrlShow.rendered = function() {
    $.material.init();
    $('h2').selectText();
};

Template.UrlShow.events({
    'click h2': function(e) {
        $(e.target).selectText();
    }
});
