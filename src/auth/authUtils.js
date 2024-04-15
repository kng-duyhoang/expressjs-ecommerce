'use strict'
const JWT = require('jsonwebtoken')
const asyncHandle = require('../helpers/asyncHandler')
const { AuthFailureError, AuthNotFound } = require('../core/error.response')
const { findUserID } = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
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
    /* 
        1 - Check user missing
        2 - Get access Token
        3 - Verify Token
        4 - check user in dbs
        5 - Check key Store with user id
        6 - return next
    */
    // 1
    const userID = req.headers[HEADER.CLIENT_ID]
    if (!userID) throw new AuthFailureError('Invalid Request')
    // 2
    const keyStore = await findUserID( userID )

    if (!keyStore) throw new AuthNotFound('Not found key store')

    // 3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')
    // 4
    try {
        const decodeUser = JWT.verify( accessToken, keyStore.publicKey )
        if (userID !== decodeUser.userID) {
            throw new AuthFailureError('Invalid User')
        }
        req.keyStore = keyStore
        return next();
    } catch (error) {
        throw error
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