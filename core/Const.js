module.exports = {
    payTime: 15 * 60 * 1000,
    minPaymentLimit: 500,
    maxPaymentLimit: 30000,
    minInvoiceLimit: 500,
    maxInvoiceLimit: 30000,
    minNcApiLimit: 500,
    smallLim: 1500,
    
    payment: {
        statusList: { ACTIVE: 'ACTIVE', BLOCKED: 'BLOCKED', SUCCESS: 'SUCCESS', REJECT: 'REJECT' },
        minLimit: {
            default: 500,
            customLimit: 5000,
            persent: 0.1
        }
    },

    invoice: {
        statusList: { WAIT: 'WAIT', VALID: 'VALID', CONFIRM: 'CONFIRM', REJECT: 'REJECT' },
        activeStatusList: [ 'VALID', 'WAIT' ],
        finaleStatusList: [ 'CONFIRM', 'REJECT' ]
    },

    proof: {
        statusList: { WAIT: "WAIT", CONFIRM: 'CONFIRM', REJECT: 'REJECT' }
    },

    maxSaveRecursion: 10,
    bankList: { MONO: 'mono' },
    access: { PARTNER: 'PARTNER', ADMIN: 'ADMIN' },
    expire: 15
}
