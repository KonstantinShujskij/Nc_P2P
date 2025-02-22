const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    accessToken: {type: String},
    privateToken: {type: String},
    callbackUrl: {type: String},
    whiteList: [],
})

module.exports = model('Admin', schema)
