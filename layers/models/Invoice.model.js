const {Schema, model, Types} = require('mongoose')
const Const = require('../../core/Const')


const schema = new Schema({
    refId: { type: String, default: '' },
    partnerId: { type: String, default: '' },
    
    initialAmount: { type: Number },
    availableAmount: { type: Number },
    amount: { type: Number },

    status: { type: String, default: Const.invoice.statusList.WAIT }, 
    payment: { type: Types.ObjectId, ref: 'Payment' },
    card: { type: String },
    bank: { type: String, default: null },

    kvitNumber: { type: String, default: null },
    kvitFile: { type: String, default: null },

    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: { currentTime: () => Date.now() }
})

module.exports = model('Invoice', schema)
