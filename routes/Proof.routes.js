
const { Router } = require('express')
const { Auth } = require('@middleware/auth.middleware')
const Interceptor = require('@core/Interceptor')

const Validate = require('@validate/Proof.validate')
const Serialise = require('@serialize/Proof.serialize')
const Proof = require('@controllers/Proof.controller')
const Format = require('@format/Proof.format')
const Jwt = require('@utils/Jwt.utils')

const file = require('@middleware/file.middleware')
const Exception = require('@core/Exception')


const router = Router()


router.post('/create', file.single('kvit'), Validate.create, Serialise.create, 
    Interceptor(async (req, res) => {
        const proof = await Proof.create(req.body)

        res.status(201).json(Format.client(proof))
    })
)

router.post('/create-client-number', Validate.clientNumber, Serialise.clientNumber, 
    Interceptor(async (req, res) => {
        const { hash, kvitNumber } = req.body   
        // const { invoiceId } = req.body   
        const invoiceId = Jwt.validateLinkJwt(hash)        

        if(!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(kvitNumber)) {
            throw Exception.invalidValue
        }
          
        const proof = await Proof.createByNumber(invoiceId, kvitNumber)

        res.status(201).json(Format.client(proof))
    })
)

router.post('/create-client-file', file.single('kvit'), Validate.clientFile, Serialise.clientFile, 
    Interceptor(async (req, res) => {
        const { hash, kvitFile } = req.body             
        const invoiceId = Jwt.validateLinkJwt(hash)
        
        const proof = await Proof.createByFile(invoiceId, kvitFile)

        res.status(201).json(Format.client(proof))
    })
)

router.post('/decline', Auth, Validate.decline, Serialise.decline, 
    Interceptor(async (req, res) => {
        const proof = await Proof.decline(req.body.id)

        res.status(200).json(Format.admin(proof))
    })
)

router.post('/accept', Auth, Validate.approve, Serialise.approve,
    Interceptor(async (req, res) => {
        const proof = await Proof.approve(req.body)        

        res.status(200).json(Format.admin(proof))
    })
)

router.post('/list', Auth, Validate.list, Serialise.list,
    Interceptor(async (req, res) => {
        const { filter, page, limit } = req.body             

        const {list, count} = await Proof.list(filter, page, limit)        

        req.skipLog = true
        res.status(200).json({ list: list.map((proof) => Format.admin(proof)), count })
    })
)


module.exports = router
