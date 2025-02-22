const Filter = require('@filter/Proof.filters')

const { toObjectId } = require('@utils/utils')


const create = (req, _, next) => {   
    req.body = { 
        invoiceId: toObjectId(req.body.invoice),
        kvitFile: req.file?.filename || null,
        kvitNumber: req.body.kvitNumber || null,
    }

    next()
}

const clientNumber = (req, _, next) => {   
    req.body = { 
        hash: req.body.hash,
        kvitNumber: req.body.kvitNumber || null,
    }

    next()
}

const clientFile = (req, _, next) => {   
    req.body = { 
        hash: req.body.hash,
        kvitFile: req.file?.filename || null,
    }

    next()
}

const decline = (req, _, next) => {   
    req.body = { 
        id: toObjectId(req.body.id)
    }

    next()
}

const approve = (req, _, next) => {   
    req.body = { 
        id: toObjectId(req.body.id),
        kvitNumber: req.body.kvitNumber,
        amount: req.body.amount,
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
    clientNumber,
    clientFile,
    decline,
    approve,
    list
}
