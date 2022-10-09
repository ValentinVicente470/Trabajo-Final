const user = require('express').Router()
const session = require('express-session')
const MongoStore = require('connect-mongo')

const {
    signUp, 
    logIn, 
    deleteUser, 
    updateUser, 
    getUser,
    emailExist,
    createSession,
    isAuth,
    logOut,
    parseParam
} = require('../controllers/user')

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
user.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.URLMONGOSESSION || 'mongodb+srv://ValentinVicente:kpoctmaster470@cluster0.4hxnz.mongodb.net/Cluster0?retryWrites=true&w=majority',
            mongoOptions: advancedOptions,
            ttl: 600,
        }),
        
        secret: 'CoderHouse30960',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 30
        },
    })
)

user.post('/sign-up', emailExist, signUp, createSession)
user.post('/log-in', emailExist, logIn, createSession)
user.post('/log-out', emailExist, logOut)
user.post('/delete-user', emailExist, deleteUser)
user.post('/update-user', emailExist, updateUser)
user.get('/get-user/:email', parseParam, emailExist, getUser)

module.exports = user