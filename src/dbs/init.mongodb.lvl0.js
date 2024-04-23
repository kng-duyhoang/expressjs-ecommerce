'use strict'

const mongoose = require('mongoose')

const connectString = `mongodb+srv://hoanggghck:L9915173l@test1.wf0nqom.mongodb.net/`

mongoose.connect(connectString).then( _ => console.log('Connect success'))
.catch( err => console.log(err))

// dev
if (1 === 0) {
  mongoose.set('debug', true)
  mongoose.set('debug', {color: true})
}

module.exports = mongoose
