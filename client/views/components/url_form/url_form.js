Template.UrlForm.helpers({
    tooltip: function() {
        return Meteor.user() ? 'Make this link private' 
                             : 'Please login to make this link private';
    }
    , updateFloatingLabels: function() {
        var $targetURLLabel = $('input[name="targetURL"]').next('.floating-label')
            , $shortURLLabel = $('input[name="shortURL"]').next('.floating-label');
        
        if ( App.isKeyInvalid('targetURL') ) $targetURLLabel.text('The URL is invalid');
        else $targetURLLabel.text('Paste your long URL here');
        
        if ( App.isKeyInvalid('shortURL') ) $shortURLLabel.text('Short link is invalid');
        else $shortURLLabel.text('Custom short link');
    }    
});


Template.UrlForm.rendered = function() {
    if ( this.data && this.data.isPrivate ) $('input[name="isPrivate"]').attr('checked', true);
    $('#isPrivate').tooltip();
};


// URL form submit event
AutoForm.hooks({
    'url-form': {
        onSubmit: function(doc) {
            var urlId = $(this.event.target).attr('data-url-id');
            Template.instance().mediator.submitURL(urlId, doc);
            this.done();
            return false;
        }
    }
});
