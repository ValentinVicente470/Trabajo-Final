const parseArgs = require('yargs/yargs')
const yargs = parseArgs(process.argv.slice(2))
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
        n: 'vicente88xd@gmail.com'
    })
    .argv

module.exports = {
    PORT,
    name
}