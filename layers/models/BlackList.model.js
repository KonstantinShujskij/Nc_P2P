const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    refId: { type: String, default: '' },
    card: { type: String },
    isActive: { type: Boolean, default: true },

    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: { currentTime: () => Date.now() }
})


module.exports = model('Blacklist', schema)
