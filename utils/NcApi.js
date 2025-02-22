const { protectedRecuest } = require('./request')
const { cantNcApiMake } = require('./telegram.utils')

const config = require('config')


const makeSubscribe = (callbackUrl=`${config.get('serverUrl')}/api/payment`, callback=()=>{}) => {
    try {
        const url = config.get('NcApiUrl') + '/subscribe/on'
        const body = { url: callbackUrl }

        protectedRecuest(url, body, (res) => {
            console.log('---ncApi subcribe')

            console.log('Статус:', res.statusCode)
            console.log('Тело:', res.body)
        })
    }
    catch(err) {
        console.log('----- Cant Make subskribe to NcApi')
        console.log(err)
    }
}

const makeOrder = (card, value, referenceId, callback=()=>{}) => {
    try {
        const url = config.get('NcApiUrl') + '/order/create'
        const body = { maker: config.get('maker'), currency: 'uah', card, value, referenceId }
        
        protectedRecuest(url, body, callback)
    }
    catch(err) {
        console.log('----- Cant Make order to NcApi')
        console.log(err)
        
        cantNcApiMake(referenceId)
    }
}

module.exports = { 
    makeSubscribe,
    makeOrder
}