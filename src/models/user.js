'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        alias: 'last_name'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        alias: 'birth_date'
    },
    createdAt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);