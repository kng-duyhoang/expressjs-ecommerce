'use strict'

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'phamduyhoangkngvn@gmail.com',
        pass: 'mcya rzpp rlfw ovqy'
    }
})

module.exports = transport