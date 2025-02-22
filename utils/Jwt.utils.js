const jwt = require('jsonwebtoken')

const config = require('config')


const generateLoginJwt = (id) => { 
    const secret = config.get('authSecret')

    return jwt.sign({ _id: id }, secret, { expiresIn: '24h' }) 
}

const generateLinkJwt = (id) => { 
    const secret = config.get('authSecret')

    return jwt.sign({ id }, secret, { expiresIn: '1000d' }) 
}

const validateLinkJwt = (hash) => { 
    const secret = config.get('authSecret')
    
    try {
        const { id } = jwt.verify(hash, secret)
        return id
    }
    catch(err) { return null }
}

module.exports = { 
    generateLoginJwt,
    generateLinkJwt,
    validateLinkJwt
}
