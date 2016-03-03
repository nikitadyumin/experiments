const qs = require('qs');
const result = qs.parse(document.location.search.substring(1));
window.render = (html) => document.getElementById("playground").innerHTML = html;
System.paths['__example__'] = result.folder;

System.import('__example__').catch(function (errorMessage) {
    document.body.innerHTML = errorMessage;
}).then(function () {
});