const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    login: {type: String},
    password: {type: String},
    telegram: {type: String},

    twoFA: {type: String, default: ''}
})


module.exports = model('User', schema)
