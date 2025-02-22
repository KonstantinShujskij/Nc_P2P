const { cantSendCallback } = require('./telegram.utils')
const { protectedCallback } = require('./request')

const config = require('config')


const callback = (invoice, callback=()=>{}) => {
    try {
        const url = config.get('NcPayUrl') + '/invoice/ncp2p'
        const body = invoice

        console.log('Send to NcPay')
        console.log('url:', url)
        console.log('body:', body)
        
        protectedCallback(url, body, callback)
    }
    catch(err) {
        console.log('------------Cant send callback to ncApi')
        
        cantSendCallback(invoice.id)
    }
}


module.exports = { 
    callback
}