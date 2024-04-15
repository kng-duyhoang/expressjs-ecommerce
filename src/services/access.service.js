'use strict'
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const shopModel = require("../models/shop.model");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair, verifyJWT } = require('../auth/authUtils');
const { getInforData } = require('../utils');
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response');
const { generateToken } = require('../utils/token');
const { findShopByEmail } = require('./shop.service');

const RoleShop = {
    SHOP: "SHOP",
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    /* 
        chech Token used
    */

    static handleRefreshToken = async (refreshToken) => {
        const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken);
        console.log(foundToken);
        if (foundToken) {
            // decode
            const {userID} = await verifyJWT(refreshToken, foundToken.privateKey)
            // xoa Token
            await KeyTokenService.deleteKeyByUserID(userID)
            throw new ForbiddenError('Something wrong with token!!!')
        }
        // no ?
        const holderToken = await KeyTokenService.findByRefreshToken(refreshToken)
        if (!holderToken) throw new AuthFailureError('Shop not registed 1')
        // verify Token
        const {userId, email} = await verifyJWT(refreshToken, holderToken.privateKey)
        const foundShop = await findShopByEmail({email})
        if (!foundShop) throw new AuthFailureError('Shop not registed 2')
        // Create mot cap token moi
        const tokens = await createTokenPair({ userID: foundShop._id, email }, holderToken.publicKey, holderToken.privateKey)
        // update tokens
        await holderToken.updateOne({
            $set: {
                
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })

        return {
            user: {userId, email},
            tokens
        }
    }

    /*
        1. check Email
        2. check Password
        3. create AT & RT
        4. generate tokens
        5. get data return login
    */
    static logIn = async ({ email, password, refreshToken = null }) => {
        // 1
        const shopFind = await shopModel.findOne({ email }).lean()
        if (!shopFind) throw new BadRequestError('Shop not registed!')
        // 2
        const match = await bcrypt.compare(password, shopFind.password)
        if (!match) throw new AuthFailureError('Authen Error')
        // 3
        const {privateKey, publicKey} = generateToken()
        // 4
        const tokens = await createTokenPair({ userID: shopFind._id, email }, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            userID: shopFind._id,
            refreshToken: tokens.refreshToken,
            privateKey, publicKey
        })

        return {
            shop: getInforData({ fields: ['_id', 'name', 'email'], object: shopFind }),
            tokens
        }
    }

    static logOut = async ({keyStore}) => { 
        const delKey = await KeyTokenService.removeKeyByID(keyStore._id)
        return delKey
    }

    static signUp = async ({ name, email, password }) => {
        const hodelShop = await shopModel.findOne({ email }).lean()

        if (hodelShop) {
            throw new BadRequestError('Error: Shop already register')
        }

        const passwordHash = await bcrypt.hash(password, 10)// độ phức tạp pasword = 10
        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })

        if (newShop) {
            // create private key, publickey

            const {privateKey, publicKey} = generateToken()

            const keyStore = await KeyTokenService.createKeyToken({
                userID: newShop._id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                return {
                    code: 'xxx',
                    message: 'keyStore error'
                }
            }

            const tokens = await createTokenPair({ userID: newShop._id, email }, publicKey, privateKey)

            return {
                shop: getInforData({ fields: ['_id', 'name', 'email'], object: newShop }),
                tokens
            }
        }
    }
}

module.exports = AccessService
