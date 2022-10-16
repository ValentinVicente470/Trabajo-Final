const mongoose = require('mongoose')
const modelCart = require('../models/cartModel')
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

    //devuelve el ultimo id---------------------------------------------
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

    //devuelve todos los carritos--------------------------------------
    async getCarritos() {
        try {
            let data = await this.model.find();
            return data;
        } catch {
            console.log("error find()");
        }
    }

    //devuelve un carrito por el mail del usuario-----------------------
    async carritoById(email) {
        try {
            console.log(email)
            let data = await this.model.findOne({email:email});
            return data
        } catch(err) {
            console.log("error find()" + err);
        }
    }

    //crea un carrito--------------------------------------------------
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

    //elimina el carrito cuando el usauario se da de baja------------------
    async deleteCarritoById(email) {
        try {
            await this.model.deleteOne({email: email})
            console.log("se elimino correctamente");
        } catch {
            console.log("error al eliminar");
        }
    } 

    //agrega un producto al carrito----------------------------------------
    async pushProduct(email, obj) {
        try {
            await this.model.updateOne({email: email}, {$push: {product: obj}});
            return true
        } catch(err) {
            console.log("error al agregar " + err);
        }
    } 

    //elimina un producto del carrito--------------------------------------
    async deleteProductById(email, idProd) {
        try {
            const {product} = await this.carritoById(email)
            const updateProducts = product.filter((item) => item.id !== parseInt(idProd))
            let responseupdate = await this.model.updateOne({email: email}, {product: updateProducts});
            return true
        } catch(err) {
            console.log("error al eliminar " + err);
        }
    }
    
    //compra el carrito-----------------------------------------------------
    async buyCart(email) {
        try {
            let productEmpty = []
            let responseBuy = await this.model.findOneAndUpdate({email: email},{product: productEmpty})
            return responseBuy
        } catch(err) {
            console.log('error buying ' + err)
        }
    }
} 

module.exports = mongoCart