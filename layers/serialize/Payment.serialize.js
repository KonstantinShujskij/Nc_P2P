const Filter = require('@filter/Payment.filters')


const create = (req, _, next) => {   
    req.body = { 
        card: req.body.card, 
        amount: req.body.amount,
        refId: req.body.refId || '',
        partnerId: req.body.partnerId
    }

    next()
}

const block = (req, _, next) => {   
    req.body = { 
        card: req.body.card, 
    }

    next()
}

const get = (req, _, next) => {   
    req.body = { 
        id: req.body.id, 
    }

    next()
}

const list = (req, _, next) => {   
    req.body = { 
        filter: Filter.admin(req.body.filter), 
        page: req.body.page,
        limit: req.body.limit
    }

    next()
}


module.exports = {
    create,
    block,
    list,
    get
}
