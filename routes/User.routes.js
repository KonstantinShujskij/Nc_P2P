
const { Router } = require('express')
const Jwt = require('@utils/Jwt.utils')
const Interceptor = require('@core/Interceptor')

const Validate = require('@validate/User.validate')
const Serialise = require('@serialize/User.serialize')
const Format = require('@format/User.format')

const User = require('@controllers/User.controller')


const router = Router()


router.post('/create', Validate.create, Serialise.crerate, 
    Interceptor(async (req, res) => {
        const { login, password, telegram } = req.body
    
        const user = await User.create(login, password, telegram)
    
        res.status(201).json(Format.admin(user))
    })
)

router.post('/2fa', Validate.login, Serialise.login, 
    Interceptor(async (req, res) => {
        const { login, password } = req.body
    
        const user = await User.verify(login, password)
        await User.twoFA(user._id)
    
        res.status(201).json(true)
    })
)

router.post('/login', Validate.login, Serialise.twoFA, 
    Interceptor(async (req, res) => {
        const { login, password, code } = req.body
    
        const user = await User.verify(login, password)
        await User.twoFAVerify(user.id, code)
    
        const token = Jwt.generateLoginJwt(user._id)
    
        res.status(200).json({ token, userId: user._id })
    })
)


module.exports = router