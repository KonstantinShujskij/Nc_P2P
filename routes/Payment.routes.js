
const { Router } = require('express')
const { Auth } = require('@middleware/auth.middleware')
const { access, partnerAccess, adminAccess } = require('@middleware/access.middleware')
const Interceptor = require('@core/Interceptor')

const Validate = require('@validate/Payment.validate')
const Serialise = require('@serialize/Payment.serialize')
const Format = require('@format/Payment.format')

const Payment = require('@controllers/Payment.controller')
const BlackList = require('@controllers/BlackList.controller')

const Exception = require('@core/Exception')


const router = Router()


router.post('/create', access, partnerAccess, Validate.create, Serialise.create, 
    Interceptor(async (req, res) => {
        const isBlocked = !!(await BlackList.find(req.body.card))
        if(isBlocked) { throw Exception.cardBlocked }

        const payment = await Payment.create(req.body)

        res.status(201).json(Format.parnter(payment))
    })
)

router.post('/create-admin', Auth, Validate.create, Serialise.create, 
    Interceptor(async (req, res) => {
        const isBlocked = !!(await BlackList.find(req.body.card))
        if(isBlocked) { throw Exception.cardBlocked }

        const payment = await Payment.create(req.body)

        res.status(201).json(Format.parnter(payment))
    })
)

router.post('/refresh', access, adminAccess, Validate.get, Serialise.get, 
    Interceptor(async (req, res) => {
        await Payment.refresh(req.body.id)

        res.status(200).json(true)
    })
)

router.post('/block', Auth, Validate.block, Serialise.block, 
    Interceptor(async (req, res) => {
        await BlackList.create(req.body.card)

        res.status(200).json(true)
    })
)

router.post('/push', Auth, Validate.get, Serialise.get, 
    Interceptor(async (req, res) => {
        const { id } = req.body

        await Payment.pushTail(id)

        res.status(200).json(true)
    })
)

router.post('/reject', Auth, Validate.get, Serialise.get, 
    Interceptor(async (req, res) => {
        await Payment.reject(req.body.id)

        res.status(200).json(true)
    })
)

router.post('/freeze', Auth, Validate.get, Serialise.get, 
    Interceptor(async (req, res) => {
        await Payment.freeze(req.body.id)

        res.status(200).json(true)
    })
)

router.post('/unfreeze', Auth, Validate.get, Serialise.get, 
    Interceptor(async (req, res) => {
        await Payment.unfreeze(req.body.id)

        res.status(200).json(true)
    })
)

router.post('/order/update',  
    Interceptor(async (req, res) => {
        const {id, status} = req.body 
        console.log('----- Close in NcAPi', id, status);
        
        try { await Payment.closeTail(id, status) }
        catch(error) {
            console.log('----- error in save payment with NcApi');
            console.log(error);
        }

        res.status(200).json(true)
    })
)

router.post('/list', Auth, Validate.list, Serialise.list,
    Interceptor(async (req, res) => {
        const { filter, page, limit } = req.body
        const {list, count} = await Payment.list(filter, page, limit)        

        req.skipLog = true
        res.status(200).json({ list: list.map((payment) => Format.admin(payment)), count })
    })
)


module.exports = router
