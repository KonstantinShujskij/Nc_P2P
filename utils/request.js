const request = require('request')
const { createHmac } = require('node:crypto')

const config = require('config')


const generateSignature = (body, privateToken) => {  
    const json = JSON.stringify(body)
    const hash = createHmac('sha256', privateToken).update(json).digest('hex')

    return hash
}

const protectedRecuest = (url, body, handler=()=>{}) => {    
    const accessToken = config.get('accessToken')
    const privateToken = config.get('privateToken')

    body = {accessToken, ...body}
    body.signature = generateSignature(body, privateToken)

    const options = { url, headers: { "content-type": "application/json" }, body, json: true }
    
    request.post(options, (error, res) => handler(res))
}

const protectedCallback = (url, body, handler=()=>{}) => {    
    const accessToken = config.get('accessTokenNcPay')
    const privateToken = config.get('privateTokenNcPay')

    body = {accessToken, ...body}
    body.signature = generateSignature(body, privateToken)

    const options = { url, headers: { "content-type": "application/json" }, body, json: true }
    
    request.post(options, (error, res) => {
        console.log('----- Request Error:', error)
        
        handler(res)
    })
}


module.exports = { 
    protectedRecuest,
    protectedCallback
}