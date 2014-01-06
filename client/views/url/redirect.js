Template.redirect.helpers({
    urlExist: function() {
        if (this.targetURL) return true;
        else return false; // if the short URL does not exist, then the data context (queried by router) will not be a valid URL object
    },
    processRedirection: function() {
        var targetURL = this.targetURL;

        // Since I have set the current data context to be reactive, I have to use a server-side method to update visit count (instead of updating on client-side)
        Meteor.call('incrementVisitCount', this._id , function(error, result) {
            if (error) Errors.throw(error.reason);
            else window.location = targetURL; // console.log(result);
        });
    }
});