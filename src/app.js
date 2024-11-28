require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const {default: helmet} = require('helmet')
const app = express()
const {v4: uuidv4} = require('uuid')
const myLogger = require('./logger/mylog')
// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
// Logs
app.use( (req, res, next) => {
    const requestId = req.headers['x-request-id']
    req.requestId = requestId ?? uuidv4()
    myLogger.log(`input params::${req.method}`, [
        req.path,
        { requestId: requestId},
        req.method === 'POST' ? req.body : req.query
    ])
    next()
})
// init DB
require('./dbs/init.mongodb.lvl')
// init Router
app.use('/', require('./routes'))

app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const errMsg = `${err.status} - ${Date.now()}ms - Res: ${JSON.stringify(err)}`
    console.log(errMsg);
    
    myLogger.error(errMsg, [
        req.path,
        {requestId: req.requestId},
        {
            message: err.message
        }
    ])
    
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message
    })
})

module.exports = app
