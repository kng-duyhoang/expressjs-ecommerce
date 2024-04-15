'use strict'

const {model, Schema } = require("mongoose");

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME= 'Keys'

const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true
    },
    refreshTokensUsed: {
        type: Array, // da dc su dung
        default: [],
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)
