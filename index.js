const qs = require('qs');
const result = qs.parse(document.location.search.substring(1));

System.paths['__example__'] = result.folder;

System.import('__example__').catch((errorMessage) => {
    console.error(errorMessage);
});