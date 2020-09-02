const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');
const helpers = require('./helpers');

//Configs
const app = express();
app.use((req, res, next)=>{
    res.locals.h = helpers;
    next();
});
app.use('/', router);
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');
app.use(express.json());

module.exports = app;