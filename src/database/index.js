const {MongoClient} = require('mongodb');
const debug = require('debug')('app:module-database'); //coneccion
const {Config} = require('../config/index') 

var conection = null;
module.exports.Database = (collection) => new Promise(async (resolve,reject)=>{
    //patron singleton
    try {
        if (!conection) {
            const client = new MongoClient(Config.mongoUri);
            conection = await client.connect();
            debug('Nueva conexion realizada con mongoDB Atlas ')
        }
        debug('Reutilizando conexion');
        const db = conection.db(Config.mongoDbname);
        resolve(db.collection(collection));
        
    } catch (error) {
        reject(error);
    }
});