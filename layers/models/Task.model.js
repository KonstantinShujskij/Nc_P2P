const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    timestamp: {type: String},
    type: {type: String},
    payload: {type: Object}
})

module.exports = model('Task', schema)
