'use strict'
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../../models/user');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

function singUp(req, username, password, done) {

    function createUser() {
        const userRq = req.body;

        if (!userRq.name || !userRq.username || !userRq.email || !userRq.password) return done(null, false, {
            message: 'Los datos del cuerpode la peticion no son validos!!'
        });
    
    
        bcrypt.hash(userRq.password, null, null, (err, passwordHash) => {
            if (err) return done(null, false, {message: `OCURRIO UN ERROR INTENTANDO GENERAR PASSWORD HASH ${err}`});
    
            const user = new userModel({
                name: userRq.name,
                lastName: (userRq.lastName ? userRq.lastName : ''),
                username: userRq.username,
                email: userRq.email,
                password: passwordHash,
                birthDate:(userRq.birthDate ? user.birthDate : ''),
                createdAt: moment().unix()
            });
            user.save((err, userSaved) => {
                if (err) return done(err); 
    
                userSaved.password = undefined;
                return done(null, userSaved)
            });
        });
    }

    process.nextTick(createUser);
}

module.exports = (passport) => {
    passport.use('signup', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, singUp));
}