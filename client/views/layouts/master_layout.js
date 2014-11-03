Template.MasterLayout.helpers({
    notification: function () {
        return Session.get('notification');
    }
    , uiClass: function () {
        return Session.get('show-notification');
    }
});
