Template.header.helpers({

    isActive: function(name) {
        return name === Router.current().route.name ? 'active' : '';
    }

});
