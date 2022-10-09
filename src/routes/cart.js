const cart = require('express').Router()

const {
    createCart, 
    clearCart, 
    addToCart, 
    getCart, 
    deleteCart,
    deleteOneCart,
    parseParamsCart,
    parseParamsCartProduct
} = require('../controllers/cart')

const {
    emailExist
} = require('../controllers/user')

cart.post('/add-to-cart/:emailUser/:idProduct', parseParamsCart, parseParamsCartProduct, emailExist, addToCart)

cart.get('/get-cart/:emailUser', parseParamsCart, emailExist, getCart)

cart.post('/delete-one/:emailUser/:idProduct', parseParamsCart, parseParamsCartProduct, emailExist, deleteOneCart)

cart.delete('/delete-cart/:userId', deleteCart)

module.exports = cart