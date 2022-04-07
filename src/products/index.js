const express = require('express');

const {ProductsController} = require('./controller');

const router = express.Router();

module.exports.ProductsAPI = (app) => {
    router
    .get('/', ProductsController.getProducts) //http://localhost:3000/api/products/
    .get("/report",ProductsController.generateReport)
    .get('/:id', ProductsController.getProduct)//http://localhost:3000/api/products/23
    .post('/', ProductsController.createProduct)//http://localhost:3000/api/products/
    .put('/:id', ProductsController.updateProduct)
    .delete('/:id', ProductsController.deleteProduct)
    //delete

    app.use('/api/products',router);
}