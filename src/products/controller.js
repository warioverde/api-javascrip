const debug = require('debug')('app:module-products-controller');
const {ProducstService} = require('./services');
const {Response} = require('../common/response');
const HTTPErrors = require('http-errors');

module.exports.ProductsController={
    getProducts: async (req,res)=>{
        try {
            let products = await ProducstService.getAll();
            Response.success(res,200,'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(res);
            
        }
    },
    getProduct: async (req,res)=>{
        try {
            const {params : {id}} = req;
            let product = await ProducstService.getById(id);
            if (!product) {
                Response.error(res, new HTTPErrors.NotFound())
            } else {
                Response.success(res,200,`Producto ${id}`, product);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProduct: async (req,res)=>{
        try {
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new HTTPErrors.BadRequest());
            }else {
                const insertedId = await ProducstService.create(body);
                Response.success(res, 201, "Producto agregado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateProduct: async (req,res)=>{
        try {
            const {params : {id}} = req;
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new HTTPErrors.BadRequest());
            }else {
                const insertedId = await ProducstService.update(id,body);
                Response.success(res, 201, "Producto actualizado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteProduct: async (caca,res) =>{
        try {
            const {params : {id}} = caca;
            let product = await ProducstService.dlt(id);
            if (!product) {
                Response.error(res, new HTTPErrors.NotFound())
            } else {
                Response.success(res,200,`Producto eliminado ${id}`, product);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
        
        

    },
    generateReport: (req,res)=>{
        try {
            ProducstService.generateReport('Inventario',res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
    //delete
}

