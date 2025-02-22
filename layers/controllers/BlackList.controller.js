const Exception = require('@core/Exception')

const Card = require('@models/BlackList.model')


// ---------- MAIN ----------

async function create(cardNumber) {    
    const existCard = await find(cardNumber)
    if(existCard) { return existCard }

    const card = new Card({ card: cardNumber })
    return await save(card)
}

async function find(card) {
    return await Card.findOne({ card, isActive: true })
}

async function remove(cardNumber) {    
    const card = await find(cardNumber)
    if(card) { return await del(card._id) }

    return null
}

// ---------- DEFAULT ----------

async function save(card) {
    try { return await card.save() }
    catch(e) { throw Exception.notCanSaveModel }
}

async function del(_id) {  
    try { return await Card.deleteOne({ _id }) }
    catch(e) { return null }
}

async function get(_id) {
    const card = await Card.findOne({ _id })
    if(!card) { throw Exception.notFind }
    
    return card
}


module.exports = { 
    create,
    remove,
    get,
    del,
    find
}
