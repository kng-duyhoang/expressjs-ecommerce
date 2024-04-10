'use strict'

const mongoose = require('mongoose')

const connectString = `mongodb+srv://hoanggghck:L9915173l@test.wf0nqom.mongodb.net/`

class Database {
  constructor() {
    this.connect()
  }

  connect(type = "mongodb") {
    // dev
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', {color: true})
    }
    mongoose.connect(connectString, {
      maxPoolSize: 50
    }).then( _ => {
      const { countConnect } = require('../helpers/check.connect')
      console.log(countConnect());
    })
    .catch( err => console.log(err))

  }
  static getInstance() {
    if(!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
