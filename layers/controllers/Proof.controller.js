const { getKvitNumber } = require('@utils/pdf.utils')

const Proof = require('@models/Proof.model')
const Invoice = require('@controllers/Invoice.controller')
const Payment = require('@controllers/Payment.controller')

const CheckGov = require('@utils/CheckGov')
const Exception = require('@core/Exception')
const Const = require('@core/Const')



// ------ SUPPORT FUNCTION ------


async function getNumberByKvit(file, bank) {    
    if(!file) { return null }
    
    if(bank === Const.bankList.MONO) { return await getKvitNumber(file) }

    return null
}

// ----- MIAI -----

async function createByNumber(invoiceId, kvitNumber) {
    if(!kvitNumber) { throw Exception.invalidValue }

    const list = await Proof.find({ invoice: invoiceId, status: Const.proof.statusList.WAIT })
    if(list.length >= 2) { throw Exception.manyProofs }
    
    const number = kvitNumber.toUpperCase()

    const candidat = await Proof.findOne({ kvitNumber: number })
    if(candidat) { throw Exception.isExist }

    const invoice = await Invoice.get(invoiceId)   
    if(invoice.status === Const.invoice.statusList.CONFIRM) { throw Exception.notFind }

    const proof = new Proof({
        invoice: invoiceId,
        invoiceAmount: invoice.initialAmount,
        invoiceCard: invoice.card,
        invoiceDate: invoice.createdAt,
        payment: invoice.payment,
        kvitNumber: number,
        kvitFile: ''
    })

    await save(proof)
    return await verify(proof._id) 
}

async function createByFile(invoiceId, kvitFile='') {
    if(!kvitFile) { throw Exception.invalidValue }

    const list = await Proof.find({ invoice: invoiceId, status: Const.proof.statusList.WAIT })
    if(list.length >= 2) { throw Exception.manyProofs }

    const invoice = await Invoice.get(invoiceId)   
    if(invoice.status === Const.invoice.statusList.CONFIRM) { throw Exception.notFind }
    
    const number = await getNumberByKvit(kvitFile, invoice.bank) 

    const candidat = await Proof.findOne({ kvitNumber: number })
    if(candidat && number) { throw Exception.isExist }

    const proof = new Proof({
        invoice: invoiceId,
        invoiceAmount: invoice.initialAmount,
        payment: invoice.payment,
        kvitNumber: number,
        kvitFile
    })

    await save(proof)
    return await verify(proof._id) 
}


async function verify(id) {
    const proof = await get(id)

    if(proof.bank === Const.bankList.MONO) {        
        if(!proof.kvitNumber) { return }
        
        const transaction = await CheckGov.check(proof.kvitNumber)
        if(transaction) { 
            const { kvitNumber, card, amount } = transaction
            console.log('Check gov say yes:', kvitNumber, card, amount);
            
            return await complite(proof, { kvitNumber, card, amount }) 
        }
    }

    return proof
}

async function complite(proof, transaction) {
    proof.kvitNumber = transaction.kvitNumber
    proof.amount = transaction.amount
    proof.status = Const.proof.statusList.CONFIRM  

    if(transaction.card) {
        const payment = await Payment.get(proof.payment)
        if(payment.card.substring(0, 6) !== transaction.card.substring(0, 6)) { return }
    }
    
    const saveProof = await save(proof)

    await Invoice.close(proof.invoice, proof.amount)

    return saveProof
}

// ---------- SUPPORT ------------

async function decline(id) {
    const proof = await get(id)
    if(proof.status !== Const.proof.statusList.WAIT) { throw Exception.notFind }

    proof.status = Const.proof.statusList.REJECT

    return await save(proof)
}

async function approve({id, amount, kvitNumber}) {    
    const proof = await get(id)
    if(proof.status !== Const.proof.statusList.WAIT) { throw Exception.notFind }

    return await complite(proof, { amount, kvitNumber })
}

// ---------- LISTS ------------

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


async function save(proof) {
    try { return await proof.save() }
    catch(e) { throw Exception.notCanSaveModel }
}

async function get(_id) {
    const proof = await Proof.findOne({ _id })
    if(!proof) { throw Exception.notFind }

    return proof
}

async function getList(options={}, sort={}, skip=0, limit=50) {   
    try { 
        const list = await Proof.find(options).sort(sort).skip(skip).limit(limit)  
        const count = await Proof.countDocuments(options)

        return { list, count }
    }
    catch(err) { 
        return null
    }
}


module.exports = { 
    createByNumber,
    createByFile,
    verify,

    decline,
    approve,

    get,
    list
}
