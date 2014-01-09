Handlebars.registerHelper('getHostName', function() {
    var a = document.createElement('a');
    a.href = '/';
    return a.hostname === 'localhost' ? 'mydomain.com' : a.hostname;
});

Handlebars.registerHelper('pluralize', function(n, thing) {
    if (n === 0) return '0 ' + thing;
    else if (n === 1) return '1 ' + thing;
    else return n + ' ' + thing + 's'
});