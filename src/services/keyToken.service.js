'use strict'

const keyTokenModel = require("../models/keyToken.model")

class KeyTokenService {
    static createKeyToken = async ({userID, publicKey, privateKey}) => {
        try {
            const token = await keyTokenModel.create({
                user:  userID,
                publicKey: publicKey,
                privateKey: privateKey
            })

            return token ? publickeyString : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService