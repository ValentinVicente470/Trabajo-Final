//yargs
const parseArgs = require('yargs/yargs')
const yargs = parseArgs(process.argv.slice(2))

//mail
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
    user: 'valentin.vicente.parapruebas@gmail.com',
    pass: 'CODERHOUSE30960',
    },
})

const { PORT, name, _ } = yargs 
    .alias({
        p: 'PORT'
    })
    .default({
        p: 8080
    })
    .alias({
        n: 'name'
    })
    .default({
        n: 'valentin.vicente.parapruebas@gmail.com'
    })
    .alias({
        m: 'modo'
    })
    .default({
        m: 'CLUSTER'
    })
    .argv

module.exports = {
    PORT,
    name,
    transporter
}