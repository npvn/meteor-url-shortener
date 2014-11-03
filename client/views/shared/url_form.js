Template.URLForm.helpers({
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


Template.URLForm.rendered = function() {
    if ( this.data && this.data.isPrivate ) $('input[name="isPrivate"]').attr('checked', true);
    $('#isPrivate').tooltip();
    $.material.init();
};


// URL form submit event
AutoForm.hooks({
    'url-form': {
        onSubmit: function(doc) {
            var self = this            
                , urlId = $(this.event.target).attr('data-url-id');
            
            // Updating an existing url
            if (urlId) {
                _.extend(doc, {_id: urlId});
            // Creating a new url
            } else {
                _.extend(doc, {
                    userId: Meteor.userId(),
                    timeCreated: new Date()
                });
            }            
                        
            Meteor.call('/url/upsert', doc, App.extractHost(doc.targetURL), function(error, result) {
                if (error) {
                    Notify.error(error.reason);
                }
                else {
                    self.done();
                    
                    if ( Router.current().route.getName() === 'home' ) {
                        Router.go('url.show', {shortURL: result});
                    } else {
                        Router.go('user.url.index', {shortURL: result});
                    }                    
                }
            });
            
            return false;
        }
    }
});
