const Exception = require('./Exception')


module.exports = (callback) => {
    return async (req, res, next) => {
        if(req.method === 'OPTIONS') { return next() }

        try { 
            await callback(req, res)
            next() 
        } 
        catch(exception) {
            if(!exception.status) { exception = Exception.unknown }
            
            res.status(exception.status).json(exception.msg) 
        }
    }
}