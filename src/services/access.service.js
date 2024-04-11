'use strict'
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const shopModel = require("../models/shop.model");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInforData } = require('../utils');

const RoleShop = {
    SHOP: "SHOP",
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            // check email exist
            const hodelShop = await shopModel.findOne({ email }).lean()

            if(hodelShop){
                return {
                    code: 'xxxx',
                    message: 'email existed!!!'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)// độ phức tạp pasword = 10 
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if (newShop) {
                // create private key, publickey

                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 2048,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // }); 
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

                const tokens = await createTokenPair({userID: newShop._id, email}, publicKey, privateKey)

                return {
                    code: 201,
                    metadata: {
                        shop: getInforData({ fields: ['_id', 'name', 'email'], object: newShop}),
                        tokens
                    }
                }
            }
        } catch (err) {
            return {
                code: 'xxxx',
                message: err.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService