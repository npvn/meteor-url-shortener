Template.Header.helpers({
    isActiveRoute: function(name) {
        return name === Router.current().route.getName() ? 'active' : '';
    }
});

Template.Header.rendered = function() {
    // Trigger material design effects
    $.material.init();
};
