Template.home.events({
    'submit form': function(e) {
        e.preventDefault();

        var url = {
            targetURL: $(e.target).find('[name=longURL]').val(),
            shortURL: $(e.target).find('[name=shortURL]').val(),
            makePrivate: $(e.target).find('[name=makePrivate]').is(':checked')
        }

        Meteor.call('submitURL', url, function(error, result) {
           if (error) Errors.throw(error.reason);
           else Router.go('urlPage', {shortURL: result}); // go the the page listing url details
        });

        console.log(getRoutePaths());

    }
});