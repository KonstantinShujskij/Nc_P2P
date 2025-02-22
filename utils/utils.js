const { Types } = require('mongoose')

const round = (value, round=1) => parseInt(value / round) * round

const toObjectId = (id) => {
    try { return new Types.ObjectId(id) }
    catch(e) { return null }
}


module.exports = { 
    round,
    toObjectId
}
