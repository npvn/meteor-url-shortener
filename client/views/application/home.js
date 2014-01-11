Template.home.events({


    'submit form': function(e) {
        e.preventDefault();

        if ( urlValidationStatus ) {
            var url = {
                targetURL: $(e.target).find('[name=longURL]').val(),
                shortURL: $(e.target).find('[name=shortURL]').val(),
                makePrivate: $(e.target).find('[name=makePrivate]').is(':checked')
            }

            Meteor.call('submitURL', url, function(error, result) {
                if (error) Errors.throw(error.reason);
                else Router.go('urlPage', {shortURL: result}); // go the the page listing url details
            });
        }

    },


    // Validate shortURL
    'input #shortURLInput': function(e) {
        urlValidationStatus = true;
        $(e.target).val( $(e.target).val().trim() );
        var input = $(e.target).val();

        if ( input === '' ) ; // skip the test
        else {
            var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < input.length; i++) {
                if ( validChars.indexOf( input[i] ) === -1 ) {
                    urlValidationStatus = false;
                    $(e.target).tooltip('show');
                    break;
                }
            }

            if (urlValidationStatus) $(e.target).tooltip('hide');
        }

    },

    /*'click #viewPublicURLs': function(e) {
        e.preventDefault();

        // If currently on home, redirect to homeWithPublicList
        if (Router.current().route.name === 'home') Router.go('homeWithPublicList', {limit: 7});
        // If currently on homeWithPublicList, clicking the button will show/hide URLs list
        else {
            var urlsList = $('#publicList');
            if (urlsList.hasClass('isHidden')) urlsList.removeClass('isHidden').slideDown();
            else urlsList.addClass('isHidden').slideUp();
        }
    },*/

    'mouseover #checkboxTooltip': function(e) {
        $(e.target).tooltip('toggle');
    }
});



Template.home.rendered = function() {

    jQuery.validator.setDefaults({
        /*debug: true,*/
        success: "valid"
    });

    $( "#mainForm" ).validate({
        rules: {
            longURL: {
                required: true,
                url: true
            }
        }
    });

};