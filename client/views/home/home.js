Template.Home.events({


    'submit form': function(e) {
        e.preventDefault();

        if ( longURLValidationStatus && shortURLValidationStatus ) {
            var url = {
                targetURL: $(e.target).find('[name=longURLInput]').val(),
                shortURL: $(e.target).find('[name=shortURLInput]').val(),
                makePrivate: $(e.target).find('[name=makePrivate]').is(':checked')
            }

            Meteor.call('/url/submit', url, extractHost(url.targetURL), function(error, result) {
                if (error) Errors.throw(error.reason);
                else Router.go('urlPage', {shortURL: result}); // go the the page listing url details
            });
        }

    },


    // Validate shortURL
    'input #shortURLInput': executeShortURLValidation,

    'mouseover #checkboxTooltip': function(e) {
        $(e.target).tooltip('toggle');
    }
});



Template.Home.rendered = function() {
    $('#shortURLInput').val(''); // bug fix: switching from 'urlEdit' to 'home' see the previous shortURL in short URL input form
    setupTargetURLValidation();
};
