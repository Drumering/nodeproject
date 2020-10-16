// Requiring libs
const express = require('express');
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const sesssion = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

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

// Make public folder as global
app.use(express.static(__dirname + '/public'));

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

//Settings passport
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/User');
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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