'use strict'
const { randomInt } = require('crypto')
const otpModel = require('../models/otp.model')
const { BadRequestError } = require('../core/error.response')


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
    async checkEmailToken ({
        token
    }) {
        // Check token in model OTP
        const tokenFound = await otpModel.findOne({ 
            otp_token: token
        })
        if (!tokenFound) throw new BadRequestError('NOT FOUND TOKEN');
        otpModel.deleteOne({ 
            otp_token: token
        }).then()

        return tokenFound;
    }
}

module.exports = new OTPService();