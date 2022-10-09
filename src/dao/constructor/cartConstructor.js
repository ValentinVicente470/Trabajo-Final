const mongoose = require('mongoose')
const modelCart = require('../models/cartModel')
const product = require('../models/productModel')
const connectMongo = ''

class mongoCart {
    constructor() {
        this.model = modelCart
        this.connection = connectMongo
    }

    async connectoMongo() {
        try {
            await mongoose.connect(this.connection)
        } catch(err) {
            console.log('error connect mongo cart ' + err)
        }
    }

    async disconnectMongo() {
        try {
            await mongoose.disconnect()
        } catch {
            console.log('error al desconectar mongo User')
        }
    }

    async getLast() {
        try {
            let last = await this.model.findOne().sort({id:-1}).limit(1)
            if(last == undefined) {
                let lastId = 0
                return lastId
            }
            let lastId = last.id
            return lastId
        } catch {
            console.log('error in find last')
        }
    } 

    async getCarritos() {
        try {
            let data = await this.model.find();
            return data;
        } catch {
            console.log("error find()");
        }
    }

    async carritoById(email) {
        try {
            console.log(email)
            let data = await this.model.findOne({email:email});
            return data
        } catch(err) {
            console.log("error find()" + err);
        }
    }

    async createCarrito(email) {
        try {
            let newId = await this.getLast();
            let carritoNew = new this.model({
                id: newId + 1,
                email: email,
                product: []
            });
            await carritoNew.save();
            return true
        } catch(err) {
            console.log("error create() " + err);
        }
    } 

    async deleteCarritoById(email) {
        try {
            await this.model.deleteOne({email: email})
            console.log("se elimino correctamente");
        } catch {
            console.log("error al eliminar");
        }
    } 

    async pushProduct(email, obj) {
        try {
            await this.model.updateOne({email: email}, {$push: {product: obj}});
            return true
        } catch(err) {
            console.log("error al agregar " + err);
        }
    } 

    async deleteProductById(email, idProd) {
        try {
            console.log(email + ' ' + idProd)
           
            let responseupdate = await this.model.updateOne({email: email}, {$pull: {product: [{id: idProd}]}});
            console.log(responseupdate)
            return true
        } catch(err) {
            console.log("error al eliminar " + err);
        }
    } 
} 

module.exports = mongoCart