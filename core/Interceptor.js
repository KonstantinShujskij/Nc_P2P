
const { validationResult } = require('express-validator')

const Exception = require('./Exception')


const Interceptor = (handler) => {
    return async (req, res) => {
        try { 
            const msg = (validationResult(req).array().pop())?.msg
            if(msg) { throw Exception[msg] }

            await handler(req, res)
        } 
        catch(exception) {
            res.skipLog = false

            if(!exception.status) {
                console.log('Unknow Exception:');
                console.log(exception);
                exception = Exception.unknown 
            }

            res.status(exception.status).json(exception.msg) 
        }
    }
}

module.exports = Interceptor
