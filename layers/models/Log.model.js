const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    url: { type: String, default: '' },
    method: { type: String, default: '' },
    time: { type: Number, default: 0 },

    req: { type: Object, default: null },
    res: { type: Object, default: null },

    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: { currentTime: () => Date.now() }
})

module.exports = model('Log', schema)
