'use strict'

const express = require('express');
const userController = require('../controllers/user');
const passport = require('passport');

const api = express.Router();


api.get('/user/prueba', userController.prueba);
api.post('/user/user-exists', userController.findUserByLoginOrEmail);
api.post('/user/singUp', [passport.authenticate('signup')] ,userController.singUp);
api.post('/user/singIn', [passport.authenticate('login')] ,userController.singIn);
api.get('/user/list-users', [passport.authenticate('jwt')], userController.findUsers);

module.exports = api;