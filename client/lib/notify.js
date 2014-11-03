Notify = {

};

Notify.success = Notify.info = Notify.error = function(config, msg){
    if(_.isString(config)){
        config = { msg: config };
        if(_.isString(msg)){
            config.msg += "<br>" + msg;
        }
    }
    Notify.notify(config);
};

Notify.notify = function(config){
    if(config.title || config.text){
        config.msg = config.title + " " + config.text;
    }
    $.snackbar({
        content: config.msg
        , style: "toast"
        , timeout: 5000
    }).snackbar('show');
};

Notify.subscribe = {
    onError: function (error) {
        console.log(error);
        Notify.notify({
            msg: "Couldn't get data: " + error.reason
        });
    }
};
