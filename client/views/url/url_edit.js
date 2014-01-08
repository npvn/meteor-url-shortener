Template.urlEdit.helpers({
    isChecked: function() {
        if (this.makePrivate) return 'checked';
        else return '';
    },
    isOwnURL: function() {
        return this.userId && this.userId === Meteor.userId(); // guard from null === null
    },
    reasonCannotEdit: function() {
        if ( !this.userId && !this.makePrivate ) return 'Anonymous public URLs cannot be edited.';
        else return 'Only the author can edit details of this URL.';
    }
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