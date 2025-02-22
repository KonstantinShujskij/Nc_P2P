const jwt = require('jsonwebtoken')

const User = require('@controllers/User.controller')
const middleware = require('@core/Middleware')
const Exception = require('@core/Exception')

const config = require('config')


const Auth = middleware(async (req, res) => {   
    const token = req.headers.authorization.split(' ')[1]
    if(!token) { throw Exception.notAuth }

    try { 
        req.user = jwt.verify(token, config.get('authSecret')) 
        req.user = await User.get(req.user?._id)
    } 
    catch(error) { throw Exception.notAuth }
})


module.exports = { Auth }
