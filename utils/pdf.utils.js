const pdf = require('pdf-parse')
const path = require('path')
const fs = require('fs')


const getKvitNumber = async (fileName) => {
    try {        
        const filePath = path.join(__dirname, `../static/kvits/${fileName}`)
        if(!fs.existsSync(filePath)) { return null }

        let dataBuffer = fs.readFileSync(filePath)

        const data = await pdf(dataBuffer)
        const text = data.text

        const regex = /\b[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}\b/
        const match = text.match(regex)

        if(match) { return match[0] } 
        else { return null }
    } 
    catch (e) { return null }
}


module.exports = {
    getKvitNumber,
}
