/*Template.redirect.helpers({
    startRedirect: function() {
        //if (this.targetURL) {

            Meteor.call('incrementVisitCount', {_id: this._id}, function(error, result) {
                if (error) Errors.throw(error.reason);
                else console.log(result); //window.location = result;
            });
        //}


    }
});*/

Template.redirect.rendered = function() {
  console.log('test');
};