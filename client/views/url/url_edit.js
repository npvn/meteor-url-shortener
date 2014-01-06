Template.urlEdit.helpers({
    hostname: function() { return getHostname(); },
    isChecked: function() {
        if (this.makePrivate) return 'checked';
        else return '';
    },
    isOwnURL: function() { return this.userId === Meteor.userId(); }
});


Template.urlEdit.events({
   'submit form': function(e) {
       e.preventDefault();

       var url = this;
       url.shortURL = $(e.target).find('[name=shortURL]').val();
       url.targetURL = $(e.target).find('[name=targetURL]').val();
       url.makePrivate = $(e.target).find('[name=makePrivate]').is(':checked');

       Meteor.call('updateURL', url, function(error, result) {
           if (error) Errors.throw(error.reason);
           else Router.go('urlPage', {shortURL: result});
       });

   }
});