const { createHmac } = require('node:crypto')
const Admin = require('@models/Admin.model')
const Partner = require('@models/Partner.model')
const middleware = require('@core/Middleware')
const jwt = require('jsonwebtoken')
const config = require('config')
const Const = require('@core/Const')
const Exception = require('@core/Exception')


const access = middleware(async (req, res) => { 
    const { accessToken, signature } = req.body

    const secret = config.get('jwtSecret')
    const apiSecret = config.get('apiSecret')

    const { id, access } = jwt.verify(accessToken, secret)
        
    let user = undefined

    if(access === Const.access.ADMIN) { user = await Admin.findOne({ _id: id })  }
    if(access === Const.access.PARTNER) { user = await Partner.findOne({ _id: id }) }        

    if(!user) { throw Exception.notAuth }        

    const whiteList = user.whiteList
    if(whiteList.length) {
        const ip = req.header('x-forwarded-for') || req.socket.remoteAddress
        const include = whiteList.includes(ip)

        if(!include) { throw Exception.notAccess }
    }

    const { privateToken } = jwt.verify(user.privateToken, apiSecret)

    const data = JSON.parse(JSON.stringify(req.body))
    delete data.signature

    const json = JSON.stringify(data)
    const hash = createHmac('sha256', privateToken).update(json).digest('hex')

    const isMatch = (hash === signature)
    if(!isMatch) { throw Exception.notAuth }        

    req.access = { id, type: access } 
})

const adminAccess = middleware(async (req, res) => { if(req.access.type !== Const.access.ADMIN) { throw Exception.notAccess } })
const partnerAccess = middleware(async (req, res) => { if(req.access.type !== Const.access.PARTNER) { throw Exception.notAccess } })


module.exports = { access, adminAccess, partnerAccess }