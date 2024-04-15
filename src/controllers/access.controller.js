'use strict'

const AccessService = require("../services/access.service");

const {Created, Success} = require("../core/success.response")

class AccessController {
    logOut = async (req, res, next) => {
        new Success({
            message: 'Logout Success',
            metadata: await AccessService.logOut({keyStore: req.keyStore})
        }).send(res)
    }
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
    handleRefreshToken = async (req, res, next) => {
        new Success({
            message: 'Get Token Success',
            metadata: await AccessService.handleRefreshToken({
                refreshToken: req.refreshToken,
                user: req.user,
                keyStore: req.keyStore
            })
        }).send(res)
    }
}

module.exports = new AccessController()
