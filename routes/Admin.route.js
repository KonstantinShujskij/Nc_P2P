const {Router} = require('express')
const Interceptor = require('@core/Interceptor')
const { access, adminAccess } = require('@middleware/access.middleware')

const Partner = require('@controllers/Partner.controller')
const Admin = require('@controllers/Admin.controller')


const router = Router()


router.post('/init-admin', Interceptor(async (req, res) => {
    const auth = await Admin.create('Admin')

    res.status(201).json(auth)
})) 

router.post('/create-partner', access, adminAccess, Interceptor(async (req, res) => {
    const { name } = req.body

    const auth = await Partner.create(name)

    res.status(201).json(auth)
})) 

router.post('/create-admin', access, adminAccess, Interceptor(async (req, res) => {
    const { name } = req.body

    const auth = await Admin.create(name)

    res.status(201).json(auth)
})) 


module.exports = router
