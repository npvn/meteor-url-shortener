Template.Header.helpers({

    isActiveRoute: function(name) {
        return name === Router.current().route.name ? 'active' : '';
    },

    defaultLimit: function() { return {limit: 10}; }

});
