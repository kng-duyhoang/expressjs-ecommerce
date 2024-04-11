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
    refreshToken: {
        type: Array,
        default: [],
    },
}, {
    collection: DOCUMENT_NAME,
    timestamps: true
})

module.exports = model(COLLECTION_NAME, keyTokenSchema)