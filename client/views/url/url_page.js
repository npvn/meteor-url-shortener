Template.urlPage.helpers({
   hostname: function() {
       var a = document.createElement('a');
       a.href = '/';
       return a.hostname;
   }

});