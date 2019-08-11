'use strict'

const userModel = require('../models/user');
const utilFunction = require('../util/functions');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../auht/jwt');

function prueba(req, res) {
    return res.status(200).send({ message: 'El controlador de prueba esta listo'});
}

function findUserByLoginOrEmail(req, res) {
    const body = req.body;
    
    userModel.find({
        $or: [{username: body.username}, {email: body.email}]
    }, async (err, user) => {
        if (err) return res.status(500).send({message: 'ERROR AL VERIFICAR SI EL USUARIO EXISTE'});
        let resultCompare = '';
        if (user.length > 0) {
            resultCompare = await utilFunction.compareFunc([body.username, body.email], [user[0].username, user[0].email]);
        }
        return res.status(200).send({user: (user.length <= 0 ? {exist: false}: {exist: true, resultCompare})});
    });
}

function findUsers(req, res) {
    userModel.find((err, users) => {
        if (err) return res.status(500).send({message: `ERROR AL INTENTAR LISTAR LOS USUARIOS: ${err}`});

        if (users.length < 1) return res.status(404).send({message: 'NO SE ENCONTARRON USUARIOS'});
        users.map((value) => value.password = undefined);
        return res.status(200).send({users});
    });
}

function singUp(req, res) {
    if (req.message) return res.status(500).send({
        message: req.message
    });
    return res.status(200).send({
        user: req.user
    });
}

function singIn(req, res) {
    if (!req.user) return res.status(500).send({message: 'ERROR AL GENERAR USUARIO'})
    const token = jwt.sign(req.user)
    const reult = {
        user: req.user,
        token 
    }
    return res.status(200).send(reult);
    
    
}

module.exports = {
    prueba,
    singUp,
    findUserByLoginOrEmail,
    singIn,
    findUsers
}