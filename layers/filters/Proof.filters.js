function get(filterData, forse={}) {
    const filter = {...filterData, ...forse}    

    let options = {}

    if(filter?.id) { options = {...options, _id: filter.id} }

    if(filter?.status) { options = {...options, status: filter.status} }
    if(filter?.invoice) { options = {...options, invoice: filter.invoice} }
    if(filter?.payment) { options = {...options, payment: filter.payment} }
    if(filter?.bank) { options = {...options, bank: filter.bank} }
    if(filter?.kvit) { options = {...options, kvitNumber: filter.kvit} }

    if(filter?.amount?.min || filter?.amount?.max) { 
        let amountOption = {}

        if(filter?.amount?.min) { amountOption = {...amountOption, $gt: filter.amount.min} }
        if(filter?.amount?.max) { amountOption = {...amountOption, $lt: filter.amount.max} }

        options = {...options, amount: amountOption} 
    }

    return options
}

function admin(filter) { return get(filter) }


module.exports = {
    admin
}