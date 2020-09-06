// Requiring libs
const express = require('express');
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const sesssion = require('express-session');
const flash = require('express-flash');

// Requiring templates
const router = require('./routes/index');
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandler');

// Settings
const app = express();

// Settings json and urlEncoded
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Settings flash messages
app.use(cookieParser(process.env.SECRET));
app.use(sesssion({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Settings helpers
app.use((req, res, next)=>{
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

// Route settings
app.use('/', router);

// 404 settings
app.use(errorHandler.notFound);

/*
    Info to mustache lib about partials and your extensions
    Info to mustache about engine that will use and your extensions
    Info to mustache about the view and where is locate
*/
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;