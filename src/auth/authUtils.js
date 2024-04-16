'use strict'
const JWT = require('jsonwebtoken')
const asyncHandle = require('../helpers/asyncHandler')
const { AuthFailureError, AuthNotFound } = require('../core/error.response')
const { findUserID } = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'refreshtoken'
  }

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                // console.log('err::', err);
            } else {
                // console.log('decode', decode);
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        return error
    }
}

const authentication = asyncHandle(async (req, res, next) => {
    const userID = req.headers[HEADER.CLIENT_ID]
    if (!userID) throw new AuthFailureError('Invalid Request')

    const keyStore = await findUserID( userID )
    if (!keyStore) throw new AuthNotFound('Not found key store')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')

    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN]
            const decodeUser = JWT.verify( refreshToken, keyStore.privateKey )
            if (userID !== decodeUser.userID && !decodeUser) {
                throw new AuthFailureError('Invalid User')
            }
            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refreshToken
            return next();
        } catch (error) {
            throw error
        }
    }

})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}
