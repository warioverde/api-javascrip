const {ObjectId} = require('mongodb');
const {Database} = require('../database/index');
const COLLECTION = 'users';

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const create = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId
}
//update
const update = async (id,user) =>{
    const collection = await Database(COLLECTION);
    //validar que dato exista
    let result = await collection.updateOne({_id: {$eq: ObjectId(id)}},{$set:{nombre: user.nombre, email: user.email}});
    return result._id
}
//delete
const dlt = async(id)=>{
    const collection = await Database(COLLECTION);
    let encontrado = collection.findOne({_id: ObjectId(id)});
    await collection.deleteOne({_id: ObjectId(id)});
    return encontrado
}

module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    dlt,

}
