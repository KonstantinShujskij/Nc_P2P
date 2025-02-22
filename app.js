require('module-alias/register')

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('@middleware/logger.middleware')
const Task = require('@controllers/Task.controller')
const NcApi = require('@utils/NcApi')
const fs = require('fs')

const http = require('http')
const https = require('https')

const config = require('config')


const app = express()

const PORT = config.get('port')
const SLL_PORT = config.get('sslPort')
const MONGO_URL = config.get('mongoUri')

app.use(cors())
app.use(express.json({ extended: true }))
app.use(logger)

app.use('/api/user', require('./routes/User.routes'))
app.use('/api/payment', require('./routes/Payment.routes'))
app.use('/api/invoice', require('./routes/Invoice.routes'))
app.use('/api/proof', require('./routes/Proof.routes'))
app.use('/api/admin', require('./routes/Admin.route'))

app.get('/kvits/:path', (req, res) => { res.sendFile(path.resolve(__dirname, 'static', 'kvits', `${req.params.path}`)) })


async function start() {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

    Task.query().then()
    NcApi.makeSubscribe()
    
    if(process.env.NODE_ENV !== 'production') { 
        return app.listen(PORT, () => console.log(`Dev-App has been started on port ${PORT}`))
    }

    const privateKey = fs.readFileSync('/etc/letsencrypt/live/ncp2p.tech/privkey.pem', 'utf8')
    const certificate = fs.readFileSync('/etc/letsencrypt/live/ncp2p.tech/cert.pem', 'utf8')
    const ca = fs.readFileSync('/etc/letsencrypt/live/ncp2p.tech/chain.pem', 'utf8')

    const credentials = { key: privateKey, cert: certificate, ca: ca }

    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) })

    const httpServer = http.createServer(app)
    const httpsServer = https.createServer(credentials, app)

    httpServer.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    httpsServer.listen(SLL_PORT, () => console.log(`App has been started with ssl on port ${SLL_PORT}`))
}

function run() {
    try { start() }
    catch(error) { process.exit(1) }
}

run()
