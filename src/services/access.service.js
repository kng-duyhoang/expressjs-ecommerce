'use strict'
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const shopModel = require("../models/shop.model");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInforData } = require('../utils');
const { BadRequestError, ConflictRequestError } = require('../core/error.response')

const RoleShop = {
    SHOP: "SHOP",
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
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

            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

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

            // const publicKeyObject = crypto.createPublicKey( publickeyString )

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
