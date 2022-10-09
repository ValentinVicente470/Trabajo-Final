const cartConstructor = require('../dao/constructor/cartConstructor')
const cartMongo = new cartConstructor()
const {getProductService} = require('./productServices')

async function addToCartService(email, product) {
    let prod = await getProductService(product)
    if(prod == 'product-doesnt-exist' || prod == 'invalid-params'){
        return 'product-doesnt-exist'
    }
    await cartMongo.connectoMongo()
    let responsePush = await cartMongo.pushProduct(email, prod[0])
    await cartMongo.disconnectMongo()
    return (
        responsePush == true
        ? 'added'
        : 'error'
    )
}

async function getCartService(email) {
    await cartMongo.connectoMongo()
    let responseCart = await cartMongo.carritoById(email)
    await cartMongo.getCarritos()
    await cartMongo.disconnectMongo()
    let {product} = responseCart
    return (
        product.length !== 0
        ? responseCart
        : 'empty-cart'
    )
}

async function deleteOneService(email, id) {
    await cartMongo.connectoMongo()
    let responseDelete = await cartMongo.deleteProductById(email, id)
    await cartMongo.disconnectMongo()
    console.log(responseDelete)
    return (
        responseDelete == true 
        ? 'deleted'
        : 'error'
    )
}

async function crearCart(email) {
    await cartMongo.connectoMongo()
    let responseCart = await cartMongo.createCarrito(email)
    await cartMongo.disconnectMongo()
    return responseCart
}

module.exports = {
    addToCartService,
    getCartService,
    deleteOneService,
    crearCart
}