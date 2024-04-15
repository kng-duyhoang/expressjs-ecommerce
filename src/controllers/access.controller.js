'use strict'

const AccessService = require("../services/access.service");

const {Created, Success} = require("../core/success.response")

class AccessController {
    logIn = async (req, res, next) => {
        new Success({
            message: 'Login Success',
            metadata: await AccessService.logIn(req.body)
        }).send(res)
    }
    signUP = async (req, res, next) => {
        new Created({
            message: 'Created Success',
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
