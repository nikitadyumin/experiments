/**
 * Created by ndyumin on 06.03.2016.
 */
require('babel-core/register');
const app = require('./app.js');
app.listen(process.env.NODE_PORT || 8080);