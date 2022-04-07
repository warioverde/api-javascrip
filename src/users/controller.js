const debug = require('debug')('app:module-users-controller');
const {UsersService} = require('./services');
const {Response} = require('../common/response');
const HTTPErrors = require('http-errors');

module.exports.UsersController={
    getUsers: async (req,res)=>{
        try {
            let users = await UsersService.getAll();
            Response.success(res,200,'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res);
            
        }
    },
    getUser: async (req,res)=>{
        try {
            const {params : {id}} = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res, new HTTPErrors.NotFound())
            } else {
                Response.success(res,200,`Usuario ${id}`, user);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req,res)=>{
        try {
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new HTTPErrors.BadRequest());
            }else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, "Usuario agregado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async (req,res)=>{
        try {
            const {params : {id}} = req;
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new HTTPErrors.BadRequest());
            }else {
                const insertedId = await UsersService.update(id,body);
                Response.success(res, 201, "Usuario actualizado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteUser: async (caca,res) =>{
        try {
            const {params : {id}} = caca;
            let product = await UsersService.dlt(id);
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

