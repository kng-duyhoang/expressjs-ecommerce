require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const {default: helmet} = require('helmet')
const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
// init DB
require('./dbs/init.mongodb.lvl')

// init Router
app.use('/', require('./routes'))
// handler error

module.exports = app
