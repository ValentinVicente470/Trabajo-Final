const user = require('express').Router()
const session = require('express-session')
const MongoStore = require('connect-mongo')

//middleware---------------------------
const {
    signUp, 
    logIn,  
    getUser,
    emailExist,
    createSession,
    logOut,
    parseParam,
    getSession
} = require('../controllers/user')

//session start--------------------------
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

//session end
user.use((req, res, next) => {
    req.isAuthenticated = () => {
        if (req.session.email) {
            return true
        }
        return false
    }
    req.logout = done => {
        req.session.destroy(done)
    }
    next()
})

//sing up----------------------------------------------------
user.post('/sign-up', emailExist, signUp, createSession)

//log in-----------------------------------------------------
user.post('/log-in', emailExist, logIn, createSession)

//log out----------------------------------------------------
user.post('/log-out', emailExist, logOut)

//get user----------------------------------------------------
user.get('/get-user/:email', parseParam, emailExist, getUser)

//session start----------------------------------------------------
user.get('/session-use', getSession)

module.exports = user