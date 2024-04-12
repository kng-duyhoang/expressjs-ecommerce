'use strict'

// level 0
// const config = {
//     app: {
//         port: 3000
//     },
//     db: {
//         host: 'hoanggghck',
//         usename: 'hoanggghck',
//         port: 27107,
//         name: 'db',
//         password: 'L9915173l'
//     }
// }
// level 1

const dev = {
    app: {
        port: 3000
    },
    db: {
        usename: process.env.DEV_USERNAME,
        port: 27107,
        url: process.env.DEV_URL,
        password: process.env.DEV_DB_PASSWORD
    }
}

const product = {
    app: {
        port: 3000
    },
    db: {
        host: 'hoanggghck',
        usename: 'hoanggghck',
        port: 27107,
        name: 'db',
        password: 'L9915173l'
    }
}
const config = { dev, product }

const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]
