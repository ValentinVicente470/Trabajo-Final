const mongoose = require('mongoose')
const modelUser = require('../models/userModel')
const connectMongo = process.env.USERMONGO

class mongoUser {
    constructor() {
        this.model = modelUser
        this.connection = connectMongo
    }

    async connectoMongo() {
        try {
            await mongoose.connect(this.connection)
        } catch(err) {
            console.log('error connect mongo User ' + err)
        }
    }

    async disconnectMongo() {
        try {
            await mongoose.disconnect()
        } catch {
            console.log('error al desconectar mongo User')
        }
    }

    //devuelve el ultimo id -----------------------------------------
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

    //devuelve si existe un usuario o no------------------------------
    async findUser(userEmail) {
        try {
            let userFind = await this.model.findOne({email: userEmail})
            if (userFind == undefined) {
                return false
            }
            return true
        } catch(err) {
            console.log('error en find user ' + err)
        }
    } 

    //devuelve el usuario buscado------------------------------------
    async getUser(userEmail) {
        try {
            let userGet = await this.model.findOne({email: userEmail})
            return userGet
        } catch(err) {
            console.log('error en get user ' + err)
        }
    } 

    //guarda nuevo usuario-------------------------------------------
    async newUser(user) {
        try {
            let newId = await this.getLast()
            let newUs = new this.model({
                id: newId + 1,
                user: user.user,
                email: user.email,
                pass: user.pass,
                number: user.number,
                photo: user.photo,
                admin: user.admin
            })
            await newUs.save() 
            return true
        } catch(err) {
            console.log('error al crear un usuario ' + err)
        }
    }
}

module.exports = mongoUser