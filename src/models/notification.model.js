'use strict'

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = 'Notification'
const COLLECTION_NAME = 'Notifications'

const enumType = ['ORDER-01', 'ORDER-02', 'PROMOTION-01', 'SHOP-01']
// ORDER-01: order success
// ORDER-02: order failed
// PROMOTION-01: new promotion
// SHOP-01: new product

const notificationSchema = new Schema({
    noti_type: { type: String, enum: [...enumType], required: true},
    noti_senderId: { type: Schema.Types.ObjectId, required: true, ref: 'Shop'},
    noti_receiveId: { type: Number, required: true },
    noti_content: { type: String, required: true},
    noti_options: { type: Object, default:  {}},
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    notification: model(DOCUMENT_NAME, notificationSchema)
}
