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

    },

    'click #viewPublicURLs': function(e) {
        e.preventDefault();

        // If currently on home, redirect to homeWithPublicList
        if (Router.current().route.name === 'home') Router.go('homeWithPublicList', {limit: 7});
        // If currently on homeWithPublicList, clicking the button will show/hide URLs list
        else {
            var urlsList = $('#publicList');
            if (urlsList.hasClass('isHidden')) urlsList.removeClass('isHidden').slideDown();
            else urlsList.addClass('isHidden').slideUp();
        }
    }
});


// Hide public URLs list on load
Template.home.rendered = function() {
    if (Router.current().route.name !== 'homeWithPublicList') $('#publicList').hide();
};