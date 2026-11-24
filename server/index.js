const express = require('express')
const https = require('https')
const http = require('http')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const os = require('os')
const app = express()

const distDir = path.join(__dirname, '..', 'dist')
const certDir = path.join(os.homedir(), 'certificates')

const corsOptions = {
    optionsSuccessStatus: 200,
}

app.use(express.static(distDir))

app.get('/rxsioCA.pem', (req, res) => {
    res.sendFile(path.join(certDir, 'RootCA.pem'))
})

app.post('/networkTest', cors(corsOptions), (req, res) => {
    res.json('Test passed')
})

app.use('/', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
})

const sslOptions = {
    key: fs.readFileSync(path.join(certDir, 'sirius.key')),
    cert: fs.readFileSync(path.join(certDir, 'sirius.crt')),
}

http.createServer(app).listen(80, () =>
    console.log('HTTP server running at 80')
)
https
    .createServer(sslOptions, app)
    .listen(443, () => console.log('HTTPS server running at 443'))
