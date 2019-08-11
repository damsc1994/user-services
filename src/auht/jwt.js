'use strict'

const secret = require('../util/server').secreKeyPassport;
const jwt = require('jsonwebtoken');

function sign(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
    };

    return jwt.sign(payload, secret, {expiresIn: '1 days'});
}


module.exports = {
    sign
}