const { check } = require('express-validator')


const create = [
    check('login', 'invalidValue').notEmpty().isString(),
    check('password', 'invalidValue').notEmpty().isString(),
    check('telegram', 'invalidValue').notEmpty().isInt(),
]

const login = [
    check('login', 'invalidValue').notEmpty().isString(),
    check('password', 'invalidValue').notEmpty().isString(),
]


module.exports = {
    create,
    login,
}
