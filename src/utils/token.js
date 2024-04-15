'use strict'
const crypto = require('node:crypto')

const generateToken = () => {
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')
    return { privateKey, publicKey }
}

module.exports = {
    generateToken
}
