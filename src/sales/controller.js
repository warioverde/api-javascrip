const debug = require('debug')('app:module-sales-controller');
const {SalesService} = require('./services');
const {Response} = require('../common/response');
const HTTPErrors = require('http-errors');

module.exports.SalesController={
    getSales: async (req,res)=>{
        try {
            let sales = await SalesService.getAll();
            Response.success(res,200,'Lista de ventas', sales);
        } catch (error) {
            debug(error);
            Response.error(res);
            
        }
    },
    getSale: async (req,res)=>{
        try {
            const {params : {id}} = req;
            let sale = await SalesService.getById(id);
            if (!sale) {
                Response.error(res, new HTTPErrors.NotFound())
            } else {
                Response.success(res,200,`Usuario ${id}`, sale);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createSale: async (req,res)=>{
        try {
            const {body} = req;
            const insertedId = await SalesService.create(body);
            if (insertedId) {
                Response.success(res, 201, "Venta agregada:", insertedId);
            } else {
                Response.error(res, new HTTPErrors.BadRequest());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateSale: async (req,res)=>{
        try {
            const {params : {id}} = req;
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new HTTPErrors.BadRequest());
            }else {
                const insertedId = await SalesService.update(id,body);
                Response.success(res, 201, "venta actualizada", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteSale: async (req,res) =>{
        try {
            const {params : {id}} = req;
            let product = await SalesService.dlt(id);
            if (!product) {
                Response.error(res, new HTTPErrors.NotFound())
            } else {
                Response.success(res,200,`Usuario eliminado ${id}`, product);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
        
        

    }
}

