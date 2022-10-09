const product = require('express').Router()

const {
    createProduct, 
    updateProduct, 
    getProduct, 
    parseParamProd,
    productExist
} = require('../controllers/product')

product.post('/create-product', createProduct)
product.post('/update-product', productExist, updateProduct)
product.get('/get-product/:id', parseParamProd, getProduct)

module.exports = product