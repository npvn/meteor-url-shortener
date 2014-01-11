Handlebars.registerHelper('getHostName', function() {
    var a = document.createElement('a');
    a.href = '/';
    var host = a.host;
    $(a).remove();
    return host; // a.hostname === 'localhost' ? a.hostname+':3000' : a.hostname;
});

Handlebars.registerHelper('pluralize', function(n, thing) {
    if (n === 0) return '0 ' + thing;
    else if (n === 1) return '1 ' + thing;
    else return n + ' ' + thing + 's'
});