const express = require('express')
const session = require('express-session')
const {PORT, name} = require('./configuration/config')

const mainRouters = require('./routes/main')

console.log(PORT)
console.log(name)

const app = express()

app.use('/', mainRouters)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.on('error', error => console.log(`Error en servidor ${error}`))