'use strict'

const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../../models/user');
const bcrypt = require('bcrypt-nodejs');

function singIn(req, username, password, done) {
    userModel.findOne({
        $or: [{email: username}, {username: username}]
    }, (err, resultUser) => {
        if (err) return done(null, false, {message: `ERROR AL NTENTAR VERIFICAR USUARIO: ${err}`});
        if (!resultUser) return done(null, false, {'message': 'NOMBRE DE USUARIO O CONTRASEÑA INVALIDAD'});
        bcrypt.compare(password, resultUser.password, (err, result) => {
            if (err) return done(err);
            if (!result) return done(null, false, {message: 'NOMBRE DE USUARIO O CONTRASEÑA INVALIDAD'});
            resultUser.password = undefined;

            return done(null, resultUser);
        });
    });
}

module.exports = (passport) => {
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, singIn));
}



