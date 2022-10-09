const mongoose = require('mongoose')
const modelProduct = require('../models/productModel')
const connectMongo = ''

class mongoProduct {
    constructor() {
        this.model = modelProduct
        this.connection = connectMongo
    }

    async connectoMongo() {
        try {
            await mongoose.connect(this.connection)
        } catch {
            console.log('error connect mongo User')
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
        } catch(err) {
            console.log('error getlast product ' + err)
        }
    } 
    async getAll() {
        try {
            let products = await this.model.find()
            console.log(products)
            return products
        } catch(err) {
            console.log('error getAll ' + err)
        }
    } 

    async newProd(productInfo) {
        try {
            let newId = await this.getLast()
            let newPrd = new this.model({
                id: newId + 1,
                title: productInfo.title,
                desc: productInfo.desc,
                thumbnail: productInfo.thumbnail,
                price: productInfo.price,
                stock: productInfo.stock,
                tags: {
                    color1: productInfo.tags.color1,
                    color2: productInfo.tags.color2,
                    keyWord: productInfo.tags.keyWord
                }
            })
            await newPrd.save()
            return true
        } catch(err) {
            console.log('error en newProd ' + err)
        }
    }
    async deleteById(id) {
        try {
            await this.model.deleteOne({id: id})
        } catch(err) {
            console.log('error en deletebyid ' + err);
        }
    }

    async getById(id) {
        try {
            let userById = await this.model.find({id: id})
            console.log(userById)
            return userById
        } catch(err) {
            console.log('error en getbyid ' + err)
        }
    } 

}

module.exports = mongoProduct