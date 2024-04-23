'use strict'

const mongoose = require('mongoose')
const { db: { usename, url, password, dbName } } = require('../config/config.mongodb')

const connectString = `mongodb+srv://${usename}:${password}@${url}`

class Database {
    constructor() {
        this.connect()
    }

    connect(type = "mongodb") {
        // dev
        mongoose.set('debug', true)
        mongoose.set('debug', { color: true })
        mongoose.connect(connectString, 
            {
                dbName: dbName,
            } ,
        
            {
            maxPoolSize: 50
        }).then(_ => {
        })
            .catch(err => console.log(err))

    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
