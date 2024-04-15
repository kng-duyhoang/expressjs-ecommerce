'use strict'
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const shopModel = require("../models/shop.model");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInforData } = require('../utils');
const { BadRequestError, ConflictRequestError, AuthFailureError } = require('../core/error.response');
const { findShopByEmail } = require('./shop.service');
const { generateToken } = require('../utils/token');
const { token } = require('morgan');

const RoleShop = {
    SHOP: "SHOP",
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

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
        console.log(`shopFind`, shopFind);
        const match = bcrypt.compare(password, shopFind.password)
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
                code: 201,
                metadata: {
                    shop: getInforData({ fields: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
        }
    }
}

module.exports = AccessService
