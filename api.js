'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const chalk = require('chalk');
const passport = require('passport');
const expressSession = require('express-session');
const keyExpressSession = require('./src/util/server').secreKeyExpress;
const passportInit = require('./src/passport/init');
const flash = require('connect-flash');

const api = express();

// import
const userRoutes = require('./src/routes/user');

// middleware
api.use(compression());
api.use(flash());
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());
api.use(expressSession({secret: keyExpressSession, saveUninitialized: true, resave: false}));
api.use(passport.initialize());
api.use(passport.session());

//init passport
passportInit(passport);

// core
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


// Rutas
api.use('/api', userRoutes);

// Manejo de errores
api.use((err, req, res, next) => {
    if (err.message.match(/not found/)) {
        return res.status(404).send({message: `${chalk.red(err)}`});
    }

    return res.status(500).send({message: `${chalk.red(err)}`});
});

module.exports = api;

