Handlebars.registerHelper('getHostName', function() {
    var a = document.createElement('a');
    a.href = '/';
    return a.hostname;
});