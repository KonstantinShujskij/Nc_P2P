const jwt = require('jsonwebtoken')
const keyGen = require('generate-key')

const Const = require('@core/Const')
const config = require('config')


function create(id, access) {
    const secret = config.get('jwtSecret')
    const apiSecret = config.get('apiSecret')
    
    const privateToken = keyGen.generateKey(32).toString()

    const accessToken = jwt.sign({ id, access }, secret, { expiresIn: '100000d' })
    const hashedToken = jwt.sign({ privateToken }, apiSecret, { expiresIn: '100000d' })

    return { accessToken, privateToken, hashedToken }
}

function createAdmin(id) { return create(id, Const.access.ADMIN) }
function createPartner(id) { return create(id, Const.access.PARTNER) }


module.exports = { 
    createAdmin,
    createPartner
}