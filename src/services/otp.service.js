'use strict'
const { randomInt } = require('crypto')
const otpModel = require('../models/otp.model')


class OTPService {
    generateToken () {
        const token = randomInt( 0 , Math.pow(2, 32))
        return token
    }

    async newToken ({
        email = ''
    }) {
        const token = this.generateToken()
        return await otpModel.create({
            otp_token: token,
            otp_email: email
        })
    }
}

module.exports = new OTPService();