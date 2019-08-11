'use strict'
const UserModel = require('../models/user');
const login = require('./local/login');
const singUp = require('./local/singup');
const auth = require('./jwt/authenticated');
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            if (err) return done(null, false, `EROR AL INTENTAR DESERIALIZAR USUARIO ${err}`);
            done(err, user);
        });
    });

    singUp(passport);
    login(passport);
    auth(passport);
}