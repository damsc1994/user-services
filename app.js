'use strict'

const mongoose = require('mongoose');
const http = require('http');
const chalk = require('chalk');
const api = require('./api');
const utilDB = require('./src/util/db');
const utilSeerver = require('./src/util/server');

const server = http.createServer(api);

mongoose.connect(utilDB.infoConection.url, { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, `ERROR AL INICIAR LA CONEXION A LA BASE DE DATOS:`));
db.once('open', () => {
    console.log('Conexion exitosa');
    server.listen(utilSeerver.port, () => {
        console.log(`El servidor arranco en el puerto ${utilSeerver.port}`);
    });
});
