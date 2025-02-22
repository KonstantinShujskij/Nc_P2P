
const parnter = (invoice) => ({
    id: invoice._id,
    refId: invoice.refId || '',
    amount: invoice.amount,
    status: invoice.status,
    card: invoice.card,

    kvit: invoice.kvitFile,
    kvitNumber: invoice.kvitNumber,

    createdAt: invoice.createdAt,
})

const admin = (invoice) => ({
    id: invoice._id,
    refId: invoice.refId || '',
    amount: invoice.amount,
    initialAmount: invoice.initialAmount,

    status: invoice.status,
    card: invoice.card,
    payment: invoice.payment,

    kvit: invoice.kvitFile,
    kvitNumber: invoice.kvitNumber,

    createdAt: invoice.createdAt,
})

const client = (invoice) => ({
    id: invoice._id,
    refId: invoice.refId || '',
    partnerId: invoice.partnerId || '',

    amount: invoice.amount,
    initialAmount: invoice.initialAmount,

    status: invoice.status,
    card: invoice.card,

    createdAt: invoice.createdAt,
})


module.exports = {
    all: (user) => user,
    client,
    parnter,
    admin
}
