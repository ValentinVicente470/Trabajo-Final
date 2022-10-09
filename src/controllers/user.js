const {newUserDTO, userLoginDTO} = require('../dto/user/userDto')
const {
    signUpService, 
    loginService, 
    deleteUserService, 
    updateUserService,
    getUserService,
    emailExistService
} = require('../services/userServices')

async function signUp(req, res, next) {
    console.log(req.emailUserExist + ' sign email exist')
    if (!req.emailUserExist) {
        let userDtoNew = newUserDTO(req.body)
        await signUpService(userDtoNew)
        ? res.json('session starts')
        : res.json('pass-wrong')
    } else {
        res.json('email-exist')
    }
}

async function logIn(req, res, next) {
    if (req.emailUserExist) {
        let userDtoLogin = userLoginDTO(req.body)
        await loginService(userDtoLogin)
        ? next()
        : res.json('pass-not-match')
    } else {
        res.json('email-doesnt-exist')
    }
}

function logOut() {
    if (req.emailUserExist) {
    }
    res.json('no-session-active')
}

function deleteUser(req, res, next) {
    req.json(deleteUserService(req.body))
}

function updateUser(req, res, next) {
    let userDtoUpdate = newUserDTO(req.body)
    req.json(updateUserService(userDtoUpdate))
}

async function getUser(req, res, next) {
    if (req.emailUserExist) {
        let reponseUser = await getUserService(req.params.email)
        res.json(reponseUser)
    } else {
        res.json('user-doesnt-exist')
    }
}

function parseParam(req, res, next) {
    req.body.email = req.params.email
    next()
}

async function emailExist(req, res, next) {
    req.emailUserExist = await emailExistService(req.body.email)
    next()
}

function createSession(req, res, next) {
    res.json('cree session')
    
}

function isAuth(req, res, next) {}

module.exports = {
    signUp,
    logIn,
    logOut,
    deleteUser, 
    updateUser, 
    getUser,
    emailExist,
    createSession,
    isAuth,
    parseParam
}