
# Proyecto final Backend | CoderHouse

Comision 30960, dictada por el profesor Marcos Santiago Villanueva.

Tutor: Miguel Avalle.




## Primer inicio en forma local

Instalar Nodemon
```bash
  npm install nodemon
```

Iniciar proyecto con nodemon
```bash
  nodemon src/sercer -p PORT -u USER 
```
#### PORT
Puerto para iniciar el servidor
Puerto default: 8080

#### USER
User va a ser el usuario Admin, tiene que ser un mail. Ya que ahi van a llegar los avisos cuando un nuevo usuario crea una cuenta
User default: valentin.vicente.parapruebas@gmail.com

## API Reference


### SignUp
Crea un usuario nuevo, solo puede haber un usuario por mail.

```http
  POST /users/sign-up
```
#### Required body
```javascript
{
	"user": "valentin",
	"email": "valentin.vicente.parapruebas@gmail.com",
	"pass": "CODERHOUSE30960",
	"number": "1131063957",
	"photo": "cat.img",
	"admin": "false"
}
```

### LogIn
```http
  POST /users/log-in
```
#### Required body
```javascript
{
	"email": "valentin.vicente.parapruebas@gmail.com",
	"pass": "CODERHOUSE30960"
}
```

### LogOut
Desloguea un usuario
```http
  POST /users/log-out
```
#### Required body
```javascript
{
	"email": "valentin.vicente.parapruebas@gmail.com"
}
```

### Get Session
Devuelve la session activa en el navegador
```http
  GET /users/session-use
```

### Get User
Devuelve todos los datos de un usuario apartir de su mail
```http
  GET /users/get-user/:emailUser
```

#### Required Parms
EmailUser: Email del usuario requerido

### Get cart
Devuelve el carrito del usuario requerido (:emailUser)
```http
  GET /cart/get-cart/:emailUser
```
#### Required Parms
EmailUser: Email del usuario requerido

### Add to cart
Agrega un producto (:idProd) al carrito de un usuario (:emailUser)
```http
  POST /cart/add-to-cart/:emailUser/:idProd
```
#### Required Parms
idProd: Id del producto requerido

### Delete product
Elimina un producto (:idProd) del carrito de un usuario (:emailUser)
```http
  POST /cart/delete-one/:emailUser/:idProd
```
#### Required Parms
emailUser: Email del usuario requerido
idProd: Id del producto requerido

### Buy cart
Finaliza la compra y envía el resumen del pedido por mail al usuario
```http
  POST /cart/buy-cart/:emailUser
```
#### Required Parms
emailUser: Email del usuario requerido

### Get product
Devuelve los o un producto
```http
  GET /product/get-product/:idProd
```
### idProd = all
devuelve todos los productos.
### idProd = 1
devuelve el producto solicitado por su id.
### idProd = 'numero que no existe'
devuelve que el producto es inexistente.



### Add product
Crea un producto nuevo
```http
  POST /product/create-product
```
#### Required Parms
idProd: Id del producto requerido

#### Required body
```javascript
{
	"title": "texto de ejemplo",
	"desc": "texto de ejemplo",
	"thumbnail": "texto de ejemplo",
	"price": "837246",
	"stock": "432",
	"tags": {
		"color1": "amarillo",
		"color2": "verde",
		"keyWord": "arte"
	}
}
```

## Deploy en Heroku
desplegue mi ecommerce pero no logre hacerlo funcionar, el error de heroku que me da es un H10 app crashed.

[HerokuApp](https://proyectofinal-30960ch.herokuapp.com/) 
