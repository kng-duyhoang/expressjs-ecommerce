'use strict'

const keyTokenModel = require("../models/keyToken.model")

class KeyTokenService {
    static createKeyToken = async ({userID, publicKey, privateKey, refreshToken}) => {
        try {
            // lvl0
            // const token = await keyTokenModel.create({
            //     user:  userID,
            //     publicKey: publicKey,
            //     privateKey: privateKey
            // })

            // return token ? publickeyString : null

            // lvl xx
            const
                filter = {user: userID},
                update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
                options = {upsert: true, new: true}
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService
