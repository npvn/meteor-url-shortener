getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

getHostname = function() {
    var a = document.createElement('a');
    a.href = '/';
    return a.hostname;
};