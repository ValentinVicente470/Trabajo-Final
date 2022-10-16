const product = require('express').Router()

//middleware----------------------------------
const {
    createProduct, 
    getProduct, 
    parseParamProd,
} = require('../controllers/product')

//create product------------------------------
product.post('/create-product', createProduct)

//get product---------------------------------
product.get('/get-product/:id', parseParamProd, getProduct)

module.exports = product