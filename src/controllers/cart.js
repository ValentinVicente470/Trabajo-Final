const {createCartDTO} = require('../dto/cart/cartDto') 
const {
    addToCartService,
    getCartService,
    deleteOneService
} = require('../services/cartServices')

async function addToCart(req, res, next) {
    if(req.emailUserExist) {
        let responseCart = await addToCartService(req.body.email, req.prod) 
        res.json(responseCart)
    } else {   
        res.json('user-doesnt-exist')
    }
}

async function getCart(req, res, next) {
    if(req.emailUserExist) {
        let responseGet = await getCartService(req.body.email)
        res.json(responseGet) 
    } else {   
        res.json('user-doesnt-exist')
    }
}

async function deleteOneCart(req, res, next) {
    if(req.emailUserExist) {
        let responseDeleteOne = await deleteOneService(req.body.email, req.prod)
        res.json(responseDeleteOne)
    } else {   
        res.json('user-doesnt-exist')
    }
}

function deleteCart(req, res, next) {
    
}

function parseParamsCart(req, res, next) {
    console.log(req.params.emailUser)
    req.body.email = req.params.emailUser  
    next()
}

function parseParamsCartProduct(req, res, next) {
    req.prod = req.params.idProduct
    next()
}

function createCart(req, res, next) {}

function clearCart(req, res, next) {}

module.exports = {
    createCart,
    clearCart, 
    addToCart, 
    getCart, 
    deleteCart,
    deleteOneCart,
    parseParamsCart,
    parseParamsCartProduct
}