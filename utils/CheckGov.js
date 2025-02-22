const fetch = require('node-fetch')

const config = require('config')


const check = async (number, handler) => {
    const url = `${config.get('checkGovUrl')}/check`
    const body = { number }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        return  await response.json()
    } 
    catch (error) {
        return null
    }
}


module.exports = { 
    check
}