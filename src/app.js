const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const {default: helmet} = require('helmet')
const app = express()


// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
// init DB
require('./dbs/init.mongodb.lvl')
// init Router
// handler error


app.get('/', (req, res, next) => {
  const msg = 'aaaaaa'
  return res.status(200).json({
    message: "success",
    msg: msg.repeat(100000)
  })
})

module.exports = app
