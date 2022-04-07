const express = require('express');
const debug = require('debug')('app:main');

const {Config} = require('./src/config/index');
const {ProductsAPI} = require('./src/products');
const {UsersAPI} = require('./src/users');
const {SalesAPI} = require('./src/sales');
const {IndexAPI,NotFoundAPI} = require('./src/index');

const app = express();

app.use(express.json());

//modulos
IndexAPI(app); //siempre primera
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app); //siempre ultima

app.listen(Config.port, ()=>{
    debug(`servidor escuchando en el puerto ${Config.port}`);
})
