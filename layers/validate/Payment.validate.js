const { check } = require('express-validator')
const Const = require('../../core/Const')


const create = [
    check('card', 'invalidCard').notEmpty().isCreditCard(),
    check('amount', 'invalidAmount').notEmpty().isFloat({ min: Const.minPaymentLimit, max: Const.maxPaymentLimit }),
    check('refId', 'invalidRefId').optional().isString(),
    check('partnerId', 'invalidRefId').optional().isString()
]

const block = [
    check('card', 'invalidCard').notEmpty().isCreditCard(),
]

const get = [
    check('id', 'invalidValue').notEmpty().isMongoId(),
]

const list = [
    check('filter', 'invalidValue').optional().isObject(),
    check('page', 'invalidValue').notEmpty().isInt({ min: 0 }),
    check('limit', 'invalidValue').notEmpty().isInt({ min: 0 }),
]


module.exports = {
    create,
    block,
    list,
    get
}
