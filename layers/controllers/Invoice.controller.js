const { moreAmount } = require('@utils/telegram.utils')
const NcPay = require('@utils/NcPay')

const Invoice = require('@models/Invoice.model')
const Payment = require('@controllers/Payment.controller')
const Jwt = require('@utils/Jwt.utils')

const Exception = require('@core/Exception')
const Const = require('@core/Const')
const config = require('config')

// ---------- SUPPORT FUNCTION ----------


// ---------- MAIN ----------

async function create({ amount, bank, refId, partnerId }) {    
    const isExist = refId && !!(await Invoice.findOne({ refId })) 
    if(isExist) { throw Exception.isExist }

    const payment = await Payment.choiceBest(amount)
    if(!payment) { throw Exception.notFind }

    const invoice = new Invoice({ 
        refId, partnerId,
        initialAmount: amount,
        amount,
        bank, 
        payment: payment._id,
        card: payment.card
    })

    const hash = Jwt.generateLinkJwt(invoice._id)
    const payPageUrl = config.get('payPageUrl')

    invoice.payLink = `${payPageUrl}?hash=${hash}`

    await save(invoice)
    await Payment.refresh(payment._id)
     
    return invoice
}

async function finalize(id, status=Const.invoice.statusList.REJECT, stopCallback=false) {
    const invoice = await getActive(id)
    invoice.status = status
    const newInvoice = await save(invoice)

    if(!stopCallback) { NcPay.callback(newInvoice) }
    
    await Payment.refresh(invoice.payment)

    return invoice
}

async function reject(id) { return await finalize(id, Const.invoice.statusList.REJECT) }
async function confirm(id, stopCallback=false) { return await finalize(id, Const.invoice.statusList.CONFIRM, stopCallback) }

async function changeAmount(id, amount) {    
    const invoice = await getActive(id)

    invoice.amount = amount

    return await save(invoice)
}

async function close(id, amount) {    
    const invoice = await get(id)

    if(invoice.status === Const.invoice.statusList.CONFIRM) { throw Exception.notFind }
    if(invoice.amount === amount) { return await confirm(id) }

    const delta = amount - invoice.initialAmount
    const available = await Payment.getMaxAvailable(invoice.payment, invoice)

    if(delta <= available) { 
        await changeAmount(id, amount)
        return await confirm(id)
    }

    console.log('SEND CUSTOM CALLBACK')
    NcPay.callback({_doc: {...invoice, amount: invoice.amount + available, status: Const.invoice.statusList.CONFIRM }})
    moreAmount(invoice, amount)
    
    await changeAmount(id, amount)    
    return await confirm(id, true) 
}

async function pay(id) {
    const invoice = await getActive(id)

    invoice.status = Const.invoice.statusList.VALID

    return await save(invoice)
}


// ---------- STATISTIC ----------

async function getStatistics(timestart=0, timestop=Infinity, format="%Y-%m-%d", options={}) {   
    const data = await Invoice.aggregate([
        { $match: { ...options, createdAt: { $gt: timestart, $lt: timestop } }},
        { $addFields: {
            date: { $toDate: '$createdAt' },
            dt: { $subtract: [ "$updatedAt", "$createdAt" ]},
        }},
        { $group: {
            _id: { $dateToString: { format, date: "$date" } },
            count: { $sum: 1 },
            countConfirm: { $sum: { $cond: { if: { $eq: ['$status', "CONFIRM"] }, then: 1, else: 0 }}},

            total: { $sum: '$amount'},
            totalConfirm: { $sum: { $cond: { if: { $eq: ['$status', "CONFIRM"] }, then: '$amount', else: 0 }}},
            totalInitialConfirm: { $sum: { $cond: { if: { $eq: ['$status', "CONFIRM"] }, then: '$initialAmount', else: 0 }}},
            dt: { $sum: '$dt' }
        }},
        { $sort: { _id: 1 } },
        { $project: {
            count: 1,
            countConfirm: 1,
            conversion: { $divide: [ "$countConfirm", "$count" ] },

            total: 1,
            totalConfirm: 1,
            totalInitialConfirm: 1,

            dt: 1,
        }}
    ]) 
    
    let count = 0
    let confirmCount = 0
    let conversion = 0
    let total = 0
    let totalConfirm = 0
    let totalInitialConfirm = 0
    let avarageTime = 0
    let avarageSum = 0


    data.forEach((item) => {
        count += item.count
        confirmCount += item.countConfirm

        total += item.total
        totalConfirm += item.totalConfirm
        totalInitialConfirm += item.totalInitialConfirm

        avarageTime += item.dt
    })   

    conversion = confirmCount / (count || 1)
    avarageTime = avarageTime / (count || 1)
    avarageSum = totalConfirm / (confirmCount || 1)
        
    return {
        count,
        confirmCount,
        conversion,
        total,
        totalConfirm,
        totalInitialConfirm,
        avarageSum,
        avarageTime
    }
    
    //data
}


// ---------- LISTS ----------

async function list(options, page, limit) {       
    const sort = { createdAt: -1 }
    const skip = (page - 1) * limit

    const List = await getList(options, sort, skip, limit)

    return { 
        list: List?.list || [], 
        count: List?.count || 0
    }
}

// ---------- DEFAULT ----------

async function save(invoice) {
    try { return await invoice.save() }
    catch(e) { throw Exception.notCanSaveModel }
}

async function get(_id) {
    const invoice = await Invoice.findOne({ _id })
    if(!invoice) { throw Exception.notFind }
    
    return invoice
}

async function getActive(_id) {
    const invoice = await Invoice.findOne({ _id, status: {$in: Const.invoice.activeStatusList} })
    if(!invoice) { throw Exception.notFind }

    return invoice
}

async function getList(options={}, sort={}, skip=0, limit=50) {       
    try { 
        const list = await Invoice.find(options).sort(sort).skip(skip).limit(limit)  
        const count = await Invoice.countDocuments(options)

        return { list, count }
    }
    catch(err) { 
        return null
    }
}


module.exports = { 
    create,
    reject,
    confirm,
    changeAmount,
    close,
    pay,

    getStatistics,

    get,
    list
}
