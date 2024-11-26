'use strict'

const {model, Schema, Types} = require("mongoose");

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME= 'Users'

const userSchema = new Schema({
    user_id: {type: Number, required: true},
    user_slug: {type: String, required: true},
    user_name: {type: String, default: ''},
    user_pwd: {type: String, default: ''},
    user_self: {type: String, default: ''},
    user_email: {type: String, required: true},
    user_phone: {type: String, required: true},
    user_gender: {type: Number, required: true, enum: [1, 2, 3]}, // 1: male, 2: female, 3: not show
    user_avt: {type: Number, required: true},
    user_birthday: {type: Date, default: null},
    user_status: {type: String, default: 'pending', enum: ['pending', 'active', 'block']},
    user_role: {type: Schema.Types.ObjectId, ref: 'Role'},
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, userSchema)