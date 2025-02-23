const { Types } = require("mongoose")


function get(filterData, forse={}) {
    const filter = {...filterData, ...forse}

    let options = {}

    if(filter?.id) { 
        const orOptions = [{ refId: filter.id }, { partnerId: filter.id }]
        if(Types.ObjectId.isValid(filter.id)) { orOptions.push({_id: filter.id}) }
        options = {...options,  $or: orOptions} 
    }    
    
    if(filter?.refId) { options = {...options, refId: filter.refId} }
    if(filter?.partnerId) { options = {...options, partnerId: filter.partnerId} }

    if(filter?.status) { options = {...options, status: filter.status} }
    if(filter?.card) { options = {...options, card: filter.card} }
    if(filter?.amount?.min || filter?.amount?.max) { 
        let amountOption = {}

        if(filter?.amount?.min) { amountOption = {...amountOption, $gt: filter.amount.min} }
        if(filter?.amount?.max) { amountOption = {...amountOption, $lt: filter.amount.max} }

        options = {...options, amount: amountOption} 
    }
    if(filter?.initialAmount?.min || filter?.initialAmount?.max) { 
        let amountOption = {}

        if(filter?.initialAmount?.min) { amountOption = {...amountOption, $gt: filter.initialAmount.min} }
        if(filter?.initialAmount?.max) { amountOption = {...amountOption, $lt: filter.initialAmount.max} }

        options = {...options, initialAmount: amountOption} 
    }
    if(filter?.currentAmount?.min || filter?.currentAmount?.max) { 
        let amountOption = {}

        if(filter?.currentAmount?.min) { amountOption = {...amountOption, $gt: filter.currentAmount.min} }
        if(filter?.currentAmount?.max) { amountOption = {...amountOption, $lt: filter.currentAmount.max} }

        options = {...options, currentAmount: amountOption} 
    }

    return options
}

function admin(filter) { return get(filter) }


module.exports = {
    admin
}